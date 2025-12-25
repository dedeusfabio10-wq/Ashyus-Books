
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BookProvider } from './context/BookContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import AdSidebar from './components/AdSidebar';
import MobileAdBanner from './components/MobileAdBanner';
import SalesCompanion from './components/SalesCompanion';
import IntroOverlay from './components/IntroOverlay';
import AtmosphericEvents from './components/AtmosphericEvents';
import SEOManager from './components/SEOManager';
import { playPageTurnSound } from './utils/audio';

export type Page = 'home' | 'books' | 'about' | 'blog' | 'privacy' | 'terms';
export type HolidayTheme = 'christmas' | 'newyear' | 'normal';

const pageTitles = {
    home: 'Crônicas da Fantasia | Ashyus Books - Dark Fantasy e Romance',
    books: 'Biblioteca de Livros | Ashyus Books - Sinopses e Capítulos',
    about: 'Quem é Ashyus? | Biografia do Autor de Dark Fantasy',
    blog: 'Blog e Lançamentos | Novidades do Universo Ashyus',
    privacy: 'Política de Privacidade | Crônicas da Fantasia',
    terms: 'Termos de Uso | Crônicas da Fantasia',
}

const pageDescriptions = {
    home: "Portal oficial do autor Ashyus. Explore best-sellers de Dark Fantasy, Romance Sombrio e Mistério. Entre no reino onde a luz e a sombra colidem.",
    books: "Leia sinopses completas, primeiros capítulos gratuitos e compre os livros da saga Crônicas da Fantasia. Disponível na Amazon e Kindle Unlimited.",
    about: "Conheça a história de Ashyus, o autor brasileiro que está redefinindo a fantasia sombria com narrativas profundas e personagens inesquecíveis.",
    blog: "Fique atualizado com as últimas notícias, das de lançamento de livros, eventos de autógrafos e contos exclusivos do blog de Ashyus.",
    privacy: "Informações sobre como protegemos seus dados e sua privacidade ao navegar no universo de Ashyus Books.",
    terms: "Regras e condições para uso do conteúdo e navegação no portal Crônicas da Fantasia.",
}

const App: React.FC = () => {
    const getHolidayTheme = (): HolidayTheme => {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        if (month === 12 && day >= 1 && day <= 30) return 'christmas';
        if ((month === 12 && day === 31) || (month === 1 && day === 1)) return 'newyear';
        return 'normal';
    };

    const [currentPage, setCurrentPage] = useState<Page>(() => {
        const path = window.location.pathname.replace('/', '');
        if (['books', 'about', 'blog', 'privacy', 'terms'].includes(path)) return path as Page;
        return 'home';
    });

    const [holidayTheme, setHolidayTheme] = useState<HolidayTheme>(getHolidayTheme());
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const hasInteracted = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const newTheme = getHolidayTheme();
            if (newTheme !== holidayTheme) setHolidayTheme(newTheme);
        }, 3600000);
        return () => clearInterval(interval);
    }, [holidayTheme]);

    const openAdminModal = useCallback(() => setIsAdminModalOpen(true), []);
    const closeAdminModal = useCallback(() => setIsAdminModalOpen(false), []);
    
    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
        const path = page === 'home' ? '/' : `/${page}`;
        window.history.pushState({ page }, '', path);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname.replace('/', '');
            setCurrentPage((path as Page) || 'home');
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        document.title = pageTitles[currentPage] || 'Crônicas da Fantasia';
    }, [currentPage]);

    useEffect(() => {
        if (hasInteracted.current) playPageTurnSound();
    }, [currentPage]);

    const handleIntroComplete = () => {
        setShowIntro(false);
        hasInteracted.current = true;
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage />;
            case 'books': return <BooksPage />;
            case 'about': return <AboutPage />;
            case 'blog': return <BlogPage />;
            case 'privacy': return <PrivacyPage />;
            case 'terms': return <TermsPage />;
            default: return <HomePage />;
        }
    };

    return (
        <BookProvider>
            <SEOManager currentPage={currentPage} />
            {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
            <div className={`flex flex-col min-h-screen bg-transparent transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'} relative theme-${holidayTheme}`}>
                <AtmosphericEvents holidayTheme={holidayTheme} />
                <Header 
                    currentPage={currentPage} 
                    setCurrentPage={handlePageChange} 
                    onAdminClick={openAdminModal}
                    holidayTheme={holidayTheme}
                />
                <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex gap-8 relative justify-center z-10">
                    <AdSidebar side="left" />
                    <main className="flex-1 max-w-full min-w-0 mb-32 xl:mb-0">
                        {renderPage()}
                    </main>
                    <AdSidebar side="right" />
                </div>
                <Footer holidayTheme={holidayTheme} setCurrentPage={handlePageChange} />
                <MobileAdBanner />
                <SalesCompanion holidayTheme={holidayTheme} />
                {isAdminModalOpen && <AdminModal onClose={closeAdminModal} />}
            </div>
        </BookProvider>
    );
};

export default App;
