
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Book, Banner, Release } from '../types';
import { supabase } from '../services/supabaseClient';

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
    addBook: async () => {},
    updateBook: async () => {},
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
        
        if (!supabase) {
            setIsInitialized(true);
            setLoading(false);
            return;
        }

        try {
            const { data: booksData, error: booksError } = await supabase
                .from('books')
                .select('*')
                .order('created_at', { ascending: false });

            if (booksError) throw booksError;
            
            const mappedBooks: Book[] = (booksData || []).map((b: any) => ({
                id: b.id,
                title: b.title,
                books2readUrl: b.books2read_url,
                amazonUrl: b.amazon_url,
                amazonEbookUrl: b.amazon_ebook_url,
                draftBookUrl: b.draft_book_url,
                coverUrl: b.cover_url,
                shortSynopsis: b.short_synopsis,
                fullSynopsis: b.full_synopsis,
                firstChapterMarkdown: b.first_chapter_markdown,
                createdAt: b.created_at
            }));
            setBooks(mappedBooks);

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

            const { data: releasesData, error: releasesError } = await supabase
                .from('releases')
                .select('*')
                .order('created_at', { ascending: false });

            if (releasesError) throw releasesError;

            const mappedReleases: Release[] = (releasesData || []).map((r: any) => ({
                id: r.id,
                title: r.title,
                description: r.description,
                date: r.date_text,
                imageUrl: r.image_url
            }));
            setReleases(mappedReleases);

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
            setError("Não foi possível conectar à biblioteca arcana.");
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    }, []);
    
    useEffect(() => {
        initializeData();
    }, [initializeData]);

    const addBook = async (
        title: string, 
        books2readUrl: string, 
        amazonUrl: string | undefined, 
        amazonEbookUrl: string | undefined,
        draftBookUrl: string | undefined,
        coverBase64: string | undefined,
        shortSynopsis: string,
        fullSynopsis: string,
        firstChapter: string
    ) => {
        setLoading(true);
        setError(null);
        try {
            const id = Date.now().toString();
            const finalCoverUrl = coverBase64 || `https://picsum.photos/seed/${id}/800/1200`;

            if (supabase) {
                const { error: dbError } = await supabase.from('books').insert([{
                    id: id,
                    title: title,
                    books2read_url: books2readUrl,
                    amazon_url: amazonUrl,
                    amazon_ebook_url: amazonEbookUrl,
                    draft_book_url: draftBookUrl,
                    cover_url: finalCoverUrl,
                    short_synopsis: shortSynopsis,
                    full_synopsis: fullSynopsis,
                    first_chapter_markdown: firstChapter
                }]);
                if (dbError) throw new Error(dbError.message);
            }

            const newBook: Book = {
                id,
                title,
                books2readUrl,
                amazonUrl,
                amazonEbookUrl,
                draftBookUrl,
                coverUrl: finalCoverUrl,
                shortSynopsis,
                fullSynopsis,
                firstChapterMarkdown: firstChapter,
                createdAt: new Date().toISOString(),
            };

            setBooks(prev => [newBook, ...prev]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro desconhecido.");
            throw err;
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

                const { error } = await supabase
                    .from('books')
                    .update(dbUpdates)
                    .eq('id', bookId);

                if (error) throw error;
            }
            setBooks(prev => prev.map(book => book.id === bookId ? { ...book, ...updates } : book));
        } catch (err) {
            console.error("Erro ao atualizar livro:", err);
            alert("Erro ao atualizar dados do livro.");
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
            if (error) return;
        }
        const newBanner: Banner = { id, imageUrl, linkUrl, position, createdAt: new Date().toISOString() };
        setBanners(prev => [...prev, newBanner]);
    };

    const removeBanner = async (bannerId: string) => {
        if (supabase) await supabase.from('banners').delete().eq('id', bannerId);
        setBanners(prev => prev.filter(b => b.id !== bannerId));
    };

    const addRelease = async (title: string, description: string, date: string, imageUrl: string) => {
        const id = Date.now().toString();
        if (supabase) {
            await supabase.from('releases').insert([{
                id, title, description, date_text: date, image_url: imageUrl
            }]);
        }
        setReleases(prev => [{ id, title, description, date, imageUrl }, ...prev]);
    };

    const removeRelease = async (releaseId: string) => {
        if (supabase) await supabase.from('releases').delete().eq('id', releaseId);
        setReleases(prev => prev.filter(r => r.id !== releaseId));
    };

    const updateAuthorPhoto = async (newPhotoUrl: string) => {
        if (supabase) {
            await supabase.from('site_settings').upsert({ key: 'author_photo', value: newPhotoUrl });
        }
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
