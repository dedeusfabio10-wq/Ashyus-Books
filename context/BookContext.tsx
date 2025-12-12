
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Book, Banner, Release } from '../types';
import { generateBookDetails } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';

interface BookContextType {
    books: Book[];
    banners: Banner[];
    releases: Release[];
    authorPhoto: string;
    loading: boolean;
    error: string | null;
    addBook: (title: string, books2readUrl: string, amazonUrl?: string) => Promise<void>;
    updateBookCover: (bookId: string, newCoverUrl: string) => Promise<void>;
    addBanner: (imageUrl: string, linkUrl: string, position: 'left' | 'right') => Promise<void>;
    removeBanner: (bannerId: string) => Promise<void>;
    addRelease: (title: string, description: string, date: string, imageUrl: string) => Promise<void>;
    removeRelease: (releaseId: string) => Promise<void>;
    updateAuthorPhoto: (newPhotoUrl: string) => Promise<void>;
    isInitialized: boolean;
}

const DEFAULT_AUTHOR_PHOTO = "https://picsum.photos/seed/author_ashyus/600/600?grayscale&blur=2";

export const BookContext = createContext<BookContextType>({
    books: [],
    banners: [],
    releases: [],
    authorPhoto: DEFAULT_AUTHOR_PHOTO,
    loading: true,
    error: null,
    addBook: async () => {},
    updateBookCover: async () => {},
    addBanner: async () => {},
    removeBanner: async () => {},
    addRelease: async () => {},
    removeRelease: async () => {},
    updateAuthorPhoto: async () => {},
    isInitialized: false,
});

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [releases, setReleases] = useState<Release[]>([]);
    const [authorPhoto, setAuthorPhoto] = useState<string>(DEFAULT_AUTHOR_PHOTO);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const initializeData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        // --- MODO OFFLINE / SEM SUPABASE ---
        // Se o cliente supabase for null (chaves não configuradas), não tenta buscar nada.
        if (!supabase) {
            console.warn("Modo offline: Supabase não configurado. Carregando estado vazio.");
            setIsInitialized(true);
            setLoading(false);
            return;
        }

        try {
            // --- FETCH BOOKS ---
            const { data: booksData, error: booksError } = await supabase
                .from('books')
                .select('*')
                .order('created_at', { ascending: false });

            if (booksError) throw booksError;
            
            // Mapeia os campos do DB (snake_case) para o tipo TS (camelCase)
            const mappedBooks: Book[] = (booksData || []).map((b: any) => ({
                id: b.id,
                title: b.title,
                books2readUrl: b.books2read_url,
                amazonUrl: b.amazon_url,
                coverUrl: b.cover_url,
                shortSynopsis: b.short_synopsis,
                fullSynopsis: b.full_synopsis,
                firstChapterMarkdown: b.first_chapter_markdown,
                createdAt: b.created_at
            }));
            setBooks(mappedBooks);

            // --- FETCH BANNERS ---
            const { data: bannersData, error: bannersError } = await supabase
                .from('banners')
                .select('*');
            
            if (bannersError) throw bannersError;

            const mappedBanners: Banner[] = (bannersData || []).map((b: any) => ({
                id: b.id,
                imageUrl: b.image_url,
                linkUrl: b.link_url,
                position: b.position,
                createdAt: b.created_at
            }));
            setBanners(mappedBanners);

            // --- FETCH RELEASES ---
            const { data: releasesData, error: releasesError } = await supabase
                .from('releases')
                .select('*')
                .order('created_at', { ascending: false });

            if (releasesError) throw releasesError;

            const mappedReleases: Release[] = (releasesData || []).map((r: any) => ({
                id: r.id,
                title: r.title,
                description: r.description,
                date: r.date_text, // mapeado do banco "date_text"
                imageUrl: r.image_url
            }));
            setReleases(mappedReleases);

            // --- FETCH AUTHOR PHOTO ---
            const { data: settingsData } = await supabase
                .from('site_settings')
                .select('*')
                .eq('key', 'author_photo')
                .single();

            if (settingsData && settingsData.value) {
                setAuthorPhoto(settingsData.value);
            }

        } catch (err) {
            console.error("Erro na inicialização Supabase:", err);
            // Não bloqueia o site se o DB falhar, apenas mostra vazio ou erro
            setError("Não foi possível conectar à biblioteca arcana (Banco de Dados).");
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    }, []);
    
    useEffect(() => {
        initializeData();
    }, [initializeData]);

    const addBook = async (title: string, books2readUrl: string, amazonUrl?: string) => {
        setLoading(true);
        setError(null);
        try {
            const id = Date.now().toString();
            const details = await generateBookDetails(title);
            
            // Se Supabase estiver ativo, salva lá
            if (supabase) {
                const { error: dbError } = await supabase.from('books').insert([{
                    id: id,
                    title: title,
                    books2read_url: books2readUrl,
                    amazon_url: amazonUrl,
                    cover_url: `https://picsum.photos/seed/${id}/800/1200`, // Placeholder inicial
                    short_synopsis: details.shortSynopsis,
                    full_synopsis: details.fullSynopsis,
                    first_chapter_markdown: details.firstChapterMarkdown
                }]);
                if (dbError) throw new Error(dbError.message);
            } else {
                alert("Aviso: Supabase desconectado. O livro será perdido ao recarregar a página.");
            }

            // Atualiza estado local (Optimistic UI)
            const newBook: Book = {
                ...details,
                id,
                title,
                books2readUrl,
                amazonUrl,
                coverUrl: `https://picsum.photos/seed/${id}/800/1200`,
                createdAt: new Date().toISOString(),
            };

            setBooks(prev => [newBook, ...prev]);

        } catch (err) {
            console.error("Erro ao adicionar livro:", err);
            setError(err instanceof Error ? err.message : "Erro desconhecido.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateBookCover = async (bookId: string, newCoverUrl: string) => {
        if (supabase) {
            const { error } = await supabase
                .from('books')
                .update({ cover_url: newCoverUrl })
                .eq('id', bookId);

            if (error) {
                console.error("Erro ao atualizar capa no DB:", error);
                return;
            }
        }
        // Atualiza Local
        setBooks(prev => prev.map(book =>
            book.id === bookId ? { ...book, coverUrl: newCoverUrl } : book
        ));
    };

    const addBanner = async (imageUrl: string, linkUrl: string, position: 'left' | 'right') => {
        const id = Date.now().toString();
        
        if (supabase) {
            const { error } = await supabase.from('banners').insert([{
                id,
                image_url: imageUrl,
                link_url: linkUrl,
                position
            }]);

            if (error) {
                console.error("Erro ao adicionar banner:", error);
                alert("Erro ao salvar banner no banco.");
                return;
            }
        }

        const newBanner: Banner = {
            id,
            imageUrl,
            linkUrl,
            position,
            createdAt: new Date().toISOString()
        };
        setBanners(prev => [...prev, newBanner]);
    };

    const removeBanner = async (bannerId: string) => {
        if (supabase) {
            const { error } = await supabase.from('banners').delete().eq('id', bannerId);
            if (error) {
                console.error("Erro ao remover banner:", error);
                return;
            }
        }
        setBanners(prev => prev.filter(b => b.id !== bannerId));
    };

    const addRelease = async (title: string, description: string, date: string, imageUrl: string) => {
        const id = Date.now().toString();
        if (supabase) {
            const { error } = await supabase.from('releases').insert([{
                id,
                title,
                description,
                date_text: date,
                image_url: imageUrl
            }]);

            if (error) {
                console.error("Erro ao adicionar lançamento:", error);
                alert("Erro ao salvar lançamento no banco.");
                return;
            }
        }

        const newRelease: Release = {
            id,
            title,
            description,
            date,
            imageUrl
        };
        setReleases(prev => [newRelease, ...prev]);
    };

    const removeRelease = async (releaseId: string) => {
        if (supabase) {
            const { error } = await supabase.from('releases').delete().eq('id', releaseId);
            if (error) {
                console.error("Erro ao remover lançamento:", error);
                return;
            }
        }
        setReleases(prev => prev.filter(r => r.id !== releaseId));
    };

    const updateAuthorPhoto = async (newPhotoUrl: string) => {
        if (supabase) {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ key: 'author_photo', value: newPhotoUrl });

            if (error) {
                console.error("Erro ao salvar foto do autor:", error);
                alert("Erro ao salvar no banco de dados.");
                return;
            }
        }
        setAuthorPhoto(newPhotoUrl);
    };

    return (
        <BookContext.Provider value={{ 
            books, banners, releases, authorPhoto, loading, error, 
            addBook, updateBookCover, addBanner, removeBanner, 
            addRelease, removeRelease, updateAuthorPhoto, isInitialized 
        }}>
            {children}
        </BookContext.Provider>
    );
};
