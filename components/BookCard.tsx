
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <article className="group bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-xl hover:shadow-brand-gold/20 hover:border-brand-gold/40 transform hover:-translate-y-2 transition-all duration-500 flex flex-col h-full" aria-label={`Livro: ${book.title}`}>
            <div className="relative overflow-hidden aspect-[2/3]">
                <img 
                    src={book.coverUrl} 
                    alt={`Capa oficial do livro ${book.title} de Ashyus Books`} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-serif text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-gold transition-colors">
                    {book.title}
                </h3>
                <p className="text-gray-400 text-xs mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {book.shortSynopsis}
                </p>
                
                <div className="mt-auto space-y-3">
                    {book.amazonEbookUrl ? (
                        <a href={book.amazonEbookUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-brand-gold text-brand-dark font-bold py-2.5 rounded-lg text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg" aria-label={`Comprar eBook ${book.title} na Amazon`}>
                            Ler no Kindle
                        </a>
                    ) : book.amazonUrl && (
                        <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-brand-gold text-brand-dark font-bold py-2.5 rounded-lg text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg">
                            Ver na Amazon
                        </a>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                        <a href={book.books2readUrl} target="_blank" rel="noopener noreferrer" className="text-center border border-white/10 text-gray-400 py-2 rounded-lg text-[10px] uppercase hover:text-white hover:border-white transition-all">
                            Mais Lojas
                        </a>
                        <span className="text-center border border-white/5 bg-white/5 text-[9px] text-gray-500 flex items-center justify-center rounded-lg uppercase">
                            Ashyus
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BookCard;
