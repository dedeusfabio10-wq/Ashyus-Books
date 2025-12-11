
import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
    return (
        <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={className}
        >
            {/* Brilho de fundo (opcional, depende do CSS pai, mas ajuda na legibilidade) */}
            <circle cx="50" cy="50" r="40" className="fill-brand-gold/5 blur-md" />

            {/* Capa do Livro / Base */}
            <path 
                d="M20 75C20 75 35 82 50 78C65 82 80 75 80 75V45C80 45 65 52 50 48C35 52 20 45 20 45V75Z" 
                className="fill-current opacity-80"
            />
            
            {/* Páginas do Livro */}
            <path 
                d="M22 47C22 47 36 53 50 50V76C36 79 22 73 22 73V47Z" 
                className="fill-white/20"
            />
            <path 
                d="M78 47C78 47 64 53 50 50V76C64 79 78 73 78 73V47Z" 
                className="fill-white/10"
            />

            {/* Chama Mágica / Pena (Símbolo do Autor) */}
            <path 
                d="M50 50C50 50 60 35 50 15C40 35 50 50 50 50Z" 
                className="fill-brand-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            >
                <animate 
                    attributeName="d" 
                    values="M50 50C50 50 60 35 50 15C40 35 50 50 50 50Z; M50 50C50 50 55 30 50 10C45 30 50 50 50 50Z; M50 50C50 50 60 35 50 15C40 35 50 50 50 50Z" 
                    dur="3s" 
                    repeatCount="indefinite" 
                />
            </path>
            
            {/* Detalhe da chama interna */}
            <path 
                d="M50 45C50 45 54 35 50 25C46 35 50 45 50 45Z" 
                className="fill-white/80"
            />
        </svg>
    );
};

export default Logo;
