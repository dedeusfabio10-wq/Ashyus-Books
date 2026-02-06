
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
        shortSynopsis: 'Quando o lógico enfrenta o místico, sacrificar a mente pode ser o único caminho para salvar a alma.',
        fullSynopsis: 'Em um mundo onde a magia é uma ciência esquecida, "Entre a Razão E a Runa" explora o conflito devastador entre o intelecto e o inexplicável. O protagonista, um erudito cético, vê suas convicções desmoronarem ao encontrar uma runa antiga que desafia todas as leis da física. \n\nPerseguido por sombras que não deveriam existir e tentado por um poder que promete reescrever a realidade, ele deve escolher: manter sua sanidade intacta ou mergulhar na loucura para impedir uma catástrofe dimensional. Uma obra de Dark Fantasy que questiona os limites do conhecimento humano.',
        firstChapterMarkdown: '## Capítulo 1: O Sussurro da Pedra\n\nA chuva batia contra a janela como dedos esqueléticos pedindo abrigo. Ele ignorou, focado na peça de obsidiana sobre sua mesa. Não era apenas uma pedra; era um grito silencioso. \n\n— *Você não deveria estar olhando para isso* — uma voz ecoou, não na sala, mas dentro de seu crânio. \n\nA caneta caiu de sua mão, manchando de tinta preta as anotações organizadas de anso de pesquisa. A razão dizia que era cansaço. A runa dizia que era apenas o começo.',
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
        shortSynopsis: 'Nas brumas de Sintra, um amor antigo ressurge entre palácios e segredos que o tempo não conseguiu apagar.',
        fullSynopsis: 'Sintra, Portugal. Uma vila envolta em neblina e mistério, onde cada palácio esconde uma lenda. É aqui que o destino decide entrelaçar novamente dois caminhos separados há décadas. "Doce Reencontro em Sintra" não é apenas um romance; é uma viagem atmosférica pelas ruelas góticas e jardins secretos da serra. \n\nEntre taças de vinho e os ecos do passado, segredos sombrios vêm à tona, ameaçando transformar esse doce reencontro em uma despedida amarga. Para os amantes de romances intensos com um toque de mistério europeu.',
        firstChapterMarkdown: '## Prólogo\n\nA neblina de Sintra tem um cheiro peculiar: cheira a musgo, terra molhada e memórias antigas. Caminhando pelas ruas de paralelepípedos, ela sentiu o peso do olhar dele antes mesmo de vê-lo. \n\nO Palácio da Pena erguia-se acima deles, um gigante colorido observando minúsculas peças de xadrez se moverem no tabuleiro do destino. \n\n— Você voltou — ele disse, a voz rouca como o vento na serra. \n\n— Eu nunca parti de verdade.',
        createdAt: new Date().toISOString()
    }
    // ... (INITIAL_BOOKS array)
];

// Lançamentos futuros identificados
export const INITIAL_RELEASES = [];

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
