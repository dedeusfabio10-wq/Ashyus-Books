import React, { useState, useEffect } from 'react';
import { playEntranceSound } from '../utils/audio';
import Logo from './Logo';

interface IntroOverlayProps {
    onComplete: () => void;
}

type IntroStage = 'initial' | 'wizard' | 'exiting';

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
    const [stage, setStage] = useState<IntroStage>('initial');
    const [isVisible, setIsVisible] = useState(true);
    const [refusalCount, setRefusalCount] = useState(0);

    // Efeito para "olhos seguindo" (simulado com animação CSS simples no SVG)
    
    const handleInitialClick = () => {
        // Toca um som de suspense/entrada
        playEntranceSound();
        setStage('wizard');
    };

    const handleConfirmYes = () => {
        // Som final de entrada
        playEntranceSound();
        setStage('exiting');
        
        setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 1500);
    };

    const handleRefuseNo = () => {
        setRefusalCount(prev => prev + 1);
        if (refusalCount < 2) {
            alert("O Mago franze a testa. 'A covardia é uma escolha segura...'");
            setStage('initial');
        } else {
            alert("O Mago ri da sua hesitação. 'Vá embora então, mortal.'");
            window.location.reload(); // Reinicia forçadamente
        }
    };

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 overflow-hidden ${stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            {/* --- Camada de Fundo: Neblina --- */}
            {/* Intensifica a neblina quando o mago aparece */}
            <div className={`fog-container transition-opacity duration-1000 ${stage === 'wizard' ? 'opacity-90' : 'opacity-60'}`}>
                <div className="fog-img"></div>
                <div className="fog-img-2"></div>
            </div>

            {/* --- Camada Intermediária: Elementos de Fundo (Apenas no estágio inicial) --- */}
            <div className={`absolute inset-0 z-0 pointer-events-none w-full h-full transition-opacity duration-500 ${stage === 'wizard' ? 'opacity-0' : 'opacity-100'}`}>
                {/* 1. O Relógio do Destino */}
                <div className="absolute top-[-10%] md:top-[-20%] right-[-10%] md:right-[5%] opacity-[0.05] animate-spin-slow">
                    <svg width="400" height="400" viewBox="0 0 100 100" className="fill-brand-gold">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5,5" />
                        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M50 15 V10 M50 90 V85 M15 50 H10 M90 50 H85" stroke="currentColor" strokeWidth="3" />
                        <path d="M50 50 L50 25" stroke="currentColor" strokeWidth="2" />
                        <path d="M50 50 L70 60" stroke="currentColor" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* --- ESTÁGIO 1: TELA INICIAL --- */}
            {stage === 'initial' && (
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
                        onClick={handleInitialClick}
                        className="group relative px-10 py-4 bg-transparent overflow-hidden rounded-sm transition-all duration-500 cursor-pointer hover:scale-105"
                    >
                        <div className="absolute inset-0 w-0 bg-brand-gold/10 transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50 group-hover:opacity-100 group-hover:h-[2px] transition-all"></div>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50 group-hover:opacity-100 group-hover:h-[2px] transition-all"></div>
                        
                        <span className="relative text-brand-gold font-serif text-xl md:text-2xl italic tracking-widest group-hover:text-white transition-colors duration-300 drop-shadow-md">
                            Adentrar o Reino
                        </span>
                    </button>
                </div>
            )}

            {/* --- ESTÁGIO 2: O MAGO GUARDIÃO --- */}
            {stage === 'wizard' && (
                <div className="relative z-30 flex flex-col items-center justify-end h-full w-full pb-10 md:pb-0">
                    
                    {/* Diálogo / UI */}
                    <div className="absolute top-1/4 md:top-1/3 z-40 text-center animate-fade-in w-full px-4">
                        <h2 className="font-serif text-3xl md:text-5xl text-white font-bold drop-shadow-[0_0_10px_rgba(0,0,0,1)] mb-8 tracking-wide">
                            "Você tem certeza que quer entrar?"
                        </h2>
                        
                        <div className="flex justify-center gap-8 md:gap-16">
                            <button 
                                onClick={handleConfirmYes}
                                className="bg-brand-gold text-brand-dark font-bold font-serif text-xl px-8 py-3 rounded shadow-[0_0_20px_rgba(251,191,36,0.5)] hover:bg-white hover:scale-110 transition-all duration-300"
                            >
                                SIM
                            </button>
                            <button 
                                onClick={handleRefuseNo}
                                className="bg-transparent border border-red-900 text-red-500 font-bold font-serif text-xl px-8 py-3 rounded hover:bg-red-900/20 hover:text-red-400 hover:scale-95 transition-all duration-300"
                            >
                                NÃO
                            </button>
                        </div>
                    </div>

                    {/* O Mago (SVG Gigante) saindo da fumaça */}
                    <div className="relative w-[80vw] max-w-[600px] h-[60vh] md:h-[70vh] animate-slide-up origin-bottom">
                         {/* Aura Sombria atrás do mago */}
                         <div className="absolute inset-0 bg-purple-900/20 blur-[60px] rounded-full animate-pulse"></div>
                         
                         <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl filter brightness-90">
                            <defs>
                                <linearGradient id="cloakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0f172a" />
                                    <stop offset="50%" stopColor="#1e293b" />
                                    <stop offset="100%" stopColor="#0f172a" />
                                </linearGradient>
                                <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            
                            {/* Corpo / Manto (Silhueta escura) */}
                            <path 
                                d="M200,50 C150,50 100,100 80,150 C60,200 40,400 20,500 L380,500 C360,400 340,200 320,150 C300,100 250,50 200,50 Z" 
                                fill="url(#cloakGrad)" 
                                stroke="#000" 
                                strokeWidth="2"
                            />
                            
                            {/* Capuz (Abertura escura) */}
                            <path 
                                d="M200,60 C160,60 130,90 130,140 C130,220 160,250 200,280 C240,250 270,220 270,140 C270,90 240,60 200,60 Z" 
                                fill="#000"
                            />

                            {/* Detalhes do Manto (Dobras) */}
                            <path d="M130,140 Q100,300 110,500" fill="none" stroke="#000" strokeWidth="3" opacity="0.5" />
                            <path d="M270,140 Q300,300 290,500" fill="none" stroke="#000" strokeWidth="3" opacity="0.5" />

                            {/* Cajado (Mão Direita - Esquerda da tela) */}
                            <g transform="translate(80, 200)">
                                <rect x="0" y="0" width="10" height="300" fill="#2d2d2d" />
                                {/* Orbe no topo do cajado */}
                                <circle cx="5" cy="0" r="20" fill="#4c1d95" className="animate-pulse" />
                                <circle cx="5" cy="0" r="15" fill="#a855f7" opacity="0.5" />
                            </g>
                            
                            {/* Olhos (Intimidação) */}
                            <g className="animate-breathe">
                                {/* Olho Esquerdo */}
                                <circle cx="170" cy="160" r="6" fill="#fbbf24">
                                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.8;1;0.8" dur="0.2s" repeatCount="indefinite" />
                                </circle>
                                {/* Brilho intenso olho esquerdo */}
                                <circle cx="170" cy="160" r="15" fill="url(#eyeGlow)" opacity="0.4">
                                     <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                                </circle>

                                {/* Olho Direito */}
                                <circle cx="230" cy="160" r="6" fill="#fbbf24">
                                    <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.8;1;0.8" dur="0.2s" repeatCount="indefinite" />
                                </circle>
                                {/* Brilho intenso olho direito */}
                                <circle cx="230" cy="160" r="15" fill="url(#eyeGlow)" opacity="0.4">
                                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
                                </circle>
                            </g>

                            {/* Mão (Esquelética segurando o manto) */}
                            <path d="M270,250 Q280,260 260,280" stroke="#a3a3a3" strokeWidth="3" fill="none" />
                            <path d="M275,245 Q285,255 265,275" stroke="#a3a3a3" strokeWidth="3" fill="none" />

                         </svg>
                    </div>
                </div>
            )}
            
            {/* Vinheta escura nas bordas */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10"></div>
        </div>
    );
};

export default IntroOverlay;