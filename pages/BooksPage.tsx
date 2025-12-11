
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import Loader from '../components/Loader';
import MarkdownRenderer from '../components/MarkdownRenderer';

const BooksPage: React.FC = () => {
    const { books, loading, error, isInitialized } = useContext(BookContext);

    return (
        <div className="animate-fade-in space-y-24">
            <header className="text-center relative py-8">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-900/20 rounded-full blur-3xl -z-10"></div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Biblioteca</h1>
                <p className="text-xl text-gray-400 font-light tracking-wide">Mergulhe em cada história.</p>
            </header>

            {loading && !isInitialized && <div className="text-center py-12"><Loader message="Catalogando a biblioteca..." /></div>}
            {error && <p className="text-center text-red-400">{error}</p>}
            
            {isInitialized && books.map((book, index) => (
                <section key={book.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-start animate-slide-up ${index > 0 ? 'pt-24 border-t border-white/5' : ''}`}>
                    <div className="lg:w-1/3 w-full sm:w-2/3 sm:mx-auto flex-shrink-0 relative group">
                        <div className="absolute inset-0 bg-brand-gold/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                        <img src={book.coverUrl} alt={`Capa de ${book.title}`} className="rounded-xl shadow-2xl shadow-black/50 w-full transform group-hover:scale-[1.02] transition-transform duration-500" />
                    </div>
                    <div className="lg:w-2/3 w-full">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-dark mb-6">{book.title}</h2>
                        <div className="prose prose-invert prose-lg text-gray-300 max-w-none mb-8 leading-relaxed">
                            <p className="whitespace-pre-wrap">{book.fullSynopsis}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mb-12">
                            {book.amazonUrl && (
                                <a 
                                    href={book.amazonUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-full hover:bg-brand-gold-dark transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-brand-gold/20"
                                >
                                    Comprar na Amazon
                                </a>
                            )}
                            <a 
                                href={book.books2readUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`inline-block font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 ${book.amazonUrl ? 'bg-transparent border border-white/20 text-white hover:bg-white/10' : 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-dark hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]'}`}
                            >
                                {book.amazonUrl ? 'Outras Lojas (Books2Read)' : 'Comprar Agora'}
                            </a>
                        </div>

                        <div className="mt-8 bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <h3 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                                Leia o Primeiro Capítulo
                            </h3>
                            <div className="max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
                                <div className="text-gray-400 leading-relaxed font-serif text-lg">
                                    <MarkdownRenderer text={book.firstChapterMarkdown} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default BooksPage;
