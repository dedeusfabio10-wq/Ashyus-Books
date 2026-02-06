
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Book, Banner, Release } from '../types';
import { supabase } from '../services/supabaseClient';
import { INITIAL_BOOKS } from '../constants';

interface BookContextType {
    books: Book[];
    banners: Banner[];
    releases: Release[];
    authorPhoto: string;
    loading: boolean;
    error: string | null;
    addBook: (
        title: string,
        books2readUrl: string,
        amazonUrl: string | undefined,
        amazonEbookUrl: string | undefined,
        draftBookUrl: string | undefined,
        coverBase64: string | undefined,
        shortSynopsis: string,
        fullSynopsis: string,
        firstChapter: string
    ) => Promise<void>;
    updateBook: (bookId: string, updates: Partial<Book>) => Promise<void>;
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
    addBook: async () => { },
    updateBook: async () => { },
    updateBookCover: async () => { },
    addBanner: async () => { },
    removeBanner: async () => { },
    addRelease: async () => { },
    removeRelease: async () => { },
    updateAuthorPhoto: async () => { },
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

    const loadData = useCallback(async () => {
        if (!supabase) {
            setLoading(false);
            setIsInitialized(true);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Carrega os livros (Tenta pegar tudo, se falhar o catch trata)
            const { data: bData, error: bError } = await supabase
                .from('books')
                .select('*')
                .order('created_at', { ascending: false });

            if (bError) throw bError;



            // ... (imports)

            // ... inside loadData function ...

            let finalBooks: Book[] = [];

            if (bData) {
                finalBooks = bData.map((b: any) => ({
                    id: b.id,
                    title: b.title,
                    books2readUrl: b.books2read_url || '',
                    amazonUrl: b.amazon_url || '',
                    amazonEbookUrl: b.amazon_ebook_url || '',
                    draftBookUrl: b.draft_book_url || '',
                    coverUrl: b.cover_url || '',
                    shortSynopsis: b.short_synopsis || '',
                    fullSynopsis: b.full_synopsis || '',
                    firstChapterMarkdown: b.first_chapter_markdown || '',
                    createdAt: b.created_at
                }));
            }

            // Merge with INITIAL_BOOKS if they don't exist in DB (by title)
            const dbTitles = new Set(finalBooks.map(b => b.title.toLowerCase()));
            const missingStaticBooks = INITIAL_BOOKS.filter(ib => !dbTitles.has(ib.title.toLowerCase())).map(ib => ({
                ...ib,
                id: `static-${Date.now()}-${Math.random()}` // Ensure unique ID for UI
            }));

            // Combine and Sort
            setBooks([...finalBooks, ...missingStaticBooks].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ));

            // 2. Carrega Banners
            const { data: banData } = await supabase.from('banners').select('*');
            if (banData) {
                setBanners(banData.map((b: any) => ({
                    id: b.id, imageUrl: b.image_url, linkUrl: b.link_url, position: b.position, createdAt: b.created_at
                })));
            }

            // 3. Carrega Lançamentos
            const { data: relData } = await supabase.from('releases').select('*').order('created_at', { ascending: false });
            if (relData) {
                setReleases(relData.map((r: any) => ({
                    id: r.id, title: r.title, description: r.description, date: r.date_text, imageUrl: r.image_url
                })));
            }

            // 4. Foto do Autor
            const { data: sData } = await supabase.from('site_settings').select('value').eq('key', 'author_photo').maybeSingle();
            if (sData?.value) setAuthorPhoto(sData.value);

        } catch (err: any) {
            console.error("Erro no Supabase:", err);
            // Se der timeout, mostramos uma mensagem amigável mas mantemos o loading false para não travar
            setError(`O banco de dados está lento devido ao peso das imagens (Timeout). Tente recarregar a página.`);
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const addBook = async (title: string, books2readUrl: string, amazonUrl: string | undefined, amazonEbookUrl: string | undefined, draftBookUrl: string | undefined, coverBase64: string | undefined, shortSynopsis: string, fullSynopsis: string, firstChapter: string) => {
        setLoading(true);
        try {
            const id = Date.now().toString();
            const finalCoverUrl = coverBase64 || `https://picsum.photos/seed/${id}/800/1200`;
            if (supabase) {
                const { error: dbError } = await supabase.from('books').insert([{
                    id, title, books2read_url: books2readUrl, amazon_url: amazonUrl, amazon_ebook_url: amazonEbookUrl, draft_book_url: draftBookUrl, cover_url: finalCoverUrl, short_synopsis: shortSynopsis, full_synopsis: fullSynopsis, first_chapter_markdown: firstChapter
                }]);
                if (dbError) throw dbError;
            }
            const newBook: Book = { id, title, books2readUrl, amazonUrl, amazonEbookUrl, draftBookUrl, coverUrl: finalCoverUrl, shortSynopsis, fullSynopsis, firstChapterMarkdown: firstChapter, createdAt: new Date().toISOString() };
            setBooks(prev => [newBook, ...prev]);
        } catch (err: any) {
            alert(`Erro: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updateBook = async (bookId: string, updates: Partial<Book>) => {
        setLoading(true);
        try {
            if (supabase) {
                const dbUpdates: any = {};
                if (updates.title) dbUpdates.title = updates.title;
                if (updates.books2readUrl !== undefined) dbUpdates.books2read_url = updates.books2readUrl;
                if (updates.amazonUrl !== undefined) dbUpdates.amazon_url = updates.amazonUrl;
                if (updates.amazonEbookUrl !== undefined) dbUpdates.amazon_ebook_url = updates.amazonEbookUrl;
                if (updates.draftBookUrl !== undefined) dbUpdates.draft_book_url = updates.draftBookUrl;
                if (updates.shortSynopsis) dbUpdates.short_synopsis = updates.shortSynopsis;
                if (updates.fullSynopsis) dbUpdates.full_synopsis = updates.fullSynopsis;
                if (updates.firstChapterMarkdown) dbUpdates.first_chapter_markdown = updates.firstChapterMarkdown;
                const { error: dbError } = await supabase.from('books').update(dbUpdates).eq('id', bookId);
                if (dbError) throw dbError;
            }
            setBooks(prev => prev.map(book => book.id === bookId ? { ...book, ...updates } : book));
        } catch (err: any) {
            alert(`Erro: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updateBookCover = async (bookId: string, newCoverUrl: string) => {
        if (supabase) {
            await supabase.from('books').update({ cover_url: newCoverUrl }).eq('id', bookId);
        }
        setBooks(prev => prev.map(book => book.id === bookId ? { ...book, coverUrl: newCoverUrl } : book));
    };

    const addBanner = async (imageUrl: string, linkUrl: string, position: 'left' | 'right') => {
        const id = Date.now().toString();
        if (supabase) await supabase.from('banners').insert([{ id, image_url: imageUrl, link_url: linkUrl, position }]);
        setBanners(prev => [...prev, { id, imageUrl, linkUrl, position, createdAt: new Date().toISOString() }]);
    };

    const removeBanner = async (bannerId: string) => {
        if (supabase) await supabase.from('banners').delete().eq('id', bannerId);
        setBanners(prev => prev.filter(b => b.id !== bannerId));
    };

    const addRelease = async (title: string, description: string, date: string, imageUrl: string) => {
        const id = Date.now().toString();
        if (supabase) await supabase.from('releases').insert([{ id, title, description, date_text: date, image_url: imageUrl }]);
        setReleases(prev => [{ id, title, description, date, imageUrl }, ...prev]);
    };

    const removeRelease = async (releaseId: string) => {
        if (supabase) await supabase.from('releases').delete().eq('id', releaseId);
        setReleases(prev => prev.filter(r => r.id !== releaseId));
    };

    const updateAuthorPhoto = async (newPhotoUrl: string) => {
        if (supabase) await supabase.from('site_settings').upsert({ key: 'author_photo', value: newPhotoUrl });
        setAuthorPhoto(newPhotoUrl);
    };

    return (
        <BookContext.Provider value={{
            books, banners, releases, authorPhoto, loading, error,
            addBook, updateBook, updateBookCover, addBanner, removeBanner,
            addRelease, removeRelease, updateAuthorPhoto, isInitialized
        }}>
            {children}
        </BookContext.Provider>
    );
};
