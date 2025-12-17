import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div className="bg-slate-800/30 border border-white/5 rounded-lg p-6 hover:border-brand-gold/30 transition-colors">
        <h3 className="text-brand-gold font-bold font-serif text-lg mb-2">{question}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
    </div>
);

const AboutPage: React.FC = () => {
    const { authorPhoto } = useContext(BookContext);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-12">
            <header className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-lighter">Sobre o Autor</h1>
            </header>
            
            {/* Seção Bio */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-20">
                <div className="md:w-1/3 w-2/3 flex-shrink-0">
                    <img 
                        src={authorPhoto} 
                        alt="Foto do autor Ashyus" 
                        className="rounded-full shadow-lg shadow-black/50 border-4 border-gray-700 aspect-square object-cover"
                    />
                </div>
                <div className="md:w-2/3 prose prose-invert text-brand-light max-w-none space-y-4 leading-relaxed">
                    <p>
                        Ashyus é um autor brasileiro que encontrou sua voz nas encruzilhadas sombrias da fantasia e do romance. Nascido sob um céu de estrelas esquecidas, ele desde cedo foi atraído por histórias que exploram a complexa dança entre luz e escuridão, tanto nos mundos que cria quanto na alma de seus personagens. Sua escrita é um convite para adentrar reinos onde a magia é perigosa, o amor é uma força avassaladora e cada escolha pode selar ou destruir um destino.
                    </p>
                    <p>
                        Com uma paixão por mitologia, história e os cantos obscuros da psicologia humana, Ashyus tece narrativas Young Adult que desafiam convenções. Seus protagonistas não são heróis imaculados, mas sim almas quebradas em busca de redenção, poder ou simplesmente um lugar ao qual pertencer. As tramas de mistério que permeiam suas obras são tão importantes quanto as batalhas épicas, forçando os leitores a questionar a verdade por trás de cada véu de segredo.
                    </p>
                    <p>
                        Quando não está perdido em seus próprios universos literários, Ashyus pode ser encontrado em alguma cafeteria antiga, com um caderno e uma xícara de café forte, conspirando as próximas reviravoltas que atormentarão seus leitores. Ele acredita que as melhores histórias são aquelas que permanecem conosco muito depois da última página, ecoando como um feitiço sussurrado no silêncio da noite.
                    </p>
                </div>
            </div>

            {/* Seção FAQ - CRÍTICA PARA SEO (Rich Snippets) */}
            <section className="border-t border-white/5 pt-12">
                <h2 className="font-serif text-3xl text-white text-center mb-8">Perguntas Frequentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                        question="Qual a ordem de leitura dos livros?" 
                        answer="Embora a maioria dos livros possa ser lida de forma independente, recomenda-se começar pela saga principal (listada na página Livros) para entender a mitologia completa do universo Ashyus."
                    />
                    <FAQItem 
                        question="Onde posso comprar os livros físicos?" 
                        answer="Atualmente, os livros estão disponíveis principalmente em formato digital (eBook) na Amazon e Kindle Unlimited. Edições físicas limitadas são anunciadas em ocasiões especiais através da Newsletter."
                    />
                    <FAQItem 
                        question="O autor é brasileiro?" 
                        answer="Sim, Ashyus é um autor brasileiro. Suas obras valorizam a literatura nacional de fantasia, competindo em qualidade e profundidade com grandes nomes internacionais do gênero Dark Fantasy."
                    />
                    <FAQItem 
                        question="Como faço parcerias ou solicito ARC?" 
                        answer="Para solicitações de parcerias com blogs literários, bookgrams ou envio de ARCs (Advanced Reader Copies), entre em contato diretamente pelo Instagram oficial ou aguarde os formulários de inscrição na Newsletter."
                    />
                </div>
            </section>
        </div>
    );
};

export default AboutPage;