
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

interface AdSidebarProps {
    side: 'left' | 'right';
}

const AdSidebar: React.FC<AdSidebarProps> = ({ side }) => {
    const { banners } = useContext(BookContext);

    // Filtra banners para este lado específico
    const sideBanners = banners.filter(b => b.position === side);

    // Se não houver banners para este lado, não renderiza nada
    if (sideBanners.length === 0) return null;

    // Duplicamos os banners para criar um loop perfeito na animação CSS
    // Isso garante que quando o primeiro conjunto sair da tela, o segundo já esteja visível
    const displayBanners = [...sideBanners, ...sideBanners]; 

    // Seleciona a animação correta baseada no lado
    // Conforme pedido: Esquerda (Cima para Baixo) -> Down | Direita (Baixo para Cima) -> Up
    const animationClass = side === 'left' ? 'animate-infinite-scroll-down' : 'animate-infinite-scroll-up';

    return (
        <aside className="hidden xl:flex w-[160px] 2xl:w-[200px] flex-shrink-0 pt-8 sticky top-24 h-[calc(100vh-8rem)] overflow-hidden">
             {/* O container interno contém os banners duplicados e aplica a animação */}
             <div className={`flex flex-col gap-6 w-full ${animationClass} hover:[animation-play-state:paused]`}>
                {displayBanners.map((banner, index) => (
                    <a 
                        key={`${banner.id}-${index}`} 
                        href={banner.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer sponsored"
                        className="block group relative overflow-hidden rounded-lg border border-white/5 bg-slate-800/20 hover:border-brand-gold/50 hover:bg-slate-800/50 transition-all duration-300 shadow-lg hover:shadow-brand-gold/10 flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img 
                            src={banner.imageUrl} 
                            alt="Publicidade" 
                            className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute bottom-0 w-full p-1 bg-black/80 text-[10px] text-center text-gray-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                            Parceiro
                        </div>
                    </a>
                ))}
            </div>
            
            {/* Gradientes para suavizar a entrada/saída nas bordas do container */}
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
        </aside>
    );
};

export default AdSidebar;
