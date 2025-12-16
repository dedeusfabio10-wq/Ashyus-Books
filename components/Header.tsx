import React, { useState, MouseEvent } from 'react';
import { Page } from '../App';
import Logo from './Logo';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    onAdminClick: () => void;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, setCurrentPage, children }) => (
    <button 
        onClick={() => setCurrentPage(page)}
        className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-300 tracking-wide ${
            currentPage === page 
            ? 'text-brand-gold bg-white/5 shadow-sm shadow-brand-gold/10' 
            : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
    >
        {children}
    </button>
);


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, onAdminClick }) => {
    const [clickCount, setClickCount] = useState(0);
    const [lastClick, setLastClick] = useState(0);

    const handleTitleClick = (event: MouseEvent<HTMLDivElement>) => {
        const now = Date.now();
        if (now - lastClick > 1000) { // Reset if clicks are more than 1s apart
            setClickCount(1);
        } else {
            setClickCount(prev => prev + 1);
        }
        setLastClick(now);

        if (clickCount + 1 >= 5) {
            onAdminClick();
            setClickCount(0);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between py-4 md:py-0 md:h-24 gap-4 md:gap-0">
                    <div 
                        className="flex items-center gap-3 cursor-pointer group select-none"
                        onClick={handleTitleClick}
                        title="Clique 5 vezes para abrir o painel de admin"
                    >
                        <Logo className="w-10 h-10 md:w-12 md:h-12 text-brand-gold transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                        <div className="flex flex-col items-center md:items-start">
                            <h1 className="font-serif text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-gray-400 group-hover:to-white transition-all drop-shadow-sm leading-none">
                                Crônicas da Fantasia
                            </h1>
                            <span className="text-[10px] md:text-xs text-brand-gold uppercase tracking-[0.25em] font-semibold mt-1 group-hover:text-brand-gold-dark transition-colors">
                                por Ashyus Books
                            </span>
                        </div>
                    </div>
                    <nav className="flex items-center space-x-1 md:space-x-2">
                        <NavLink page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavLink>
                        <NavLink page="books" currentPage={currentPage} setCurrentPage={setCurrentPage}>Livros</NavLink>
                        <NavLink page="about" currentPage={currentPage} setCurrentPage={setCurrentPage}>Sobre</NavLink>
                        <NavLink page="blog" currentPage={currentPage} setCurrentPage={setCurrentPage}>Lançamentos</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;