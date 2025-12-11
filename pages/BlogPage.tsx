
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import Loader from '../components/Loader';
import { Book, Release } from '../types';

const ReleaseCard: React.FC<{ release: Release }> = ({ release }) => {
    return (
        <article className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border border-brand-gold/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start animate-slide-up shadow-lg shadow-black/30 ring-1 ring-brand-gold/10">
             <div className="md:w-1/3 w-2/3 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-brand-gold/20 blur-xl rounded-full -z-10 animate-pulse"></div>
                <img src={release.imageUrl} alt={release.title} className="rounded-xl shadow-2xl w-full object-cover aspect-[2/3] border border-white/5" />
            </div>
            <div className="flex-grow text-center md:text-left">
                <div className="inline-block bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-brand-gold/20">
                    Em Breve
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                    {release.title}
                </h2>
                <p className="text-brand-gold text-lg font-medium mb-6 italic">Lançamento: {release.date}</p>
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">{release.description}</p>
            </div>
        </article>
    );
};

const BlogPost: React.FC<{ book: Book }> = ({ book }) => {
    const postDate = new Date(book.createdAt).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <article className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-start animate-slide-up hover:border-white/10 transition-colors">
            <div className="md:w-1/4 w-1/2 mx-auto md:mx-0 flex-shrink-0 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <img src={book.coverUrl} alt={`Capa de ${book.title}`} className="relative rounded-lg shadow-2xl shadow-black/40 w-full transform group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
            <div className="flex-grow">
                <header className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-[1px] bg-brand-gold"></span>
                        <time dateTime={book.createdAt} className="text-brand-gold text-sm tracking-wider uppercase font-bold">{postDate}</time>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                        {book.title}
                    </h2>
                </header>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{book.shortSynopsis}</p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                    {book.amazonUrl && (
                        <a 
                            href={book.amazonUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark px-4 py-2 rounded font-bold hover:bg-brand-gold-dark transition-colors"
                        >
                            Amazon
                            <span>&rarr;</span>
                        </a>
                    )}
                    <a 
                        href={book.books2readUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 text-brand-gold font-bold hover:text-white transition-colors group px-4 py-2"
                    >
                        <span className="border-b-2 border-brand-gold group-hover:border-white transition-colors pb-0.5">Outras Lojas</span>
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </a>
                </div>
            </div>
        </article>
    );
};

const BlogPage: React.FC = () => {
    const { books, releases, loading, error, isInitialized } = useContext(BookContext);

    const sortedBooks = [...books].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <header className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-brand-gold/20 rounded-full blur-3xl -z-10"></div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Novidades</h1>
                <p className="mt-4 text-xl text-gray-400 font-light">O futuro e o presente das minhas histórias.</p>
            </header>

            {loading && !isInitialized && <div className="text-center py-12"><Loader message="Consultando os oráculos..." /></div>}
            {error && <p className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-900/50">{error}</p>}
            
            {isInitialized && (
                <div className="space-y-16">
                    {/* Seção de Próximos Lançamentos (Releases) */}
                    {releases.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-serif text-brand-gold mb-8 border-b border-white/10 pb-2">Próximos Lançamentos</h3>
                            <div className="space-y-8">
                                {releases.map(release => (
                                    <ReleaseCard key={release.id} release={release} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Seção de Últimos Lançamentos (Books) */}
                    <section>
                         {releases.length > 0 && <h3 className="text-2xl font-serif text-white mb-8 border-b border-white/10 pb-2">Já Disponíveis</h3>}
                         <div className="space-y-12">
                            {sortedBooks.length > 0 ? (
                                sortedBooks.map(book => <BlogPost key={book.id} book={book} />)
                            ) : (
                                releases.length === 0 && (
                                    <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-white/5">
                                        <p className="text-gray-400 text-lg font-serif italic">Nenhum lançamento recente encontrado.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default BlogPage;
