
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const HomePage: React.FC = () => {
    const { books, loading, error, isInitialized } = useContext(BookContext);

    return (
        <div className="animate-fade-in space-y-24">
            {/* Hero SEO Optimized */}
            <section className="text-center max-w-4xl mx-auto px-4">
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Literatura de <span className="text-brand-gold">Dark Fantasy</span> no Brasil
                </h1>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
                    Bem-vindo ao portal oficial das <strong>Crônicas da Fantasia</strong>. Aqui você encontra as obras de <strong>Ashyus</strong>, focadas em mistério, romance sombrio e universos fantásticos inexplorados.
                </p>
                <div className="flex justify-center gap-4">
                    <div className="h-[1px] w-24 bg-brand-gold/30 self-center"></div>
                    <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold">Ashyus Books</span>
                    <div className="h-[1px] w-24 bg-brand-gold/30 self-center"></div>
                </div>
            </section>
            
            {/* Books Section */}
            <section aria-labelledby="latest-works">
                <header className="text-center mb-12">
                    <h2 id="latest-works" className="font-serif text-3xl text-white inline-block border-b-2 border-brand-gold/50 pb-2">
                        Obras Publicadas
                    </h2>
                </header>
                
                {loading && !isInitialized && <div className="py-20"><Loader message="Consultando os arquivos arcanos..." /></div>}
                
                {isInitialized && books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : isInitialized && (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 italic text-gray-500">
                        O autor está forjando novos mundos. Volte em breve.
                    </div>
                )}
            </section>

            {/* Authority Section (Crucial for AdSense EEAT) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-slate-900/50 p-8 md:p-16 rounded-[3rem] border border-white/5">
                <div className="space-y-6">
                    <h2 className="font-serif text-4xl font-bold text-white">A Filosofia Ashyus Books</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Diferente da fantasia convencional, o estilo <strong>Ashyus Books</strong> foca no realismo emocional dentro de cenários mágicos. Nossas histórias são pensadas para leitores que buscam profundidade psicológica, sistemas de magia com consequências reais e romances que desafiam o destino.
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        Cada livro das Crônicas da Fantasia passa por um processo rigoroso de worldbuilding, onde geografía, política e sistemas arcanos são desenvolvidos para oferecer uma experiência imersiva completa. O compromisso de Ashyus é com a originalidade e a qualidade narrativa, elevando a literatura independente nacional.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="text-brand-gold mt-1">✦</span>
                            <div>
                                <strong className="text-white">Narrativas Maduras:</strong> Abordamos temas complexos de forma elegante e instigante.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-brand-gold mt-1">✦</span>
                            <div>
                                <strong className="text-white">Acessibilidade:</strong> Obras disponíveis em múltiplos formatos e plataformas como o <strong>Kindle Unlimited</strong>.
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-brand-gold/20 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img 
                        src="https://picsum.photos/seed/writing_fantasy/800/600?grayscale" 
                        alt="Processo Criativo do Autor Ashyus" 
                        className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </section>

            {/* Nova Seção de Conteúdo Único (Blog-style snippet para AdSense) */}
            <section className="max-w-4xl mx-auto space-y-12">
                <h2 className="font-serif text-4xl text-center text-white">Explorando os Reinos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/20 p-8 rounded-2xl border border-white/5">
                        <h3 className="text-brand-gold font-serif text-xl mb-4">Sistemas de Magia Únicos</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Em nossas crônicas, a magia não é gratuita. Ela exige sacrifício, estudo e compreensão das leis fundamentais do universo. Desde a alquimia da memória até a forja das chamas eternas, cada sistema é único.
                        </p>
                    </div>
                    <div className="bg-slate-800/20 p-8 rounded-2xl border border-white/5">
                        <h3 className="text-brand-gold font-serif text-xl mb-4">Romance e Conflito</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            O amor nas sombras é testado pelo perigo. Ashyus escreve sobre conexões que transcendem o tempo e o espaço, onde o romance é a âncora em meio ao caos das guerras mágicas.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
