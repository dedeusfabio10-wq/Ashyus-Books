
import React, { useState, useEffect } from 'react';
import { playEntranceSound } from '../utils/audio';
import Logo from './Logo';

interface IntroOverlayProps {
    onComplete: () => void;
}

type IntroStage = 'initial' | 'wizard' | 'exiting';

const WizardFigure = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40 md:opacity-50">
        <svg viewBox="0 0 200 200" className="w-[80%] h-[80%] max-w-[500px] animate-float-slow">
            <defs>
                <radialGradient id="wizardEyes" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                </radialGradient>
            </defs>
            <path 
                d="M100 30 C60 30 40 70 45 110 L30 180 L170 180 L155 110 C160 70 140 30 100 30Z" 
                fill="#020617" 
                stroke="#fbbf24" 
                strokeWidth="0.5"
                className="drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]"
            />
            <path 
                d="M60 85 Q100 65 140 85 Q140 120 100 130 Q60 120 60 85" 
                fill="#000" 
            />
            <g className="animate-pulse">
                <circle cx="85" cy="95" r="2" fill="url(#wizardEyes)">
                    <animate attributeName="r" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="115" cy="95" r="2" fill="url(#wizardEyes)">
                    <animate attributeName="r" values="1.5;2.5;1.5" dur="3s" repeatCount="indefinite" />
                </circle>
            </g>
            <path 
                d="M50 180 Q30 140 50 100 M150 180 Q170 140 150 100" 
                stroke="#fbbf24" 
                strokeWidth="0.2" 
                fill="none" 
                strokeDasharray="4 4"
                opacity="0.3"
            />
        </svg>
    </div>
);

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
    const [stage, setStage] = useState<IntroStage>('initial');
    const [isVisible, setIsVisible] = useState(true);
    const [refusalCount, setRefusalCount] = useState(0);

    useEffect(() => {
        // Detecção ultra-robusta de rastreadores (Bots)
        const userAgent = window.navigator.userAgent.toLowerCase();
        const botKeywords = ['bot', 'google', 'adsense', 'crawler', 'spider', 'robot', 'crawling', 'lighthouse', 'mediapartners'];
        const isBot = botKeywords.some(keyword => userAgent.includes(keyword));
        
        if (isBot) {
            console.log("Robô detectado, saltando introdução para AdSense...");
            setIsVisible(false);
            onComplete();
        }
    }, [onComplete]);
    
    const handleInitialClick = () => {
        playEntranceSound();
        setStage('wizard');
    };

    const handleConfirmYes = () => {
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
            window.location.reload();
        }
    };

    // Para o AdSense não considerar a tela como "sem conteúdo", usamos um rendering condicional
    // mas mantemos os elementos no DOM se for um bot (embora o useEffect acima já resolva a maioria)
    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 overflow-hidden ${stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Bem-vindo às Crônicas da Fantasia"
        >
            <div className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-1000 ${stage === 'wizard' ? 'opacity-90' : 'opacity-60'}`}></div>

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

            {stage === 'wizard' && (
                <div className="relative z-30 flex flex-col items-center justify-center h-full w-full pb-10 md:pb-0 text-center px-6">
                    <WizardFigure />
                    <div className="relative z-10 space-y-8 animate-fade-in">
                        <h2 className="font-serif text-3xl md:text-6xl text-white font-bold drop-shadow-[0_2px_15px_rgba(0,0,0,1)] tracking-wide">
                            "Você tem certeza que quer entrar?"
                        </h2>
                        <p className="text-brand-gold/70 italic text-sm md:text-lg max-w-md mx-auto">
                            O guardião das crônicas observa sua alma através das sombras...
                        </p>
                        <div className="flex justify-center gap-8 md:gap-16 pt-4">
                            <button 
                                onClick={handleConfirmYes}
                                className="bg-brand-gold text-brand-dark font-bold font-serif text-xl px-10 py-4 rounded-sm shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:bg-white hover:scale-110 transition-all duration-300 uppercase tracking-widest"
                            >
                                SIM
                            </button>
                            <button 
                                onClick={handleRefuseNo}
                                className="bg-transparent border border-red-900 text-red-500 font-bold font-serif text-xl px-10 py-4 rounded-sm hover:bg-red-900/20 hover:text-red-400 hover:scale-95 transition-all duration-300 uppercase tracking-widest"
                            >
                                NÃO
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10"></div>
        </div>
    );
};

export default IntroOverlay;
