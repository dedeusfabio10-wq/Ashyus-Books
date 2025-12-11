
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
            {error && <p className="text-center text-red-500">{error}</p>}
            
            {isInitialized && (
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {books.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
