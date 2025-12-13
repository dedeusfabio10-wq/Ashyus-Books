import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { BookContext } from '../context/BookContext';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../constants';
import Loader from './Loader';

interface AdminModalProps {
    onClose: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const AdminModal: React.FC<AdminModalProps> = ({ onClose }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    // Book State
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [amazonUrl, setAmazonUrl] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [shortSynopsis, setShortSynopsis] = useState('');
    const [fullSynopsis, setFullSynopsis] = useState('');
    const [firstChapter, setFirstChapter] = useState('');
    const [addError, setAddError] = useState('');

    // Banner State
    const [bannerLink, setBannerLink] = useState('');
    const [bannerPosition, setBannerPosition] = useState<'left' | 'right'>('right');
    const [bannerImage, setBannerImage] = useState<string | null>(null);

    // Release State
    const [releaseTitle, setReleaseTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [releaseDesc, setReleaseDesc] = useState('');
    const [releaseImage, setReleaseImage] = useState<string | null>(null);

    const [activeTab, setActiveTab] = useState<'add' | 'edit' | 'ads' | 'releases' | 'author'>('add');
    
    const { 
        books, banners, releases, authorPhoto, 
        addBook, updateBookCover, addBanner, removeBanner, 
        addRelease, removeRelease, updateAuthorPhoto, loading 
    } = useContext(BookContext);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        
        // Verificação de Segurança: Se as variáveis não estiverem configuradas na Vercel/Env
        if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
            setLoginError('Erro de Configuração: Credenciais de administrador não definidas nas variáveis de ambiente (VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD).');
            return;
        }

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Credenciais inválidas.');
        }
    };

    const handleBookCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setCoverImage(base64);
            } catch (error) {
                console.error("Erro ao processar imagem da capa", error);
            }
        }
    }

    const handleAddBook = async (e: FormEvent) => {
        e.preventDefault();
        setAddError('');
        if (!title || !url || !shortSynopsis || !fullSynopsis || !firstChapter) {
            setAddError('Preencha todos os campos obrigatórios.');
            return;
        }
        try {
            await addBook(
                title, 
                url, 
                amazonUrl, 
                coverImage || undefined,
                shortSynopsis,
                fullSynopsis,
                firstChapter
            );
            setTitle('');
            setUrl('');
            setAmazonUrl('');
            setCoverImage(null);
            setShortSynopsis('');
            setFullSynopsis('');
            setFirstChapter('');
            alert('Livro adicionado com sucesso!');
        } catch (error) {
            setAddError(error instanceof Error ? error.message : "Ocorreu um erro desconhecido.");
        }
    };
    
    const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>, bookId: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const base64 = await fileToBase64(file);
                updateBookCover(bookId, base64);
            } catch (error) {
                console.error("Erro ao converter imagem:", error);
            }
        }
    };

    const handleBannerImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setBannerImage(base64);
            } catch (error) {
                console.error("Erro ao processar imagem do banner", error);
            }
        }
    }

    const handleAddBanner = (e: FormEvent) => {
        e.preventDefault();
        if (!bannerLink || !bannerImage) {
            alert("Preencha o link e faça upload da imagem.");
            return;
        }
        addBanner(bannerImage, bannerLink, bannerPosition);
        setBannerImage(null);
        setBannerLink('');
        alert("Banner adicionado!");
    }

    const handleReleaseImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                setReleaseImage(base64);
            } catch (error) {
                console.error("Erro ao processar imagem do lançamento", error);
            }
        }
    }

    const handleAddRelease = (e: FormEvent) => {
        e.preventDefault();
        if (!releaseTitle || !releaseDate || !releaseDesc || !releaseImage) {
            alert("Preencha todos os campos do lançamento.");
            return;
        }
        addRelease(releaseTitle, releaseDesc, releaseDate, releaseImage);
        setReleaseTitle('');
        setReleaseDate('');
        setReleaseDesc('');
        setReleaseImage(null);
        alert("Lançamento adicionado!");
    }

    const handleAuthorPhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                const base64 = await fileToBase64(e.target.files[0]);
                updateAuthorPhoto(base64);
                alert("Foto do autor atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar foto do autor:", error);
                alert("Erro ao processar a imagem.");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-brand-darker rounded-lg shadow-2xl shadow-black/50 border border-gray-700 w-full max-w-4xl m-4 p-8 relative animate-slide-up max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none">&times;</button>
                <h2 className="font-serif text-2xl text-brand-gold mb-6 text-center">Painel de Administração</h2>
                
                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} className="max-w-sm mx-auto">
                        <div className="space-y-4">
                            <input type="text" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                        </div>
                        {loginError && <p className="text-red-500 text-sm mt-4 text-center">{loginError}</p>}
                        <button type="submit" className="w-full mt-6 bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded hover:bg-brand-gold-dark transition-colors">Entrar</button>
                    </form>
                ) : (
                    <div>
                        <div className="flex border-b border-gray-700 mb-6 flex-wrap gap-2">
                            <button onClick={() => setActiveTab('add')} className={`px-3 py-2 font-semibold text-sm sm:text-base ${activeTab === 'add' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Livros</button>
                            <button onClick={() => setActiveTab('edit')} className={`px-3 py-2 font-semibold text-sm sm:text-base ${activeTab === 'edit' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Capas</button>
                            <button onClick={() => setActiveTab('releases')} className={`px-3 py-2 font-semibold text-sm sm:text-base ${activeTab === 'releases' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Lançamentos</button>
                            <button onClick={() => setActiveTab('ads')} className={`px-3 py-2 font-semibold text-sm sm:text-base ${activeTab === 'ads' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Monetização</button>
                            <button onClick={() => setActiveTab('author')} className={`px-3 py-2 font-semibold text-sm sm:text-base ${activeTab === 'author' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Autor</button>
                        </div>

                        {activeTab === 'add' && (
                            <form onSubmit={handleAddBook} className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-brand-gold font-bold border-b border-gray-700 pb-2">Informações Básicas</h3>
                                    
                                    <input type="text" placeholder="Título do Livro" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
                                    
                                    <input type="url" placeholder="Link Amazon (Opcional)" value={amazonUrl} onChange={e => setAmazonUrl(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                                    
                                    <input type="url" placeholder="Link Books2Read (Multi-lojas)" value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-gold" required />
                                    
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Capa do Livro</label>
                                        <input type="file" accept="image/*" onChange={handleBookCoverUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-brand-gold-dark"/>
                                        {coverImage && <img src={coverImage} alt="Preview" className="mt-2 h-24 object-contain border border-gray-600" />}
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Sinopse Curta (Cartão)</label>
                                        <textarea 
                                            value={shortSynopsis} 
                                            onChange={e => setShortSynopsis(e.target.value)} 
                                            placeholder="Breve resumo que aparece na capa (max 3 linhas)..." 
                                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-24 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-brand-gold font-bold border-b border-gray-700 pb-2">Conteúdo Detalhado</h3>
                                    
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Sinopse Completa</label>
                                        <textarea 
                                            value={fullSynopsis} 
                                            onChange={e => setFullSynopsis(e.target.value)} 
                                            placeholder="A sinopse completa que aparece na página do livro..." 
                                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-32 focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            required 
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Primeiro Capítulo (Markdown)</label>
                                        <textarea 
                                            value={firstChapter} 
                                            onChange={e => setFirstChapter(e.target.value)} 
                                            placeholder="Cole aqui o texto do primeiro capítulo..." 
                                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-48 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                            required 
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Suporta quebras de linha para parágrafos.</p>
                                    </div>

                                    {loading ? (
                                        <div className="mt-6"><Loader message="Salvando..."/></div>
                                    ) : (
                                        <>
                                            {addError && <p className="text-red-500 text-sm mt-4">{addError}</p>}
                                            <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 px-4 rounded hover:bg-brand-gold-dark transition-colors text-lg shadow-lg">
                                                Publicar Livro
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        )}

                        {activeTab === 'edit' && (
                             <div className="animate-fade-in space-y-4">
                                <p className="text-center mb-4 text-gray-300">Clique para trocar a imagem da capa.</p>
                                {books.map(book => (
                                    <div key={book.id} className="flex items-center gap-4 bg-gray-800 p-3 rounded">
                                        <img src={book.coverUrl} alt={book.title} className="w-12 h-16 object-cover rounded flex-shrink-0" />
                                        <p className="flex-grow text-white truncate text-sm">{book.title}</p>
                                        <label htmlFor={`file-upload-${book.id}`} className="cursor-pointer bg-brand-gold text-brand-dark font-bold py-1 px-3 rounded hover:bg-brand-gold-dark transition-colors text-xs whitespace-nowrap">
                                            Trocar
                                        </label>
                                        <input id={`file-upload-${book.id}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleCoverChange(e, book.id)} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'releases' && (
                            <div className="animate-fade-in">
                                <form onSubmit={handleAddRelease} className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <h3 className="text-brand-gold font-bold mb-4">Adicionar Próximo Lançamento</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Título</label>
                                            <input type="text" value={releaseTitle} onChange={e => setReleaseTitle(e.target.value)} placeholder="Ex: A Sombra da Coroa" className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Data de Lançamento (Texto)</label>
                                            <input type="text" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} placeholder="Ex: Dezembro 2024" className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Descrição</label>
                                            <textarea value={releaseDesc} onChange={e => setReleaseDesc(e.target.value)} placeholder="Breve descrição do que vem por aí..." className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm h-24" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Imagem Promocional</label>
                                            <input type="file" accept="image/*" onChange={handleReleaseImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-brand-gold-dark"/>
                                            {releaseImage && <img src={releaseImage} alt="Preview" className="mt-2 h-20 object-contain border border-gray-600" />}
                                        </div>
                                        <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded hover:bg-brand-gold-dark transition-colors">Salvar Lançamento</button>
                                    </div>
                                </form>
                                
                                <div>
                                    <h3 className="text-white font-bold mb-4">Lançamentos Agendados</h3>
                                    {releases.length === 0 && <p className="text-gray-500 text-sm">Nenhum lançamento futuro cadastrado.</p>}
                                    <div className="space-y-3">
                                        {releases.map(release => (
                                            <div key={release.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded border border-gray-700">
                                                <img src={release.imageUrl} alt={release.title} className="w-12 h-12 object-cover rounded bg-white" />
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-white text-sm font-bold truncate">{release.title}</p>
                                                    <p className="text-brand-gold text-xs">{release.date}</p>
                                                </div>
                                                <button onClick={() => removeRelease(release.id)} className="text-red-400 hover:text-red-300 text-sm font-bold px-2">X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'ads' && (
                            <div className="animate-fade-in">
                                <form onSubmit={handleAddBanner} className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                    <h3 className="text-brand-gold font-bold mb-4">Novo Banner</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Link de Afiliado (URL)</label>
                                            <input type="url" value={bannerLink} onChange={e => setBannerLink(e.target.value)} placeholder="https://amazon.com.br/..." className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm" required />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Posição</label>
                                            <select value={bannerPosition} onChange={(e) => setBannerPosition(e.target.value as 'left' | 'right')} className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white text-sm">
                                                <option value="left">Esquerda</option>
                                                <option value="right">Direita</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Imagem do Banner</label>
                                            <input type="file" accept="image/*" onChange={handleBannerImageUpload} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-brand-gold-dark"/>
                                            {bannerImage && <img src={bannerImage} alt="Preview" className="mt-2 h-20 object-contain border border-gray-600" />}
                                        </div>
                                        <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded hover:bg-brand-gold-dark transition-colors">Adicionar Banner</button>
                                    </div>
                                </form>

                                <div>
                                    <h3 className="text-white font-bold mb-4">Banners Ativos</h3>
                                    {banners.length === 0 && <p className="text-gray-500 text-sm">Nenhum banner ativo.</p>}
                                    <div className="space-y-3">
                                        {banners.map(banner => (
                                            <div key={banner.id} className="flex items-center gap-3 bg-gray-800 p-3 rounded border border-gray-700">
                                                <img src={banner.imageUrl} alt="Banner" className="w-12 h-12 object-cover rounded bg-white" />
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-white text-xs truncate">{banner.linkUrl}</p>
                                                    <p className="text-brand-gold text-xs uppercase font-bold">{banner.position === 'left' ? 'Esquerda' : 'Direita'}</p>
                                                </div>
                                                <button onClick={() => removeBanner(banner.id)} className="text-red-400 hover:text-red-300 text-sm font-bold px-2">X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'author' && (
                             <div className="animate-fade-in flex flex-col items-center">
                                <h3 className="text-brand-gold font-bold mb-6">Foto do Perfil</h3>
                                <div className="mb-6 relative group">
                                    <img src={authorPhoto} alt="Autor Atual" className="w-48 h-48 rounded-full object-cover border-4 border-gray-700 shadow-lg" />
                                </div>
                                
                                <label className="cursor-pointer bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded hover:bg-brand-gold-dark transition-colors">
                                    Alterar Foto
                                    <input type="file" className="hidden" accept="image/*" onChange={handleAuthorPhotoChange} />
                                </label>
                                <p className="text-gray-400 text-sm mt-4 text-center">Recomendado: Imagem quadrada (1:1)</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminModal;