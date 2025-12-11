
import React, { useState } from 'react';
import Logo from './Logo';

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

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!email) return;

        setLoading(true);

        // Acesso corrigido para Vite
        const apiKey = (import.meta as any).env.VITE_WEB3FORMS_ACCESS_KEY;
        
        if (!apiKey) {
            console.warn("VITE_WEB3FORMS_ACCESS_KEY não definida.");
            setTimeout(() => {
                setSubscribed(true);
                setEmail('');
                setLoading(false);
                setTimeout(() => setSubscribed(false), 5000);
            }, 1000);
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: apiKey,
                    email: email,
                    subject: "Nova inscrição - Ashyus Books",
                    from_name: "Ashyus Books Site"
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubscribed(true);
                setEmail('');
                setTimeout(() => setSubscribed(false), 5000);
            } else {
                setError("Erro ao inscrever. Tente novamente.");
            }
        } catch (err) {
            setError("Erro de conexão.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-[#020617] border-t border-white/5 mt-auto pt-16 pb-8 relative overflow-hidden">
            {/* Efeito de fundo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
                    
                    {/* Coluna 1: Marca e Bio Curta */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <Logo className="w-12 h-12 text-brand-gold flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-white leading-tight">Crônicas da<br/>Fantasia</h2>
                                <p className="text-brand-gold text-xs uppercase tracking-widest mt-1">Ashyus Books</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-4">
                            Explorando os limites entre a luz e a escuridão. Um portal dedicado a histórias de fantasia, romance e mistério que desafiam a realidade.
                        </p>
                    </div>

                    {/* Coluna 2: Links Rápidos (Redes Sociais) */}
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-center">
                        <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6">Conecte-se</h3>
                        <div className="flex gap-4">
                            {/* Instagram */}
                            <SocialIcon 
                                label="Instagram"
                                href="https://instagram.com" 
                                path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            
                            {/* Twitter / X */}
                            <SocialIcon 
                                label="X (Twitter)"
                                href="https://twitter.com" 
                                path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />

                            {/* Wattpad (Livro Icon genérico) */}
                            <SocialIcon 
                                label="Wattpad"
                                href="https://wattpad.com" 
                                path="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                                
                            {/* Amazon */}
                            <SocialIcon 
                                label="Amazon"
                                href="https://amazon.com" 
                                path="M15.54 13.52c-.75-.48-1.54-.7-2.31-.7-.88 0-1.63.26-2.26.74-.6.46-.87 1.1-.87 1.83 0 .73.28 1.35.83 1.8.54.44 1.25.68 2.06.68.75 0 1.5-.2 2.2-.6.76-.44 1.13-1.08 1.13-1.92 0-.8-.26-1.42-.78-1.83zm-3.1 7.27c-1.34 0-2.52-.4-3.5-1.15-1.02-.78-1.55-1.84-1.55-3.1 0-1.3.56-2.4 1.63-3.22 1.05-.8 2.37-1.2 3.87-1.2 1.34 0 2.56.32 3.56.9.15-1.15-.12-1.97-.8-2.43-.65-.43-1.5-.64-2.5-.64-1.32 0-2.44.33-3.23.96l-.76-1.46c.55-.42 1.18-.73 1.86-.93.68-.2 1.45-.3 2.27-.3 1.65 0 2.97.4 3.9 1.18.96.8 1.46 2.07 1.46 3.73v5.82h-2.14v-1.16c-.9.84-2.07 1.27-3.46 1.27zM2.8 22c5.8 2 12.3 2 18.2-.3l.7.9c-2.3 1-4.7 1.4-7.2 1.4-4.2 0-8.2-1.1-11.7-3.5v1.5z" />
                        </div>
                    </div>

                    {/* Coluna 3: Newsletter */}
                    <div className="lg:col-span-4">
                        <h3 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Receba capítulos exclusivos, contos gratuitos e novidades antes de todos.</p>
                        
                        {subscribed ? (
                            <div className="bg-green-900/30 border border-green-500/30 text-green-400 px-4 py-3 rounded text-sm animate-fade-in">
                                Obrigado por se inscrever! Verifique seu e-mail.
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        placeholder="Seu melhor e-mail" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full bg-slate-800/50 border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all text-sm placeholder-gray-600 disabled:opacity-50"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-brand-gold text-brand-dark font-bold py-2.5 px-4 rounded hover:bg-brand-gold-dark transition-all duration-300 text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Enviando..." : "Inscrever-se"}
                                </button>
                                {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
                            </form>
                        )}
                        <p className="text-xs text-gray-600 mt-3">Sem spam. Apenas magia e caos.</p>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Ashyus Books. Todos os direitos reservados.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-400 transition-colors">Política de Privacidade</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Termos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
