
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
            <header className="text-center mb-16">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-lighter mb-4">Sobre o Autor</h1>
                <p className="text-brand-gold uppercase tracking-[0.2em] text-xs font-bold">A Mente por trás das Sombras</p>
            </header>
            
            {/* Seção Bio Expandida */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-20">
                <div className="md:w-1/3 w-2/3 flex-shrink-0 relative group">
                    <div className="absolute inset-0 bg-brand-gold/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                        src={authorPhoto} 
                        alt="Foto do autor Ashyus" 
                        className="relative z-10 rounded-full shadow-2xl border-4 border-gray-700 aspect-square object-cover"
                    />
                </div>
                <div className="md:w-2/3 prose prose-invert text-brand-light max-w-none space-y-6 leading-relaxed">
                    <p className="text-lg italic text-brand-gold">
                        "Escrevo para os corações que encontram beleza na escuridão e força no mistério."
                    </p>
                    <p>
                        Ashyus é um autor brasileiro que emergiu no cenário literário com a missão de trazer novas cores para a <strong>Fantasia Sombria (Dark Fantasy)</strong> nacional. Nascido com uma imaginação inquieta, ele sempre buscou nas mitologias antigas e no folclore universal as raízes para suas histórias. Sua escrita é caracterizada por uma prosa lírica, porém crua, que não teme explorar os aspectos mais densos da experiência humana.
                    </p>
                    <p>
                        O autor acredita que a literatura é um portal de autodescoberta. Ao criar as <strong>Crônicas da Fantasia</strong>, Ashyus buscou unir o entretenimento vibrante do gênero Young Adult com dilemas filosóficos profundos. Seus livros já foram descritos por leitores como "viciantes e emocionalmente devastadores", reflexo de sua dedicação em construir personagens que respiram, erram e lutam por redenção.
                    </p>
                </div>
            </div>

            {/* Seção de Filosofia Literária */}
            <section className="mb-20 bg-slate-900/30 p-8 rounded-2xl border border-white/5">
                <h2 className="font-serif text-3xl text-white mb-6 text-center">Nossa Missão Literária</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-3">
                        <div className="text-brand-gold text-3xl">✦</div>
                        <h3 className="font-bold text-white uppercase text-xs tracking-widest">Qualidade</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Comprometimento com narrativas bem estruturadas e revisões técnicas de alto nível.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="text-brand-gold text-3xl">✦</div>
                        <h3 className="font-bold text-white uppercase text-xs tracking-widest">Originalidade</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Criação de sistemas de magia únicos e universos que fogem do óbvio.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="text-brand-gold text-3xl">✦</div>
                        <h3 className="font-bold text-white uppercase text-xs tracking-widest">Conexão</h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Foco total no leitor e no impacto emocional que cada página pode causar.</p>
                    </div>
                </div>
            </section>

            {/* Seção FAQ - CRÍTICA PARA SEO (Volume de Conteúdo) */}
            <section className="border-t border-white/5 pt-12">
                <h2 className="font-serif text-3xl text-white text-center mb-8">Dúvidas Frequentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FAQItem 
                        question="Qual é a classificação etária dos livros?" 
                        answer="Nossas obras são majoritariamente classificadas como Young Adult (YA) ou New Adult (NA), recomendadas para leitores a partir de 14 ou 16 anos, dependendo da densidade dos temas abordados."
                    />
                    <FAQItem 
                        question="Onde posso encontrar Ashyus Books na Amazon?" 
                        answer="Todos os livros publicados estão disponíveis globalmente através do selo Ashyus Books na Amazon Kindle Store. Assinantes do Kindle Unlimited podem ler gratuitamente."
                    />
                    <FAQItem 
                        question="Como posso ser um leitor beta ou parceiro?" 
                        answer="Periodicamente abrimos vagas para leitores beta através de nossa newsletter e redes sociais. Se você é um criador de conteúdo literário, entre em contato via direct no Instagram."
                    />
                    <FAQItem 
                        question="Existem edições físicas das Crônicas da Fantasia?" 
                        answer="Atualmente operamos sob demanda e através de financiamentos coletivos ou edições limitadas. Fique atento ao blog para anúncios de versões impressas de luxo."
                    />
                </div>
            </section>

            <div className="mt-20 text-center text-gray-500 text-sm">
                <p>Obrigado por apoiar a literatura nacional independente.</p>
            </div>
        </div>
    );
};

export default AboutPage;
