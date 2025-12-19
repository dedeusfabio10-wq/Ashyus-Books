
import React, { useState, useEffect, useContext } from 'react';
import { BookContext } from '../context/BookContext';
import { playRobotSound } from '../utils/audio';
import { HolidayTheme } from '../App';

type CompanionState = 'idle' | 'promoting_ad' | 'promoting_book' | 'moving';

interface SalesCompanionProps {
    holidayTheme?: HolidayTheme;
}

const SalesCompanion: React.FC<SalesCompanionProps> = ({ holidayTheme = 'normal' }) => {
    const { banners, books } = useContext(BookContext);
    const [isVisible, setIsVisible] = useState(true);
    const [position, setPosition] = useState({ x: 80, y: 70 });
    const [currentState, setCurrentState] = useState<CompanionState>('idle');
    const [message, setMessage] = useState('');
    const [activeItem, setActiveItem] = useState<any>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const holidayPhrases = {
        christmas: [
            "Ho Ho Ho... um livro é o melhor presente.",
            "Que tal uma história sob a neve?",
            "Meus circuitos estão em clima de festa!",
            "Adicione magia ao seu Natal.",
            "Presenteie alguém com um novo mundo."
        ],
        newyear: [
            "Novos capítulos, novos mundos. Próspero 2025!",
            "O que você vai ler este ano?",
            "Brindemos às futuras histórias!",
            "Ano Novo, biblioteca nova.",
            "Que a luz guie sua leitura este ano!"
        ],
        normal: [
            "Uma leitura obrigatória...",
            "Já desvendou este mistério?",
            "Cuidado, este vicia...",
            "Aprofunde-se nas sombras...",
            "Leitura perfeita para hoje."
        ]
    };

    const adPhrases = [
        "Encontrei algo útil!",
        "Uma oferta rara...",
        "Equipe-se para a jornada.",
        "Talvez lhe interesse?",
        "Olhe o que descobri!"
    ];

    useEffect(() => {
        if (!isVisible) return;
        const decisionInterval = setInterval(() => {
            if (isHovered) return;
            const randomChoice = Math.random();
            if (randomChoice < 0.3) {
                playRobotSound();
                changePosition();
                setCurrentState('moving');
                setMessage('');
                setActiveItem(null);
            } else if (randomChoice < 0.65 && banners.length > 0) {
                playRobotSound();
                const randomBanner = banners[Math.floor(Math.random() * banners.length)];
                setActiveItem(randomBanner);
                setCurrentState('promoting_ad');
                setMessage(adPhrases[Math.floor(Math.random() * adPhrases.length)]);
            } else if (books.length > 0) {
                playRobotSound();
                const randomBook = books[Math.floor(Math.random() * books.length)];
                setActiveItem(randomBook);
                setCurrentState('promoting_book');
                const phrases = holidayTheme === 'normal' ? holidayPhrases.normal : holidayPhrases[holidayTheme];
                setMessage(phrases[Math.floor(Math.random() * phrases.length)]);
            } else {
                changePosition();
                setCurrentState('idle');
            }
        }, 12000);
        return () => clearInterval(decisionInterval);
    }, [isVisible, banners, books, isHovered, holidayTheme]);

    const changePosition = () => {
        const newX = Math.floor(Math.random() * 75) + 5;
        const newY = Math.floor(Math.random() * 45) + 40;
        setPosition({ x: newX, y: newY });
    };

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        playRobotSound(); 
        setIsVisible(false);
        setTimeout(() => {
            setIsVisible(true);
            setCurrentState('moving'); 
            changePosition();
            playRobotSound(); 
        }, 120000);
    };

    if (!isVisible) return null;

    const linkUrl = currentState === 'promoting_ad' ? activeItem?.linkUrl : activeItem?.books2readUrl;
    const imageUrl = currentState === 'promoting_ad' ? activeItem?.imageUrl : activeItem?.coverUrl;

    return (
        <div 
            className="fixed z-[100] transition-all duration-[2000ms] ease-in-out pointer-events-none"
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
        >
            <div 
                className="relative pointer-events-auto group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <button 
                    onClick={handleDismiss}
                    className="absolute -top-5 -right-5 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center text-sm border-2 border-red-500 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-200 z-50 cursor-pointer shadow-[0_0_10px_rgba(220,38,38,0.5)] pointer-events-auto"
                    aria-label="Dispensar robô"
                >
                    ✕
                </button>

                {message && (
                    <div className={`absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-brand-dark px-4 py-2 rounded-xl rounded-bl-none shadow-lg whitespace-nowrap animate-fade-in border-2 ${holidayTheme === 'christmas' ? 'border-red-600' : holidayTheme === 'newyear' ? 'border-yellow-400' : 'border-brand-gold'} z-40 max-w-[200px] md:max-w-xs transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        <p className="text-xs md:text-sm font-bold font-serif">{message}</p>
                    </div>
                )}

                {activeItem && imageUrl && (
                    <a 
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-32 md:w-32 md:h-48 bg-slate-900/80 border-2 ${holidayTheme === 'christmas' ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : holidayTheme === 'newyear' ? 'border-yellow-400/50 shadow-[0_0_20px_rgba(252,211,77,0.4)]' : 'border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]'} rounded-lg overflow-hidden animate-slide-up origin-bottom cursor-pointer hover:scale-110 transition-transform block z-30`}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30"></div>
                        <div className={`absolute inset-0 ${holidayTheme === 'christmas' ? 'bg-red-400/10' : holidayTheme === 'newyear' ? 'bg-yellow-400/10' : 'bg-cyan-400/10'} animate-pulse z-10 pointer-events-none`}></div>
                        <img src={imageUrl} alt="Projeção" className="w-full h-full object-cover opacity-90" />
                        <div className={`absolute bottom-0 w-full ${holidayTheme === 'christmas' ? 'bg-red-900/90' : holidayTheme === 'newyear' ? 'bg-yellow-900/90' : 'bg-cyan-900/90'} text-white text-[9px] text-center py-1 font-mono uppercase tracking-widest border-t border-white/20 z-20`}>
                            {currentState === 'promoting_ad' ? 'Oferta' : 'Livro'}
                        </div>
                    </a>
                )}

                <div 
                    className="w-16 h-16 md:w-20 md:h-20 relative animate-float-slow cursor-pointer"
                    onClick={() => { playRobotSound(); }}
                >
                    <div className={`absolute inset-0 ${holidayTheme === 'christmas' ? 'bg-red-500/20' : holidayTheme === 'newyear' ? 'bg-yellow-500/20' : 'bg-brand-gold/20'} blur-xl rounded-full group-hover:bg-cyan-400/30 transition-colors duration-500`}></div>
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl filter brightness-110">
                        <defs>
                            <radialGradient id="metalGrad" cx="30%" cy="30%" r="70%">
                                <stop offset="0%" stopColor={holidayTheme === 'christmas' ? '#ef4444' : holidayTheme === 'newyear' ? '#fcd34d' : '#fbbf24'} />
                                <stop offset="100%" stopColor="#78350f" />
                            </radialGradient>
                            <radialGradient id="eyeEnergy" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={holidayTheme === 'christmas' ? '#fff' : holidayTheme === 'newyear' ? '#fff' : '#22d3ee'} stopOpacity="1" />
                                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.5" />
                            </radialGradient>
                        </defs>
                        <g className="origin-center animate-spin-slow" style={{ animationDuration: '10s' }}>
                            <circle cx="50" cy="50" r="48" stroke="url(#metalGrad)" strokeWidth="1" fill="none" strokeDasharray="5,5" opacity="0.6" />
                        </g>
                        <circle cx="50" cy="50" r="30" fill="#1e293b" stroke="url(#metalGrad)" strokeWidth="2" />
                        <circle cx="50" cy="50" r="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                        <circle cx="50" cy="50" r="8" fill="url(#eyeEnergy)" className="animate-pulse" />
                        <path d="M20 50 L38 50" stroke={holidayTheme === 'christmas' ? '#ef4444' : '#fbbf24'} strokeWidth="1" />
                        <path d="M62 50 L80 50" stroke={holidayTheme === 'christmas' ? '#ef4444' : '#fbbf24'} strokeWidth="1" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SalesCompanion;
