
import React, { useState, useContext, FormEvent } from 'react';
import { BookContext } from '../context/BookContext';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../constants';
import { Book } from '../types';
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
    const [amazonEbookUrl, setAmazonEbookUrl] = useState('');
    const [draftBookUrl, setDraftBookUrl] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [shortSynopsis, setShortSynopsis] = useState('');
    const [fullSynopsis, setFullSynopsis] = useState('');
    const [firstChapter, setFirstChapter] = useState('');

    // Editing State
    const [editingBookId, setEditingBookId] = useState<string | null>(null);
    const [editingCoverPreview, setEditingCoverPreview] = useState<string | null>(null);

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
        addBook, updateBook, updateBookCover, addBanner, removeBanner, 
        addRelease, removeRelease, updateAuthorPhoto, loading 
    } = useContext(BookContext);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Credenciais inválidas.');
        }
    };

    const handleAddBook = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await addBook(
                title, url, amazonUrl || undefined, amazonEbookUrl || undefined, draftBookUrl || undefined,
                coverImage || undefined, shortSynopsis, fullSynopsis, firstChapter
            );
            setTitle(''); setUrl(''); setAmazonUrl(''); setAmazonEbookUrl(''); setDraftBookUrl('');
            setCoverImage(null); setShortSynopsis(''); setFullSynopsis(''); setFirstChapter('');
            alert('Livro adicionado com sucesso!');
        } catch (error) {
            alert("Erro ao adicionar livro.");
        }
    };

    const handleUpdateBook = async (e: FormEvent) => {
        e.preventDefault();
        if (!editingBookId) return;
        await updateBook(editingBookId, {
            title, books2readUrl: url, amazonUrl, amazonEbookUrl, draftBookUrl,
            shortSynopsis, fullSynopsis, firstChapterMarkdown: firstChapter
        });
        setEditingBookId(null);
        alert("Alterações salvas com sucesso!");
    };

    const handleAddBanner = async (e: FormEvent) => {
        e.preventDefault();
        if (!bannerImage) return alert("Selecione uma imagem para o banner.");
        await addBanner(bannerImage, bannerLink, bannerPosition);
        setBannerImage(null); setBannerLink('');
        alert("Banner adicionado!");
    };

    const handleAddRelease = async (e: FormEvent) => {
        e.preventDefault();
        if (!releaseImage) return alert("Selecione uma imagem para o lançamento.");
        await addRelease(releaseTitle, releaseDesc, releaseDate, releaseImage);
        setReleaseTitle(''); setReleaseDesc(''); setReleaseDate(''); setReleaseImage(null);
        alert("Lançamento adicionado!");
    };

    const startEditing = (book: Book) => {
        setEditingBookId(book.id);
        setTitle(book.title);
        setUrl(book.books2readUrl);
        setAmazonUrl(book.amazonUrl || '');
        setAmazonEbookUrl(book.amazonEbookUrl || '');
        setDraftBookUrl(book.draftBookUrl || '');
        setShortSynopsis(book.shortSynopsis);
        setFullSynopsis(book.fullSynopsis);
        setFirstChapter(book.firstChapterMarkdown);
        setEditingCoverPreview(book.coverUrl);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="bg-brand-darker rounded-lg shadow-2xl border border-gray-700 w-full max-w-5xl m-4 p-8 relative animate-slide-up max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none">&times;</button>
                <h2 className="font-serif text-2xl text-brand-gold mb-6 text-center">Painel de Administração</h2>
                
                {!isLoggedIn ? (
                    <form onSubmit={handleLogin} className="max-w-sm mx-auto">
                        <div className="space-y-4">
                            <input type="text" placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
                            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" />
                        </div>
                        {loginError && <p className="text-red-500 text-sm mt-4 text-center">{loginError}</p>}
                        <button type="submit" className="w-full mt-6 bg-brand-gold text-brand-dark font-bold py-2 px-4 rounded hover:bg-brand-gold-dark transition-colors">Entrar</button>
                    </form>
                ) : (
                    <div>
                        <div className="flex border-b border-gray-700 mb-6 flex-wrap gap-2">
                            <button onClick={() => { setActiveTab('add'); setEditingBookId(null); }} className={`px-3 py-2 font-semibold text-sm ${activeTab === 'add' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Novo Livro</button>
                            <button onClick={() => setActiveTab('edit')} className={`px-3 py-2 font-semibold text-sm ${activeTab === 'edit' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Gerenciar Obras</button>
                            <button onClick={() => setActiveTab('releases')} className={`px-3 py-2 font-semibold text-sm ${activeTab === 'releases' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Lançamentos</button>
                            <button onClick={() => setActiveTab('ads')} className={`px-3 py-2 font-semibold text-sm ${activeTab === 'ads' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Banners</button>
                            <button onClick={() => setActiveTab('author')} className={`px-3 py-2 font-semibold text-sm ${activeTab === 'author' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Autor</button>
                        </div>

                        {loading && <div className="py-10"><Loader message="Processando..." /></div>}

                        {!loading && (activeTab === 'add' || editingBookId) && (
                            <form onSubmit={editingBookId ? handleUpdateBook : handleAddBook} className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Coluna Esquerda: Capa e Links */}
                                <div className="space-y-4">
                                    <h3 className="text-brand-gold font-bold border-b border-gray-700 pb-2">{editingBookId ? 'Editar Capa' : 'Capa da Obra'}</h3>
                                    
                                    {/* Preview da Capa */}
                                    <div className="aspect-[2/3] bg-black/40 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center overflow-hidden relative group">
                                        {(editingCoverPreview || coverImage) ? (
                                            <img src={editingCoverPreview || coverImage || ''} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <svg className="w-12 h-12 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                <p className="text-[10px] text-gray-500 uppercase">Nenhuma Imagem</p>
                                            </div>
                                        )}
                                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                                            <span className="text-white text-xs font-bold mb-2">CLIQUE PARA TROCAR</span>
                                            <span className="text-[10px] text-brand-gold">MÁX: 200KB</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={async e => {
                                                if (e.target.files) {
                                                    const base64 = await fileToBase64(e.target.files[0]);
                                                    if (editingBookId) {
                                                        await updateBookCover(editingBookId, base64);
                                                        setEditingCoverPreview(base64);
                                                    } else {
                                                        setCoverImage(base64);
                                                    }
                                                }
                                            }} />
                                        </label>
                                    </div>

                                    {/* Guia de Formato */}
                                    <div className="bg-brand-gold/5 border border-brand-gold/20 p-3 rounded-lg">
                                        <p className="text-[10px] font-bold text-brand-gold uppercase mb-1">📐 Formato Ideal</p>
                                        <ul className="text-[10px] text-gray-400 space-y-1">
                                            <li>• Dimensões: <span className="text-white">800 x 1200 px</span></li>
                                            <li>• Formato: <span className="text-white">WebP</span> ou <span className="text-white">JPG</span></li>
                                            <li>• Peso: abaixo de <span className="text-white">200kb</span></li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 p-3 bg-black/20 rounded-lg border border-white/5">
                                        <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Canais de Venda</p>
                                        <input type="url" placeholder="Amazon (Físico)" value={amazonUrl} onChange={e => setAmazonUrl(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-[11px]" />
                                        <input type="url" placeholder="Amazon (eBook)" value={amazonEbookUrl} onChange={e => setAmazonEbookUrl(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-[11px]" />
                                        <input type="url" placeholder="Draft" value={draftBookUrl} onChange={e => setDraftBookUrl(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-[11px]" />
                                        <input type="url" placeholder="Books2Read" value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-[11px]" required />
                                    </div>
                                </div>

                                {/* Coluna Meio e Direita: Conteúdo */}
                                <div className="md:col-span-2 space-y-4">
                                    <h3 className="text-brand-gold font-bold border-b border-gray-700 pb-2">{editingBookId ? 'Editando: ' + title : 'Textos da Obra'}</h3>
                                    <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-serif text-lg" required />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <textarea value={shortSynopsis} onChange={e => setShortSynopsis(e.target.value)} placeholder="Sinopse Curta (Exibida no card)..." className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-24 text-sm" required />
                                            <textarea value={fullSynopsis} onChange={e => setFullSynopsis(e.target.value)} placeholder="Sinopse Completa..." className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-52 text-sm" required />
                                        </div>
                                        <div className="space-y-4">
                                            <textarea value={firstChapter} onChange={e => setFirstChapter(e.target.value)} placeholder="Primeiro Capítulo (Markdown)..." className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-[324px] font-mono text-[11px]" required />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button type="submit" className="flex-grow bg-brand-gold text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-gold-dark transition-all uppercase tracking-widest text-sm shadow-lg shadow-brand-gold/10">
                                            {editingBookId ? 'Confirmar Alterações' : 'Publicar Obra'}
                                        </button>
                                        <button type="button" onClick={() => { setEditingBookId(null); setActiveTab('edit'); }} className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm uppercase">
                                            {editingBookId ? 'Cancelar' : 'Limpar'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {!loading && activeTab === 'edit' && !editingBookId && (
                             <div className="animate-fade-in space-y-3">
                                {books.length === 0 ? <p className="text-center text-gray-500 py-10">Nenhum livro cadastrado.</p> : 
                                    books.map(book => (
                                        <div key={book.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg border border-white/5 hover:border-brand-gold/30 transition-all">
                                            <img src={book.coverUrl} className="w-12 h-18 object-cover rounded shadow-lg" />
                                            <div className="flex-grow">
                                                <p className="text-white font-bold">{book.title}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Postado em {new Date(book.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEditing(book)} className="bg-brand-gold text-brand-dark font-bold px-4 py-2 rounded text-xs hover:bg-white transition-all">Editar Obra e Capa</button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )}

                        {!loading && activeTab === 'releases' && (
                            <div className="animate-fade-in space-y-8">
                                <form onSubmit={handleAddRelease} className="bg-black/20 p-6 rounded-xl border border-white/5 space-y-4">
                                    <h3 className="text-brand-gold font-bold">Novo Lançamento</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Título" value={releaseTitle} onChange={e => setReleaseTitle(e.target.value)} className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" required />
                                        <input type="text" placeholder="Mês/Ano" value={releaseDate} onChange={e => setReleaseDate(e.target.value)} className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" required />
                                        <div className="md:col-span-2">
                                            <textarea placeholder="Pequeno anúncio..." value={releaseDesc} onChange={e => setReleaseDesc(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white h-24" required />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-xs uppercase font-bold">Imagem do Lançamento (800x1200px)</label>
                                            <input type="file" accept="image/*" onChange={async e => e.target.files && setReleaseImage(await fileToBase64(e.target.files[0]))} className="block w-full text-xs text-gray-400" />
                                        </div>
                                        <button type="submit" className="bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-brand-gold-dark transition-all self-end shadow-lg shadow-brand-gold/10">Adicionar Card</button>
                                    </div>
                                </form>

                                <div className="space-y-4">
                                    <h3 className="text-white font-bold border-b border-gray-700 pb-2">Lançamentos Ativos</h3>
                                    {releases.map(r => (
                                        <div key={r.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg border border-white/5">
                                            <img src={r.imageUrl} className="w-12 h-16 object-cover rounded" />
                                            <div className="flex-grow">
                                                <p className="text-white font-bold">{r.title}</p>
                                                <p className="text-xs text-brand-gold uppercase">{r.date}</p>
                                            </div>
                                            <button onClick={() => removeRelease(r.id)} className="bg-red-900/20 text-red-500 border border-red-900/50 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white transition-all">Excluir</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!loading && activeTab === 'ads' && (
                            <div className="animate-fade-in space-y-8">
                                <form onSubmit={handleAddBanner} className="bg-black/20 p-6 rounded-xl border border-white/5 space-y-4">
                                    <h3 className="text-brand-gold font-bold">Novo Banner</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="url" placeholder="Link (URL Completa)" value={bannerLink} onChange={e => setBannerLink(e.target.value)} className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white" required />
                                        <select value={bannerPosition} onChange={e => setBannerPosition(e.target.value as any)} className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white">
                                            <option value="right">Lateral Direita</option>
                                            <option value="left">Lateral Esquerda</option>
                                        </select>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-gray-400 text-xs font-bold uppercase">Banner (MÁX 100KB)</label>
                                            <input type="file" accept="image/*" onChange={async e => e.target.files && setBannerImage(await fileToBase64(e.target.files[0]))} className="block w-full text-xs text-gray-400" />
                                        </div>
                                        <button type="submit" className="bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-brand-gold-dark transition-all self-end">Adicionar ao Giro</button>
                                    </div>
                                </form>

                                <div className="space-y-4">
                                    <h3 className="text-white font-bold border-b border-gray-700 pb-2">Banners em Circulação</h3>
                                    {banners.map(b => (
                                        <div key={b.id} className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg border border-white/5">
                                            <img src={b.imageUrl} className="w-16 h-10 object-cover rounded" />
                                            <div className="flex-grow">
                                                <p className="text-white text-[10px] truncate max-w-[300px]">{b.linkUrl}</p>
                                                <p className="text-[10px] text-brand-gold uppercase">{b.position === 'left' ? 'Esquerda' : 'Direita'}</p>
                                            </div>
                                            <button onClick={() => removeBanner(b.id)} className="bg-red-900/20 text-red-500 border border-red-900/50 px-3 py-1 rounded text-xs hover:bg-red-500 hover:text-white transition-all">Remover</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!loading && activeTab === 'author' && (
                            <div className="animate-fade-in flex flex-col items-center py-10 space-y-6">
                                <h3 className="text-brand-gold font-bold">Foto do Autor</h3>
                                <div className="relative group">
                                    <img src={authorPhoto} className="w-48 h-48 rounded-full object-cover border-4 border-brand-gold shadow-2xl" />
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="text-white text-xs font-bold uppercase">FOTO ATUAL</span>
                                    </div>
                                </div>
                                <div className="max-w-xs w-full text-center">
                                    <p className="text-gray-400 text-xs mb-4">Esta foto é usada no site e nos metadados de SEO.<br/>Use uma foto quadrada (1:1) de até 200kb.</p>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={async e => e.target.files && updateAuthorPhoto(await fileToBase64(e.target.files[0]))} 
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-brand-gold-dark cursor-pointer"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminModal;
