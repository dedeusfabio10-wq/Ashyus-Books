import React, { useState, useEffect, useContext, useRef } from 'react';
import { BookContext } from '../context/BookContext';
import { playRobotSound } from '../utils/audio';

type CompanionState = 'idle' | 'promoting_ad' | 'promoting_book' | 'moving';

const SalesCompanion: React.FC = () => {
    const { banners, books } = useContext(BookContext);
    const [isVisible, setIsVisible] = useState(true);
    const [position, setPosition] = useState({ x: 85, y: 70 }); // Porcentagem da tela (left, top)
    const [currentState, setCurrentState] = useState<CompanionState>('idle');
    const [message, setMessage] = useState('');
    const [activeItem, setActiveItem] = useState<any>(null); // Pode ser Banner ou Book
    const [isHovered, setIsHovered] = useState(false);
    
    // Frases para livros
    const bookPhrases = [
        "Uma leitura obrigatória...",
        "Já desvendou este mistério?",
        "Cuidado, este vicia...",
        "Aprofunde-se nas sombras...",
        "Leitura perfeita para hoje."
    ];

    // Frases para produtos/banners
    const adPhrases = [
        "Encontrei algo útil!",
        "Uma oferta rara...",
        "Equipe-se para a jornada.",
        "Talvez lhe interesse?",
        "Olhe o que descobri!"
    ];

    // Movimentação e Ciclo de Vida
    useEffect(() => {
        if (!isVisible) return;

        // Ciclo de Decisão (A cada 12 segundos)
        const decisionInterval = setInterval(() => {
            if (isHovered) return; // Não muda se o usuário estiver interagindo

            const randomChoice = Math.random();
            
            // 30% chance de mover, 35% Ad, 35% Livro
            if (randomChoice < 0.3) {
                playRobotSound(); // Som ao mover
                changePosition();
                setCurrentState('moving');
                setMessage('');
                setActiveItem(null);
            } else if (randomChoice < 0.65 && banners.length > 0) {
                // Mostrar Anúncio
                playRobotSound(); // Som ao mostrar item
                const randomBanner = banners[Math.floor(Math.random() * banners.length)];
                setActiveItem(randomBanner);
                setCurrentState('promoting_ad');
                setMessage(adPhrases[Math.floor(Math.random() * adPhrases.length)]);
            } else if (books.length > 0) {
                // Mostrar Livro
                playRobotSound(); // Som ao mostrar item
                const randomBook = books[Math.floor(Math.random() * books.length)];
                setActiveItem(randomBook);
                setCurrentState('promoting_book');
                setMessage(bookPhrases[Math.floor(Math.random() * bookPhrases.length)]);
            } else {
                // Fallback se não tiver dados
                changePosition();
                setCurrentState('idle');
            }

        }, 12000);

        return () => clearInterval(decisionInterval);
    }, [isVisible, banners, books, isHovered]);

    const changePosition = () => {
        // Move para uma posição aleatória, mas mantendo nas bordas ou parte inferior para não atrapalhar a leitura
        // X: entre 5% e 90%
        // Y: entre 40% e 85% (evita header)
        const newX = Math.floor(Math.random() * 85) + 5;
        const newY = Math.floor(Math.random() * 45) + 40;
        setPosition({ x: newX, y: newY });
    };

    const handleDismiss = () => {
        playRobotSound(); // Som ao fechar
        setIsVisible(false);
        // Reaparece após 2 minutos (120000 ms)
        setTimeout(() => {
            setIsVisible(true);
            setCurrentState('moving'); // Volta se movendo para chamar atenção suavemente
            changePosition();
            playRobotSound(); // Som ao reaparecer
        }, 120000);
    };

    if (!isVisible) return null;

    // Determina o link e imagem baseada no item ativo
    const linkUrl = currentState === 'promoting_ad' ? activeItem?.linkUrl : activeItem?.books2readUrl;
    const imageUrl = currentState === 'promoting_ad' ? activeItem?.imageUrl : activeItem?.coverUrl;

    return (
        <div 
            className="fixed z-50 transition-all duration-[2000ms] ease-in-out pointer-events-none"
            style={{ 
                left: `${position.x}%`, 
                top: `${position.y}%`,
            }}
        >
            <div 
                className="relative pointer-events-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* --- BOTÃO FECHAR --- */}
                <button 
                    onClick={handleDismiss}
                    className="absolute -top-6 -right-6 w-8 h-8 bg-red-900 text-white rounded-full flex items-center justify-center text-sm border border-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 cursor-pointer shadow-lg hover:bg-red-700 pointer-events-auto"
                    title="Dispensar por 2 minutos"
                    aria-label="Dispensar robô"
                >
                    ✕
                </button>

                {/* --- BALÃO DE FALA --- */}
                {message && (
                    <div className={`absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-brand-dark px-4 py-2 rounded-xl rounded-bl-none shadow-lg whitespace-nowrap animate-fade-in border-2 border-brand-gold z-40 max-w-[200px] md:max-w-xs transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        <p className="text-xs md:text-sm font-bold font-serif">{message}</p>
                    </div>
                )}

                {/* --- HOLOGRAMA / PROJEÇÃO (Item) --- */}
                {activeItem && imageUrl && (
                    <a 
                        href={linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-32 md:w-32 md:h-48 bg-slate-900/80 border-2 border-cyan-400/50 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] overflow-hidden animate-slide-up origin-bottom cursor-pointer hover:scale-110 transition-transform block z-30"
                    >
                        {/* Scanlines Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30"></div>
                        <div className="absolute inset-0 bg-cyan-400/10 animate-pulse z-10 pointer-events-none"></div>
                        
                        <img src={imageUrl} alt="Projeção" className="w-full h-full object-cover opacity-90" />
                        
                        <div className="absolute bottom-0 w-full bg-cyan-900/90 text-cyan-100 text-[9px] text-center py-1 font-mono uppercase tracking-widest border-t border-cyan-500/50 z-20">
                            {currentState === 'promoting_ad' ? 'Oferta' : 'Livro'}
                        </div>
                    </a>
                )}

                {/* --- O ROBÔ (AUTÔMATO ARCANO) --- */}
                <div className="w-16 h-16 md:w-20 md:h-20 relative animate-float-slow cursor-pointer group">
                    {/* Aura Mágica */}
                    <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-full group-hover:bg-cyan-400/30 transition-colors duration-500"></div>

                    {/* Corpo (SVG) */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl filter brightness-110">
                        <defs>
                            <radialGradient id="metalGrad" cx="30%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#fbbf24" /> {/* Ouro */}
                                <stop offset="100%" stopColor="#78350f" /> {/* Bronze Escuro */}
                            </radialGradient>
                            <radialGradient id="eyeEnergy" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" /> {/* Ciano Brilhante */}
                                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.5" />
                            </radialGradient>
                        </defs>

                        {/* Anéis Giratórios Externos */}
                        <g className="origin-center animate-spin-slow" style={{ animationDuration: '10s' }}>
                            <circle cx="50" cy="50" r="48" stroke="url(#metalGrad)" strokeWidth="1" fill="none" strokeDasharray="5,5" opacity="0.6" />
                        </g>
                        <g className="origin-center animate-spin-slow" style={{ animationDuration: '7s', animationDirection: 'reverse' }}>
                            <circle cx="50" cy="50" r="42" stroke="url(#metalGrad)" strokeWidth="2" fill="none" strokeDasharray="15,10" />
                        </g>

                        {/* Corpo Central */}
                        <circle cx="50" cy="50" r="30" fill="#1e293b" stroke="url(#metalGrad)" strokeWidth="2" />

                        {/* Olho (Lente) */}
                        <circle cx="50" cy="50" r="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                        
                        {/* Brilho do Olho */}
                        <circle cx="50" cy="50" r="8" fill="url(#eyeEnergy)" className="animate-pulse">
                            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                        </circle>

                        {/* Detalhes Mecânicos (Linhas) */}
                        <path d="M20 50 L38 50" stroke="#fbbf24" strokeWidth="1" />
                        <path d="M62 50 L80 50" stroke="#fbbf24" strokeWidth="1" />
                        <path d="M50 20 L50 38" stroke="#fbbf24" strokeWidth="1" />
                        <path d="M50 62 L50 80" stroke="#fbbf24" strokeWidth="1" />

                        {/* Asas pequenas ou Propulsores */}
                        <path d="M10 40 Q5 50 10 60 L20 50 Z" fill="#78350f" className="animate-breathe origin-right" />
                        <path d="M90 40 Q95 50 90 60 L80 50 Z" fill="#78350f" className="animate-breathe origin-left" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SalesCompanion;