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
import SalesCompanion from './components/SalesCompanion';
import IntroOverlay from './components/IntroOverlay';
import AtmosphericEvents from './components/AtmosphericEvents';
import SEOManager from './components/SEOManager';
import { playPageTurnSound } from './utils/audio';

export type Page = 'home' | 'books' | 'about' | 'blog';

const pageTitles = {
    home: 'Crônicas da Fantasia | Ashyus Books - Dark Fantasy e Romance',
    books: 'Biblioteca de Livros | Ashyus Books - Sinopses e Capítulos',
    about: 'Quem é Ashyus? | Biografia do Autor de Dark Fantasy',
    blog: 'Blog e Lançamentos | Novidades do Universo Ashyus',
}

const pageDescriptions = {
    home: "Portal oficial do autor Ashyus. Explore best-sellers de Dark Fantasy, Romance Sombrio e Mistério. Entre no reino onde a luz e a sombra colidem.",
    books: "Leia sinopses completas, primeiros capítulos gratuitos e compre os livros da saga Crônicas da Fantasia. Disponível na Amazon e Kindle Unlimited.",
    about: "Conheça a história de Ashyus, o autor brasileiro que está redefinindo a fantasia sombria com narrativas profundas e personagens inesquecíveis.",
    blog: "Fique atualizado com as últimas notícias, datas de lançamento de livros, eventos de autógrafos e contos exclusivos do blog de Ashyus.",
}

const App: React.FC = () => {
    // Inicializa a página baseada na URL atual (suporte para Sitemap)
    const getInitialPage = (): Page => {
        const path = window.location.pathname.replace('/', '');
        if (path === 'books') return 'books';
        if (path === 'about') return 'about';
        if (path === 'blog') return 'blog';
        return 'home';
    };

    const [currentPage, setCurrentPage] = useState<Page>(getInitialPage());
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const hasInteracted = useRef(false);

    const openAdminModal = useCallback(() => setIsAdminModalOpen(true), []);
    const closeAdminModal = useCallback(() => setIsAdminModalOpen(false), []);
    
    // Função para mudar página que atualiza também a URL (SEO Friendly)
    const handlePageChange = (page: Page) => {
        setCurrentPage(page);
        
        // Atualiza URL sem recarregar
        const path = page === 'home' ? '/' : `/${page}`;
        window.history.pushState({ page }, '', path);
        
        // Scroll para o topo para garantir que o Google veja o início do conteúdo
        window.scrollTo(0, 0);
    };

    // Listener para o botão "Voltar" do navegador
    useEffect(() => {
        const handlePopState = () => {
            setCurrentPage(getInitialPage());
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Efeito para trocar o Título e Meta Description (SEO Dinâmico)
    useEffect(() => {
        // Título Otimizado
        document.title = pageTitles[currentPage] || 'Crônicas da Fantasia';
        
        // Meta Description Otimizada
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', pageDescriptions[currentPage] || pageDescriptions.home);
        }

        // Canonical URL
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            const baseUrl = window.location.origin;
            const path = currentPage === 'home' ? '' : `/${currentPage}`;
            canonical.setAttribute('href', `${baseUrl}${path}`);
        }

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
            {/* Gerenciador de SEO Invisível */}
            <SEOManager currentPage={currentPage} />

            {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
            
            <div className={`flex flex-col min-h-screen bg-transparent transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'} relative`}>
                
                {/* Eventos Atmosféricos (Ficam abaixo do conteúdo mas acima do background) */}
                <AtmosphericEvents />

                <Header 
                    currentPage={currentPage} 
                    setCurrentPage={handlePageChange} 
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

                {/* Autômato de Vendas (Robozinho) */}
                <SalesCompanion />

                {isAdminModalOpen && <AdminModal onClose={closeAdminModal} />}
            </div>
        </BookProvider>
    );
};

export default App;