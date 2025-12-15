import React, { useContext, useState } from 'react';
import { BookContext } from '../context/BookContext';

const MobileAdBanner: React.FC = () => {
    const { banners } = useContext(BookContext);
    const [isVisible, setIsVisible] = useState(true);

    // Se não houver banners ou o usuário fechou, não renderiza nada
    // xl:hidden garante que só apareça em telas menores que o desktop extra large (onde as sidebars aparecem)
    if (!isVisible || banners.length === 0) return null;

    return (
        <div className="xl:hidden fixed bottom-0 left-0 w-full z-40 bg-slate-900/95 backdrop-blur-md border-t border-brand-gold/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] animate-slide-up pb-safe">
            
            {/* Botão Fechar */}
            <button
                onClick={() => setIsVisible(false)}
                className="absolute -top-4 right-4 bg-brand-gold text-brand-dark rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg border-2 border-slate-900 hover:scale-110 transition-transform z-50"
                aria-label="Fechar publicidade"
            >
                ✕
            </button>

            <div className="p-4">
                <p className="text-[10px] text-brand-gold uppercase tracking-widest mb-2 font-bold">Parceiros</p>
                
                {/* Container de Scroll Horizontal */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent snap-x">
                    {banners.map(banner => (
                        <a 
                            key={banner.id} 
                            href={banner.linkUrl} 
                            target="_blank" 
                            rel="noopener noreferrer sponsored"
                            className="flex-shrink-0 relative group rounded-lg overflow-hidden border border-white/10 bg-slate-800/50 h-24 w-auto aspect-[3/2] snap-center shadow-md"
                        >
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            <img 
                                src={banner.imageUrl} 
                                alt="Parceiro" 
                                className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileAdBanner;