
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import Loader from '../components/Loader';
import MarkdownRenderer from '../components/MarkdownRenderer';

const BooksPage: React.FC = () => {
    const { books, loading, error, isInitialized } = useContext(BookContext);

    return (
        <div className="animate-fade-in space-y-24">
            <header className="text-center relative py-8">
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Biblioteca de Obras</h1>
                <p className="text-xl text-gray-400 font-light tracking-wide">Mergulhe em cada história do universo Ashyus.</p>
            </header>

            {loading && !isInitialized && <div className="text-center py-12"><Loader message="Consultando os grimórios..." /></div>}
            
            {isInitialized && books.map((book, index) => (
                <article key={book.id} className={`flex flex-col lg:flex-row gap-12 items-start animate-slide-up ${index > 0 ? 'pt-24 border-t border-white/5' : ''}`}>
                    <div className="lg:w-1/3 w-full sm:w-2/3 mx-auto flex-shrink-0">
                        <img src={book.coverUrl} alt={book.title} className="rounded-xl shadow-2xl w-full border border-white/10" />
                    </div>
                    <div className="lg:w-2/3 w-full">
                        <h2 className="font-serif text-4xl font-bold text-brand-gold mb-6">{book.title}</h2>
                        <div className="prose prose-invert max-w-none mb-8 text-gray-300">
                            <p className="whitespace-pre-wrap">{book.fullSynopsis}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 mb-10">
                            {book.amazonUrl && (
                                <a href={book.amazonUrl} target="_blank" rel="noopener" className="bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-full hover:bg-brand-gold-dark transition-all shadow-lg shadow-brand-gold/20">
                                    Amazon (Físico)
                                </a>
                            )}
                            {book.amazonEbookUrl && (
                                <a href={book.amazonEbookUrl} target="_blank" rel="noopener" className="bg-slate-700 text-white font-bold py-3 px-6 rounded-full hover:bg-slate-600 transition-all border border-brand-gold/30">
                                    eBook Kindle
                                </a>
                            )}
                            {book.draftBookUrl && (
                                <a href={book.draftBookUrl} target="_blank" rel="noopener" className="bg-transparent border border-white/20 text-white py-3 px-6 rounded-full hover:bg-white/10 transition-all">
                                    Livro na Draft
                                </a>
                            )}
                            <a href={book.books2readUrl} target="_blank" rel="noopener" className="bg-transparent border border-white/10 text-gray-400 py-3 px-6 rounded-full hover:text-white transition-all">
                                Outras Plataformas
                            </a>
                        </div>

                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                            <h3 className="font-serif text-2xl font-bold text-white mb-4">Degustação: Capítulo 1</h3>
                            <div className="max-h-80 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-brand-gold/20">
                                <article className="text-gray-400 font-serif text-lg leading-relaxed italic">
                                    <MarkdownRenderer text={book.firstChapterMarkdown} />
                                </article>
                            </div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default BooksPage;
