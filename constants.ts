
// Livros identificados que serão pré-carregados se não estiverem no banco
export const INITIAL_BOOKS = [
    {
        id: 'static-1',
        title: 'Entre a Razão E a Runa',
        books2readUrl: 'https://amazon.com.br',
        amazonUrl: 'https://www.amazon.com.br/s?k=Entre+a+Raz%C3%A3o+E+a+Runa+Ashyus',
        amazonEbookUrl: '',
        draftBookUrl: '',
        coverUrl: 'https://placehold.co/800x1200/1e293b/fbbf24?text=Entre+a+Raz%C3%A3o+E+a+Runa',
        shortSynopsis: 'Uma história envolvente sobre escolhas difíceis e destinos mágicos.',
        fullSynopsis: 'Mergulhe nesta narrativa onde a razão e a magia se entrelaçam. (Sinopse temporária - Edite no Painel Admin)',
        firstChapterMarkdown: '## Capítulo 1\n\nO vento soprava forte... (Edite no Painel Admin)',
        createdAt: new Date().toISOString()
    },
    {
        id: 'static-2',
        title: 'Doce Reencontro em Sintra',
        books2readUrl: 'https://amazon.com.br',
        amazonUrl: 'https://www.amazon.com.br/s?k=Doce+Reencontro+em+Sintra+Ashyus',
        amazonEbookUrl: '',
        draftBookUrl: '',
        coverUrl: 'https://placehold.co/800x1200/1e293b/fbbf24?text=Doce+Reencontro',
        shortSynopsis: 'Um romance inesquecível ambientado nas belas paisagens de Sintra.',
        fullSynopsis: 'Dois corações, um destino e a magia de Sintra. (Sinopse temporária - Edite no Painel Admin)',
        firstChapterMarkdown: '## Prólogo\n\nAs ruas de pedra... (Edite no Painel Admin)',
        createdAt: new Date().toISOString()
    }
];

const getEnv = (key: string) => {
    try {
        // @ts-ignore
        return import.meta.env[key];
    } catch (e) {
        return undefined;
    }
};

export const ADMIN_USERNAME = getEnv('VITE_ADMIN_USERNAME');
export const ADMIN_PASSWORD = getEnv('VITE_ADMIN_PASSWORD');
