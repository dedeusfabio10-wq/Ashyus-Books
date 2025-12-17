import React, { useState, useEffect } from 'react';
import { playDragonRoar, playFireSound } from '../utils/audio';

type EventType = 'witch' | 'goblin_peek' | 'arrow' | 'wyvern' | 'wisp' | null;
type DragonStage = 'idle' | 'flying' | 'perched' | 'fire' | 'attack';

const AtmosphericEvents: React.FC = () => {
    // Eventos menores (fundo)
    const [activeAtmosphere, setActiveAtmosphere] = useState<EventType>(null);
    const [atmosphereKey, setAtmosphereKey] = useState(0);

    // Dragão Principal
    const [dragonStage, setDragonStage] = useState<DragonStage>('idle');

    // --- AGENDAMENTO DO DRAGÃO ---
    useEffect(() => {
        const triggerDragonSequence = () => {
            if (dragonStage === 'idle') {
                setDragonStage('flying');
                playDragonRoar(); 
            }
        };

        // Configurado para disparar a cada 2 minutos (120.000ms)
        // O timer inicial de teste foi removido para respeitar o intervalo solicitado.
        const intervalTimer = setInterval(triggerDragonSequence, 120000);

        return () => {
            clearInterval(intervalTimer);
        };
    }, [dragonStage]);

    // --- SEQUÊNCIA DE ANIMAÇÃO DO DRAGÃO ---
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (dragonStage === 'flying') {
            // Tempo de voo (animation-fly-path dura 4s)
            timer = setTimeout(() => {
                setDragonStage('perched');
            }, 3900); 
        } 
        else if (dragonStage === 'perched') {
            // Espera 10 segundos pousado (solicitado pelo usuário)
            timer = setTimeout(() => {
                setDragonStage('fire');
                playFireSound();
            }, 10000);
        }
        else if (dragonStage === 'fire') {
            // Cospe fogo por 3 segundos
            timer = setTimeout(() => {
                setDragonStage('attack');
                playDragonRoar();
            }, 3000);
        }
        else if (dragonStage === 'attack') {
            // Ataque rápido (zoom in) e reset
            timer = setTimeout(() => {
                setDragonStage('idle');
            }, 1000);
        }

        return () => clearTimeout(timer);
    }, [dragonStage]);

    // --- EVENTOS MENORES ---
    // (Apenas se o dragão não estiver ativo)
    useEffect(() => {
        if (dragonStage !== 'idle') return;

        const scheduleNext = () => {
            const delay = Math.floor(Math.random() * 30000) + 30000; 
            return setTimeout(triggerAtmosphere, delay);
        };

        const triggerAtmosphere = () => {
             if (dragonStage !== 'idle') {
                scheduleNext();
                return;
             }
             const events: EventType[] = ['witch', 'arrow', 'wisp'];
             const selected = events[Math.floor(Math.random() * events.length)];
             setActiveAtmosphere(selected);
             setAtmosphereKey(p => p + 1);
             
             setTimeout(() => {
                 setActiveAtmosphere(null);
                 scheduleNext();
             }, 8000);
        };

        const t = scheduleNext();
        return () => clearTimeout(t);
    }, [dragonStage]);

    return (
        <div className={`pointer-events-none fixed inset-0 z-[60] overflow-hidden ${dragonStage === 'attack' ? 'animate-screen-shake' : ''}`}>
            
            {/* --- DRAGÃO MASCOTE --- */}
            {dragonStage !== 'idle' && (
                <div 
                    className={`absolute transition-all duration-300 ease-in-out
                        ${dragonStage === 'flying' ? 'animate-fly-path' : ''}
                        ${dragonStage === 'perched' || dragonStage === 'fire' ? 'top-[10px] left-[10px] md:top-[15px] md:left-[20px] scale-100' : ''}
                        ${dragonStage === 'attack' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-claw-strike' : ''}
                    `}
                    style={{
                        // Garante que o dragão fique no topo durante o voo e pouso
                        zIndex: 100,
                        width: '120px', // Tamanho similar ao robô
                        height: '120px'
                    }}
                >
                    {/* SVG Do Dragão (Estilo Mascote Dark) */}
                    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                        <defs>
                            <radialGradient id="dragonEye" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#d97706" />
                            </radialGradient>
                            <linearGradient id="wingDark" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#334155" />
                                <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>
                            <linearGradient id="fireBreath" x1="0%" y1="0%" x2="100%" y2="50%">
                                <stop offset="0%" stopColor="#fef08a" /> {/* Amarelo claro */}
                                <stop offset="40%" stopColor="#fbbf24" /> {/* Ouro */}
                                <stop offset="80%" stopColor="#ef4444" /> {/* Vermelho */}
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        {/* GRUPO: Asas (Animadas quando voando ou atacando) */}
                        <g className={`${dragonStage === 'flying' || dragonStage === 'attack' ? 'animate-dragon-flap origin-[100px_100px]' : ''}`}>
                            {/* Asa Direita (Trás) */}
                            <path d="M120,80 Q160,20 190,60 L180,100 Q150,80 120,90" fill="url(#wingDark)" stroke="#0f172a" strokeWidth="1" />
                            {/* Asa Esquerda (Frente) */}
                            <path d="M80,80 Q40,20 10,60 L20,100 Q50,80 80,90" fill="url(#wingDark)" stroke="#fbbf24" strokeWidth="1" />
                        </g>

                        {/* Corpo (Pousado/Estático) */}
                        <path 
                            d="M80,100 Q70,140 100,160 Q130,140 120,100" 
                            fill="#0f172a" stroke="#fbbf24" strokeWidth="2" 
                        />
                        
                        {/* Cauda (Enrolada) */}
                        <path d="M100,160 Q100,190 120,180 Q140,170 130,150" fill="none" stroke="#0f172a" strokeWidth="4" />

                        {/* Cabeça */}
                        <g transform="translate(0, -10)">
                            <path d="M85,80 Q100,60 115,80 L110,110 Q100,120 90,110 Z" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                            {/* Olhos Brilhantes */}
                            <circle cx="93" cy="90" r="3" fill="url(#dragonEye)" className="animate-pulse" />
                            <circle cx="107" cy="90" r="3" fill="url(#dragonEye)" className="animate-pulse" />
                            
                            {/* Boca (Abre ao cuspir fogo) */}
                            {dragonStage === 'fire' || dragonStage === 'attack' ? (
                                <path d="M95,110 Q100,125 105,110" fill="#000" />
                            ) : (
                                <path d="M95,110 L105,110" stroke="#000" strokeWidth="1" />
                            )}
                        </g>

                        {/* FOGO (Visível apenas no estágio 'fire' ou 'attack') */}
                        {(dragonStage === 'fire' || dragonStage === 'attack') && (
                            <path 
                                d="M100,120 Q120,150 200,200 L250,300 L150,250" 
                                fill="url(#fireBreath)" 
                                className="animate-fire-pulse" 
                                style={{ filter: 'blur(3px)', opacity: 0.8 }}
                            />
                        )}
                    </svg>
                </div>
            )}

            {/* --- EVENTOS DE FUNDO (Witch, Arrows, etc) --- */}
            {activeAtmosphere === 'witch' && (
                 <div key={`witch-${atmosphereKey}`} className="absolute top-1/4 left-0 animate-fly-diagonal opacity-0">
                    <svg width="60" height="60" viewBox="0 0 100 100" className="text-black/40 fill-current">
                         <path d="M10,80 L90,20 M40,50 L50,10 L60,50 Z" stroke="currentColor" strokeWidth="4" />
                    </svg>
                </div>
            )}
            {activeAtmosphere === 'arrow' && (
                <div key={`arrow-${atmosphereKey}`} className="absolute top-1/2 left-0 w-full animate-arrow-shot opacity-0" style={{ top: `${Math.random() * 80 + 10}%` }}>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-brand-gold/50 to-white"></div>
                </div>
            )}
            {activeAtmosphere === 'wisp' && (
                <div key={`wisp-${atmosphereKey}`} className="absolute animate-float-random opacity-0" style={{ top: '50%', left: '50%' }}>
                     <div className="w-2 h-2 bg-cyan-400 rounded-full blur-[4px]"></div>
                </div>
            )}

        </div>
    );
};

export default AtmosphericEvents;