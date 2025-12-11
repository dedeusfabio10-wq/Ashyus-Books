import React, { useState, useEffect } from 'react';

// Tipos de eventos possíveis
type EventType = 'witch' | 'goblin_peek' | 'arrow' | 'wyvern' | 'wisp' | null;

// Configuração dos intervalos (em milissegundos)
const MIN_INTERVAL = 15000; // Mínimo 15 segundos entre eventos
const MAX_INTERVAL = 45000; // Máximo 45 segundos

const AtmosphericEvents: React.FC = () => {
    const [activeEvent, setActiveEvent] = useState<EventType>(null);
    const [eventKey, setEventKey] = useState(0); // Usado para reiniciar animações CSS

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const scheduleNextEvent = () => {
            const delay = Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
            
            timeout = setTimeout(() => {
                triggerRandomEvent();
            }, delay);
        };

        const triggerRandomEvent = () => {
            const events: EventType[] = ['witch', 'goblin_peek', 'arrow', 'wyvern', 'wisp'];
            // Pesos para probabilidade (arrow é mais comum que wyvern, etc)
            const weightedEvents = [
                'arrow', 'arrow', 
                'goblin_peek', 'goblin_peek',
                'wisp', 'wisp', 'wisp',
                'witch',
                'wyvern'
            ];
            
            const randomEvent = weightedEvents[Math.floor(Math.random() * weightedEvents.length)] as EventType;
            
            setActiveEvent(randomEvent);
            setEventKey(prev => prev + 1);

            // Limpa o evento após um tempo estimado de duração da animação para economizar recursos
            // O tempo deve ser maior que a maior animação CSS (20s)
            setTimeout(() => {
                setActiveEvent(null);
                scheduleNextEvent(); // Agenda o próximo após este terminar
            }, 20000); 
        };

        scheduleNextEvent();

        return () => clearTimeout(timeout);
    }, []);

    if (!activeEvent) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
            {/* --- BRUXA --- */}
            {activeEvent === 'witch' && (
                <div key={`witch-${eventKey}`} className="absolute top-1/4 left-0 animate-fly-diagonal opacity-0">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="text-black/40 fill-current drop-shadow-lg">
                         <path d="M10,80 L90,20" stroke="currentColor" strokeWidth="2" /> {/* Vassoura */}
                         <path d="M40,50 L50,10 L60,50 Z" /> {/* Chapéu */}
                         <circle cx="50" cy="50" r="10" /> {/* Cabeça */}
                         <path d="M40,50 Q20,60 30,80 L70,50" /> {/* Capa voando */}
                    </svg>
                </div>
            )}

            {/* --- WYVERN (Dragão) --- */}
            {activeEvent === 'wyvern' && (
                <div key={`wyvern-${eventKey}`} className="absolute top-10 left-0 w-64 h-64 animate-fly-straight opacity-0">
                    <svg viewBox="0 0 200 100" className="text-black/30 fill-current">
                        {/* Asas e Corpo simplificado */}
                        <path d="M100,50 Q150,10 190,40 L160,60 Q120,40 100,50 Q80,40 40,60 L10,40 Q50,10 100,50 Z" />
                        <circle cx="100" cy="50" r="5" className="fill-brand-gold/50" /> {/* Olho brilhante sutil */}
                    </svg>
                </div>
            )}

            {/* --- GOBLIN ESPIÃO --- */}
            {activeEvent === 'goblin_peek' && (
                <div key={`goblin-${eventKey}`} className="absolute bottom-0 right-10 md:right-32 animate-peek-up opacity-0">
                    <svg width="120" height="100" viewBox="0 0 120 100" className="text-black/80 fill-current drop-shadow-2xl">
                        {/* Cabeça e Orelhas pontudas */}
                        <path d="M30,100 L30,60 Q30,30 60,30 Q90,30 90,60 L90,100 Z" />
                        <path d="M30,60 L10,40 L30,50" /> {/* Orelha Esq */}
                        <path d="M90,60 L110,40 L90,50" /> {/* Orelha Dir */}
                        <circle cx="45" cy="55" r="4" className="fill-brand-gold animate-pulse" /> {/* Olho Esq */}
                        <circle cx="75" cy="55" r="4" className="fill-brand-gold animate-pulse" /> {/* Olho Dir */}
                    </svg>
                </div>
            )}

            {/* --- FLECHA ESPECTRAL --- */}
            {activeEvent === 'arrow' && (
                <div key={`arrow-${eventKey}`} className="absolute top-1/2 left-0 w-full animate-arrow-shot opacity-0" style={{ top: `${Math.random() * 80 + 10}%` }}>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-white shadow-[0_0_15px_rgba(251,191,36,0.8)] rounded-full relative">
                        {/* Ponta */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[10px] border-l-white"></div>
                    </div>
                </div>
            )}

            {/* --- WISP (Fada/Luz) --- */}
            {activeEvent === 'wisp' && (
                <div 
                    key={`wisp-${eventKey}`} 
                    className="absolute animate-float-random opacity-0" 
                    style={{ 
                        top: `${Math.random() * 70 + 15}%`, 
                        left: `${Math.random() * 80 + 10}%`,
                        animationDuration: '8s'
                    }}
                >
                    <div className="w-4 h-4 bg-cyan-400 rounded-full blur-[6px] animate-pulse opacity-60 shadow-[0_0_20px_rgba(34,211,238,0.8)]"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-white rounded-full blur-[2px] opacity-80"></div>
                </div>
            )}
        </div>
    );
};

export default AtmosphericEvents;