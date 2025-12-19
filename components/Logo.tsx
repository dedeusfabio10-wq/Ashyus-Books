
import React from 'react';

interface LogoProps {
    className?: string;
    holidayTheme?: 'christmas' | 'newyear' | 'normal';
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", holidayTheme = 'normal' }) => {
    return (
        <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`${className} transition-all duration-500 ${holidayTheme === 'newyear' ? 'drop-shadow-[0_0_15px_#fcd34d]' : ''}`}
        >
            {/* Brilho de fundo */}
            <circle 
                cx="50" cy="50" r="40" 
                className={`${holidayTheme === 'christmas' ? 'fill-red-500/10' : holidayTheme === 'newyear' ? 'fill-yellow-500/10' : 'fill-brand-gold/5'} blur-md`} 
            />

            {/* Capa do Livro */}
            <path 
                d="M20 75C20 75 35 82 50 78C65 82 80 75 80 75V45C80 45 65 52 50 48C35 52 20 45 20 45V75Z" 
                className={`${holidayTheme === 'christmas' ? 'fill-xmas-red' : holidayTheme === 'newyear' ? 'fill-ny-gold' : 'fill-current'} opacity-80`}
            />
            
            {/* Páginas */}
            <path d="M22 47C22 47 36 53 50 50V76C36 79 22 73 22 73V47Z" className="fill-white/20" />
            <path d="M78 47C78 47 64 53 50 50V76C64 79 78 73 78 73V47Z" className="fill-white/10" />

            {/* Chama Mágica */}
            <path 
                d="M50 50C50 50 60 35 50 15C40 35 50 50 50 50Z" 
                className={`${holidayTheme === 'newyear' ? 'fill-white' : 'fill-brand-gold'} drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]`}
            >
                <animate 
                    attributeName="d" 
                    values="M50 50C50 50 60 35 50 15C40 35 50 50 50 50Z; M50 50C50 50 55 30 50 10C45 30 50 50 50 50Z; M50 50C50 50 60 35 50 15C40 35 50 50 50 50Z" 
                    dur="3s" 
                    repeatCount="indefinite" 
                />
            </path>
            
            {/* Touca de Natal (Só no Natal) */}
            {holidayTheme === 'christmas' && (
                <g transform="translate(42, 5) scale(0.6)">
                    <path d="M0,20 Q10,0 25,20 L5,25 Z" fill="#ef4444" stroke="#fff" strokeWidth="1" />
                    <circle cx="2" cy="22" r="3" fill="#fff" />
                    <rect x="0" y="22" width="28" height="4" rx="2" fill="#fff" />
                </g>
            )}

            <path d="M50 45C50 45 54 35 50 25C46 35 50 45 50 45Z" className="fill-white/80" />
        </svg>
    );
};

export default Logo;
