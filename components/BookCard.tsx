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
                    alt={`Capa do livro de fantasia sombria: ${book.title} por Ashyus`} 
                    loading="lazy"
                    width="400"
                    height="600"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-6 flex flex-col flex-grow relative">
                <h3 className="font-serif text-2xl font-bold text-brand-lighter mb-2 leading-tight group-hover:text-brand-gold transition-colors">
                    {book.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-4">
                    {book.shortSynopsis}
                </p>
                
                <div className="mt-auto space-y-2">
                    {book.amazonUrl && (
                        <a 
                            href={book.amazonUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-brand-gold-dark transition-all duration-300 uppercase text-xs tracking-wider"
                            aria-label={`Comprar ${book.title} na Amazon`}
                        >
                            Comprar na Amazon
                        </a>
                    )}
                    <a 
                        href={book.books2readUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block w-full text-center border font-bold py-2 px-4 rounded-lg transition-all duration-300 uppercase text-xs tracking-wider ${book.amazonUrl ? 'bg-transparent border-white/20 text-gray-300 hover:text-white hover:border-white' : 'bg-transparent border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark'}`}
                        aria-label={`Ver opções de compra para ${book.title}`}
                    >
                        {book.amazonUrl ? 'Outras Lojas' : 'Comprar Agora'}
                    </a>
                </div>
            </div>
        </article>
    );
};

export default BookCard;