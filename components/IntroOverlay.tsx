
import React, { useState } from 'react';
import { playEntranceSound } from '../utils/audio';
import Logo from './Logo';

interface IntroOverlayProps {
    onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
    const [isFading, setIsFading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const handleEnter = () => {
        playEntranceSound();
        setIsFading(true);
        setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 1500); // Tempo da transição de saída
    };

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 overflow-hidden ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* --- Camada de Fundo: Neblina --- */}
            <div className="fog-container opacity-60">
                <div className="fog-img"></div>
                <div className="fog-img-2"></div>
            </div>

            {/* --- Camada Intermediária: A Guilda das Sombras (Silhuetas) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
                
                {/* 1. O Relógio do Destino (Fundo superior) */}
                <div className="absolute top-[-10%] md:top-[-20%] right-[-10%] md:right-[5%] opacity-[0.05] animate-spin-slow">
                    <svg width="400" height="400" viewBox="0 0 100 100" className="fill-brand-gold">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M50 15 V10 M50 90 V85 M15 50 H10 M90 50 H85" stroke="currentColor" strokeWidth="3" />
                        {/* Engrenagens internas */}
                        <path d="M50 50 L50 25" stroke="currentColor" strokeWidth="2" />
                        <path d="M50 50 L70 60" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>

                {/* 2. O Ogro Guardião (Esquerda Fundo) */}
                <div className="absolute bottom-0 left-[-5%] md:left-[5%] w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] opacity-[0.15] animate-breathe origin-bottom">
                     <svg viewBox="0 0 200 200" className="fill-current text-slate-800 drop-shadow-2xl">
                        {/* Corpo Massivo e Clava */}
                        <path d="M50,200 L60,150 Q40,100 80,80 Q100,60 130,80 Q160,100 150,150 L160,200 Z" />
                        <circle cx="105" cy="65" r="15" /> {/* Cabeça Pequena */}
                        <path d="M150,100 L180,50 L190,60 L160,110 Z" /> {/* Clava */}
                     </svg>
                </div>

                {/* 3. A Bruxa (Esquerda Centro - Flutuando) */}
                <div className="absolute bottom-[20%] left-[10%] md:left-[20%] w-[20vh] h-[20vh] opacity-30 animate-float-slow">
                    <svg viewBox="0 0 100 100" className="fill-current text-slate-900 drop-shadow-xl">
                        <path d="M20,90 Q50,100 80,90 L50,30 Z" /> {/* Vestido */}
                        <path d="M30,40 L10,30 L30,45" /> {/* Braço */}
                        <path d="M40,30 L50,5 L60,30 Z" /> {/* Chapéu */}
                        <circle cx="50" cy="30" r="8" /> {/* Cabeça */}
                        <rect x="75" y="20" width="2" height="70" transform="rotate(15 75 20)" /> {/* Cajado */}
                        <circle cx="80" cy="20" r="3" className="fill-brand-gold animate-pulse" /> {/* Orbe do Cajado */}
                    </svg>
                </div>

                {/* 4. O Cavaleiro/Aventureiro (Direita Frente) */}
                <div className="absolute bottom-0 right-[5%] md:right-[15%] w-[25vh] h-[25vh] md:w-[35vh] md:h-[35vh] opacity-40">
                    <svg viewBox="0 0 100 100" className="fill-current text-slate-900 drop-shadow-2xl">
                        <path d="M30,100 L35,60 L25,40 L75,40 L65,60 L70,100 Z" /> {/* Armadura Corpo */}
                        <rect x="45" y="100" width="10" height="20" /> {/* Pernas base */}
                        <path d="M35,40 L35,25 Q50,15 65,25 L65,40 Z" /> {/* Capacete/Ombros */}
                        <rect x="48" y="20" width="4" height="80" className="fill-slate-800" /> {/* Espada fincada no chão */}
                        <rect x="40" y="25" width="20" height="4" /> {/* Guarda da Espada */}
                        <path d="M25,40 Q10,60 15,90" fill="none" stroke="currentColor" strokeWidth="2" /> {/* Capa */}
                    </svg>
                </div>

            </div>

            {/* --- Camada Frontal: UI --- */}
            <div className="relative z-20 text-center px-4 animate-fade-in flex flex-col items-center max-w-4xl mx-auto">
                <div className="mb-8 relative group">
                    <div className="absolute inset-0 bg-brand-gold/20 blur-[50px] rounded-full animate-pulse transition-all duration-1000 group-hover:bg-brand-gold/30"></div>
                    <Logo className="w-24 h-24 md:w-32 md:h-32 text-brand-gold drop-shadow-[0_0_20px_rgba(251,191,36,0.6)] relative z-10" />
                </div>
                
                <h1 className="font-serif text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-gold via-brand-gold to-brand-gold-dark mb-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    Crônicas da Fantasia
                </h1>
                <p className="text-gray-400 text-sm md:text-lg tracking-[0.3em] uppercase mb-12 font-light border-b border-brand-gold/20 pb-4">
                    Ashyus Books
                </p>

                <button 
                    onClick={handleEnter}
                    className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-sm transition-all duration-500 cursor-pointer hover:scale-105"
                >
                    <div className="absolute inset-0 w-0 bg-brand-gold/10 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50 group-hover:opacity-100 group-hover:h-[2px] transition-all"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50 group-hover:opacity-100 group-hover:h-[2px] transition-all"></div>
                    
                    <span className="relative text-brand-gold font-serif text-xl md:text-2xl italic tracking-widest group-hover:text-white transition-colors duration-300 drop-shadow-md">
                        Adentrar o Reino
                    </span>
                    
                    {/* Partículas brilhantes no botão (pseudo-elements via CSS seria ideal, mas SVG funciona bem) */}
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                    <div className="absolute top-1/2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-100"></div>
                </button>
            </div>
            
            {/* Vinheta escura nas bordas */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10"></div>
        </div>
    );
};

export default IntroOverlay;
