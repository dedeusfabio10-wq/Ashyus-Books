
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';

const HomePage: React.FC = () => {
    const { books, loading, error, isInitialized } = useContext(BookContext);

    return (
        <div className="animate-fade-in">
            <section className="text-center mb-12 md:mb-16">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-lighter mb-2">
                    Mundos forjados em Tinta e Sombra
                </h2>
                <p className="text-lg text-brand-gold">
                    Fantasia • Romance • Mistério • Young Adult
                </p>
            </section>
            
            {loading && !isInitialized && <div className="text-center"><Loader message="Invocando os grimórios..." /></div>}
            
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
            
            {isInitialized && books.length > 0 && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}

            {isInitialized && books.length === 0 && !loading && !error && (
                <div className="text-center py-20 border border-white/5 rounded-2xl bg-white/5 italic text-gray-500">
                    A biblioteca está vazia. Adicione sua primeira obra no painel.
                </div>
            )}
        </div>
    );
};

export default HomePage;
