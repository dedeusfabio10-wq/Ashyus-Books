import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BookProvider } from './context/BookContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import AdSidebar from './components/AdSidebar';
import MobileAdBanner from './components/MobileAdBanner';
import IntroOverlay from './components/IntroOverlay';
import AtmosphericEvents from './components/AtmosphericEvents';
import { playPageTurnSound } from './utils/audio';

export type Page = 'home' | 'books' | 'about' | 'blog';

const pageTitles = {
    home: 'Crônicas da Fantasia - Home',
    books: 'Biblioteca - Crônicas da Fantasia',
    about: 'O Autor - Ashyus Books',
    blog: 'Lançamentos - Crônicas da Fantasia',
}

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    // Ref para rastrear se a primeira interação já ocorreu para evitar som na montagem inicial antes do intro
    const hasInteracted = useRef(false);

    const openAdminModal = useCallback(() => setIsAdminModalOpen(true), []);
    const closeAdminModal = useCallback(() => setIsAdminModalOpen(false), []);
    
    // Efeito para trocar o título
    useEffect(() => {
        document.title = pageTitles[currentPage] || 'Crônicas da Fantasia';
    }, [currentPage]);

    // Efeito para tocar som na troca de página
    useEffect(() => {
        if (hasInteracted.current) {
            playPageTurnSound();
        }
    }, [currentPage]);

    const handleIntroComplete = () => {
        setShowIntro(false);
        hasInteracted.current = true;
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'books':
                return <BooksPage />;
            case 'about':
                return <AboutPage />;
            case 'blog':
                return <BlogPage />;
            default:
                return <HomePage />;
        }
    };

    return (
        <BookProvider>
            {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
            
            <div className={`flex flex-col min-h-screen bg-transparent transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'} relative`}>
                
                {/* Eventos Atmosféricos (Ficam abaixo do conteúdo mas acima do background) */}
                <AtmosphericEvents />

                <Header 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage} 
                    onAdminClick={openAdminModal}
                />
                
                {/* Container Principal com Layout Flex para Sidebars */}
                <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex gap-8 relative justify-center z-10">
                    
                    {/* Lateral Esquerda (Só aparece em telas grandes) */}
                    <AdSidebar side="left" />

                    {/* Conteúdo Principal */}
                    <main className="flex-1 max-w-full min-w-0 mb-32 xl:mb-0">
                        {renderPage()}
                    </main>

                    {/* Lateral Direita (Só aparece em telas grandes) */}
                    <AdSidebar side="right" />
                    
                </div>

                <Footer />
                
                {/* Banner Mobile (Aparece apenas em telas menores que XL) */}
                <MobileAdBanner />

                {isAdminModalOpen && <AdminModal onClose={closeAdminModal} />}
            </div>
        </BookProvider>
    );
};

export default App;