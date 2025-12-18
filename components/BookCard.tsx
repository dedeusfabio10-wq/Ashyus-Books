
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <article className="group bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-xl shadow-black/20 hover:shadow-brand-gold/10 hover:border-brand-gold/30 transform hover:-translate-y-2 transition-all duration-500 flex flex-col animate-fade-in h-full">
            <div className="relative overflow-hidden aspect-[2/3]">
                <img 
                    src={book.coverUrl} 
                    alt={`Capa do livro: ${book.title}`} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-bold text-brand-lighter mb-2 line-clamp-1 group-hover:text-brand-gold transition-colors">
                    {book.title}
                </h3>
                <p className="text-gray-400 text-xs mb-4 flex-grow line-clamp-3 leading-relaxed">
                    {book.shortSynopsis}
                </p>
                
                <div className="mt-auto space-y-2">
                    {/* Botão Principal: Prioridade para Amazon Ebook ou Físico */}
                    {book.amazonEbookUrl ? (
                        <a href={book.amazonEbookUrl} target="_blank" rel="noopener" className="block w-full text-center bg-brand-gold text-brand-dark font-bold py-2 rounded-lg text-[10px] uppercase tracking-widest hover:bg-brand-gold-dark transition-all">
                            eBook Kindle
                        </a>
                    ) : book.amazonUrl && (
                        <a href={book.amazonUrl} target="_blank" rel="noopener" className="block w-full text-center bg-brand-gold text-brand-dark font-bold py-2 rounded-lg text-[10px] uppercase tracking-widest hover:bg-brand-gold-dark transition-all">
                            Livro na Amazon
                        </a>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                        {book.draftBookUrl && (
                            <a href={book.draftBookUrl} target="_blank" rel="noopener" className="text-center border border-white/10 text-gray-400 py-1.5 rounded-md text-[9px] uppercase hover:text-white hover:border-white transition-all">
                                Draft
                            </a>
                        )}
                        <a href={book.books2readUrl} target="_blank" rel="noopener" className="text-center border border-white/10 text-gray-400 py-1.5 rounded-md text-[9px] uppercase hover:text-white hover:border-white transition-all">
                            Mais Lojas
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BookCard;
