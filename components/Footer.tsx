
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { HolidayTheme, Page } from '../App';

interface FooterProps {
    holidayTheme?: HolidayTheme;
    setCurrentPage?: (page: Page) => void;
}

const SocialIcon: React.FC<{ href: string; path: string; label: string }> = ({ href, path, label }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-white/10 text-gray-400 hover:text-brand-gold hover:border-brand-gold hover:bg-slate-700 transition-all duration-300 group"
    >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d={path} />
        </svg>
    </a>
);

const Footer: React.FC<FooterProps> = ({ holidayTheme = 'normal', setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
            setIsStandalone(true);
        }

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) deferredPrompt.prompt();
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setTimeout(() => {
            setSubscribed(true);
            setEmail('');
            setLoading(false);
            setTimeout(() => setSubscribed(false), 5000);
        }, 1000);
    };

    const navigateTo = (page: Page) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (setCurrentPage) setCurrentPage(page);
    };

    return (
        <footer className={`bg-[#020617] border-t mt-auto pt-16 pb-8 relative overflow-hidden transition-colors duration-500 ${holidayTheme === 'christmas' ? 'border-red-500/20' : holidayTheme === 'newyear' ? 'border-yellow-500/20' : 'border-white/5'}`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${holidayTheme === 'christmas' ? 'via-red-500/30' : holidayTheme === 'newyear' ? 'via-yellow-500/30' : 'via-brand-gold/30'} to-transparent`}></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <Logo holidayTheme={holidayTheme} className="w-12 h-12 text-brand-gold flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-white leading-tight">Crônicas da<br/>Fantasia</h2>
                                <p className={`${holidayTheme === 'christmas' ? 'text-red-500' : holidayTheme === 'newyear' ? 'text-yellow-500' : 'text-brand-gold'} text-xs uppercase tracking-widest mt-1`}>Ashyus Books</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-4">
                            Explorando os limites entre a luz e a escuridão. Um portal dedicado a histórias de fantasia, romance e mistério que desafiam a realidade.
                        </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-col items-start lg:items-center">
                        <h3 className={`${holidayTheme === 'christmas' ? 'text-red-500' : holidayTheme === 'newyear' ? 'text-yellow-500' : 'text-brand-gold'} font-bold uppercase tracking-widest text-xs mb-6`}>Conecte-se</h3>
                        <div className="flex gap-4 mb-8">
                            <SocialIcon label="Instagram" href="https://www.instagram.com/cronicasdafantasia" path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            <SocialIcon label="X (Twitter)" href="https://x.com/ashyusdark" path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </div>

                        {!isStandalone && deferredPrompt && (
                            <button 
                                onClick={handleInstall}
                                className="flex items-center gap-2 text-brand-gold hover:text-white transition-colors text-xs font-bold uppercase tracking-widest border border-brand-gold/30 px-4 py-2 rounded-lg bg-brand-gold/5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                Baixar Aplicativo
                            </button>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className={`${holidayTheme === 'christmas' ? 'text-red-500' : holidayTheme === 'newyear' ? 'text-yellow-500' : 'text-brand-gold'} font-bold uppercase tracking-widest text-xs mb-6`}>Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Receba capítulos exclusivos, contos gratuitos e novidades antes de todos.</p>
                        {subscribed ? (
                            <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-4 py-3 rounded text-sm animate-fade-in">
                                Obrigado por se inscrever! Verifique seu e-mail.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <input 
                                    type="email" 
                                    placeholder="Seu melhor e-mail" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-slate-800/50 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-brand-gold transition-all text-sm"
                                />
                                <button 
                                    type="submit" 
                                    className={`w-full ${holidayTheme === 'christmas' ? 'bg-red-600' : holidayTheme === 'newyear' ? 'bg-yellow-500' : 'bg-brand-gold'} text-brand-dark font-bold py-2.5 px-4 rounded hover:opacity-90 transition-all text-sm uppercase tracking-wide`}
                                >
                                    {loading ? "Enviando..." : "Inscrever-se"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Ashyus Books.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="/privacy" onClick={navigateTo('privacy')} className="hover:text-gray-400 transition-colors">Política de Privacidade</a>
                        <a href="/terms" onClick={navigateTo('terms')} className="hover:text-gray-400 transition-colors">Termos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
