
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const HomePage: React.FC = () => {
    const { books, loading, error, isInitialized } = useContext(BookContext);

    return (
        <div className="animate-fade-in space-y-20">
            {/* Seção Hero Informativa */}
            <section className="text-center">
                <h2 className="font-serif text-4xl md:text-6xl font-bold text-brand-lighter mb-4 leading-tight">
                    Mundos forjados em Tinta e Sombra
                </h2>
                <p className="text-xl text-brand-gold font-medium mb-8">
                    Fantasia Sombria • Romance • Mistério • Young Adult
                </p>
                <div className="max-w-3xl mx-auto text-gray-400 leading-relaxed text-lg">
                    <p>
                        Seja bem-vindo ao portal oficial de <strong>Ashyus Books</strong>. Aqui, as palavras transcendem o papel para criar realidades onde o perigo espreita em cada esquina e o amor floresce em solos proibidos. Explore nossa biblioteca arcana e descubra as <strong>Crônicas da Fantasia</strong>.
                    </p>
                </div>
            </section>
            
            {/* Lista de Livros (Dinâmica) */}
            <section>
                <h3 className="font-serif text-3xl text-white mb-10 text-center border-b border-brand-gold/20 pb-4 inline-block mx-auto w-full max-w-xs md:max-w-md">Últimos Lançamentos</h3>
                
                {loading && !isInitialized && <div className="text-center py-10"><Loader message="Invocando os grimórios..." /></div>}
                
                {error && (
                    <div className="max-w-md mx-auto bg-red-900/10 border border-red-500/30 p-6 rounded-xl text-center mb-12">
                        <p className="text-red-400 font-serif text-lg mb-2">Erro na Biblioteca Arcana</p>
                        <p className="text-gray-400 text-sm mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="text-xs bg-red-500/20 text-red-300 px-4 py-2 rounded-full hover:bg-red-500/40 transition-all"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                )}
                
                {isInitialized && books.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                        {books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : isInitialized && (
                    <div className="text-center py-20 border border-white/5 rounded-2xl bg-white/5 italic text-gray-500">
                        A biblioteca está sendo organizada pelos escribas. Volte em breve!
                    </div>
                )}
            </section>

            {/* Seção de Texto Rico (Crucial para Aprovação AdSense) */}
            <section className="bg-slate-900/40 rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className="font-serif text-3xl md:text-4xl font-bold text-brand-gold">O Universo Ashyus</h3>
                        <p className="text-gray-300 leading-relaxed">
                            A literatura de Ashyus não é apenas entretenimento; é uma jornada para os recônditos da alma humana. Em cada livro, você encontrará temas de <strong>Dark Fantasy</strong> que desafiam os tropos clássicos. Nossas histórias focam na dualidade entre o bem e o mal, onde heróis são falhos e vilões possuem motivações compreensíveis.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Se você busca romances com química intensa, mistérios que te prendem até a última página e construções de mundo (worldbuilding) ricas em detalhes mitológicos, você está no lugar certo. Cada obra de <strong>Ashyus Books</strong> é revisada com rigor para entregar a melhor experiência literária aos nossos leitores brasileiros.
                        </p>
                        <ul className="space-y-3 text-brand-gold text-sm font-bold uppercase tracking-widest">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Narrativas Envolventes
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Personagens Multidimensionais
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
                                Plot Twists de Tirar o Fôlego
                            </li>
                        </ul>
                    </div>
                    <div className="relative">
                        <img 
                            src="https://picsum.photos/seed/library_fantasy/800/600?grayscale" 
                            alt="Biblioteca Antiga de Fantasia" 
                            className="rounded-2xl opacity-60 hover:opacity-100 transition-opacity duration-700 shadow-2xl border border-white/10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* Seção de Newsletter / Chamada para Ação */}
            <section className="text-center py-12 border-t border-white/5">
                <h4 className="font-serif text-2xl text-white mb-4">Mantenha-se Atualizado</h4>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                    Não perca os próximos lançamentos de Ashyus. Inscreva-se em nossa newsletter para receber capítulos antecipados, contos exclusivos e novidades sobre eventos literários em todo o Brasil.
                </p>
            </section>
        </div>
    );
};

export default HomePage;
