
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
                                <a href={book.amazonUrl} target="_blank" rel="noopener" className="relative group overflow-hidden bg-gradient-to-r from-brand-gold to-yellow-500 text-brand-dark font-bold py-4 px-8 rounded-full shadow-lg shadow-brand-gold/20 transform hover:-translate-y-1 transition-all duration-300">
                                    <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left"></div>
                                    <span className="relative flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.42 16.03c.3-.39.46-.86.46-1.37 0-1.16-.93-2.1-2.1-2.1-.51 0-.98.16-1.37.46-.39.3-.55.77-.55 1.28 0 1.16.93 2.1 2.1 2.1.51 0 .98-.16 1.37-.46zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.93c-1.63 0-3.09-.79-4-2.02V18H5v-7h2.36l-1.02 2.62c.76 1.15 2.05 1.91 3.51 1.91 2.37 0 4.29-1.92 4.29-4.29 0-2.37-1.92-4.29-4.29-4.29-2.37 0-4.29 1.92-4.29 4.29 0 .52.09 1.02.26 1.48l-1.87.81c-.26-.71-.4-1.48-.4-2.29 0-3.48 2.82-6.29 6.29-6.29 3.48 0 6.29 2.82 6.29 6.29 0 3.48-2.82 6.29-6.29 6.29z" /></svg>
                                        COMPRAR NA AMAZON
                                    </span>
                                </a>
                            )}
                            {book.amazonEbookUrl && (
                                <a href={book.amazonEbookUrl} target="_blank" rel="noopener" className="bg-slate-800 text-white font-bold py-4 px-6 rounded-full hover:bg-slate-700 transition-all border border-brand-gold/30 flex items-center gap-2 hover:shadow-lg hover:shadow-brand-gold/10">
                                    <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    Ler no Kindle
                                </a>
                            )}
                            {book.draftBookUrl && (
                                <a href={book.draftBookUrl} target="_blank" rel="noopener" className="bg-transparent border border-white/20 text-white py-4 px-6 rounded-full hover:bg-white/10 transition-all text-sm font-semibold">
                                    Draft2Digital
                                </a>
                            )}
                            <a href={book.books2readUrl} target="_blank" rel="noopener" className="bg-transparent border border-white/10 text-gray-400 py-4 px-6 rounded-full hover:text-white transition-all text-sm">
                                Outras Lojas
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
