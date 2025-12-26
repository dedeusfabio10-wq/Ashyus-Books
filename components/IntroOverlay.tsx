
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

    useEffect(() => {
        // Auto-completar intro para rastreadores de anúncios e bots de busca
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isBot = /bot|google|adsense|crawler|spider|robot|crawling/i.test(userAgent);
        
        if (isBot) {
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

    if (!isVisible) return null;

    return (
        <div 
            className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 overflow-hidden ${stage === 'exiting' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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
                <div className="relative z-30 flex flex-col items-center justify-center h-full w-full pb-10 md:pb-0 text-center">
                    <h2 className="font-serif text-3xl md:text-5xl text-white font-bold drop-shadow-[0_0_10px_rgba(0,0,0,1)] mb-8 tracking-wide animate-fade-in">
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
            )}
            
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] z-10"></div>
        </div>
    );
};

export default IntroOverlay;
