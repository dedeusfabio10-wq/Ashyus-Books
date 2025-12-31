
import React, { useState, MouseEvent, useEffect } from 'react';
import { Page, HolidayTheme } from '../App';
import Logo from './Logo';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    onAdminClick: () => void;
    holidayTheme?: HolidayTheme;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, setCurrentPage, children }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setCurrentPage(page);
    };
    const href = page === 'home' ? '/' : `/${page}`;
    return (
        <a 
            href={href}
            onClick={handleClick}
            className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-300 tracking-wide ${
                currentPage === page 
                ? 'text-brand-gold bg-white/5 shadow-sm shadow-brand-gold/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
        >
            {children}
        </a>
    );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onAdminClick, holidayTheme = 'normal' }) => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClick, setLastClick] = useState(0);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Verifica se já está instalado
        if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
            setIsStandalone(true);
        }

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            console.log("PWA: Prompt de instalação capturado e disponível.");
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const handleTitleClick = (event: MouseEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastClick > 1000) setClickCount(1);
        else setClickCount(prev => prev + 1);
        setLastClick(now);
        if (clickCount + 1 >= 5) {
            onAdminClick();
            setClickCount(0);
        }
    };

    return (
        <header className={`sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b transition-colors duration-500 ${holidayTheme === 'christmas' ? 'border-red-500/20 shadow-red-900/10' : holidayTheme === 'newyear' ? 'border-yellow-500/20 shadow-yellow-900/10' : 'border-white/5 shadow-black/20'} shadow-lg`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-0 md:h-24 gap-4 md:gap-0">
                    <div 
                        className="flex items-center gap-3 cursor-pointer group select-none"
                        onClick={handleTitleClick}
                    >
                        <Logo holidayTheme={holidayTheme} className="w-10 h-10 md:w-12 md:h-12 text-brand-gold transition-transform duration-500 group-hover:scale-110" />
                        <div className="flex flex-col items-center md:items-start">
                            <h1 className={`font-serif text-2xl md:text-3xl font-bold text-transparent bg-clip-text transition-all leading-none ${holidayTheme === 'christmas' ? 'bg-gradient-to-r from-red-100 to-red-400' : holidayTheme === 'newyear' ? 'bg-gradient-to-r from-yellow-100 to-yellow-400' : 'bg-gradient-to-r from-brand-light to-gray-400'}`}>
                                Crônicas da Fantasia
                            </h1>
                            <span className={`text-[10px] md:text-xs uppercase tracking-[0.25em] font-semibold mt-1 transition-colors ${holidayTheme === 'christmas' ? 'text-red-500' : holidayTheme === 'newyear' ? 'text-yellow-500' : 'text-brand-gold'}`}>
                                por Ashyus Books
                            </span>
                        </div>
                    </div>
                    
                    <nav className="flex items-center space-x-1 md:space-x-2" role="navigation" aria-label="Menu Principal">
                        <NavLink page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
                        <NavLink page="books" currentPage={currentPage} setCurrentPage={setCurrentPage}>Livros</NavLink>
                        <NavLink page="about" currentPage={currentPage} setCurrentPage={setCurrentPage}>Sobre</NavLink>
                        <NavLink page="blog" currentPage={currentPage} setCurrentPage={setCurrentPage}>Lançamentos</NavLink>
                        
                        {!isStandalone && deferredPrompt && (
                            <button 
                                onClick={handleInstallClick}
                                className="ml-2 bg-brand-gold text-brand-dark px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-pulse"
                                title="Instalar Aplicativo Ashyus Books"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                <span className="hidden sm:inline">Instalar App</span>
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
