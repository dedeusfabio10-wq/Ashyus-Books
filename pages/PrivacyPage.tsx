
import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20 prose prose-invert">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 border-b border-brand-gold/30 pb-4">Política de Privacidade</h1>
            
            <section className="space-y-6 text-gray-300 leading-relaxed">
                <p>No <strong>Crônicas da Fantasia | Ashyus Books</strong>, acessível em cronicasdafantasia.com.br, uma de nossas principais prioridades é a privacidade de nossos visitantes. Este documento de Política de Privacidade contém tipos de informações que são coletadas e registradas pelo site e como as usamos.</p>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Arquivos de Log</h2>
                <p>Seguimos um procedimento padrão de uso de arquivos de log. Esses arquivos registram os visitantes quando eles visitam sites. Todas as empresas de hospedagem fazem isso e uma parte da análise dos serviços de hospedagem. As informações coletadas pelos arquivos de log incluem endereços de protocolo de internet (IP), tipo de navegador, Provedor de Serviços de Internet (ISP), carimbo de data e hora, páginas de referência/saída e, possivelmente, o número de cliques.</p>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Cookies e Web Beacons</h2>
                <p>Como qualquer outro site, o Crônicas da Fantasia utiliza 'cookies'. Esses cookies são usados para armazenar informações, incluindo as preferências dos visitantes e as páginas no site que o visitante acessou ou visitou. As informações são usadas para otimizar a experiência dos usuários, personalizando o conteúdo de nossa página da web com base no tipo de navegador dos visitantes e/ou outras informações.</p>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Google DoubleClick DART Cookie</h2>
                <p>O Google é um dos fornecedores terceirizados em nosso site. Ele também usa cookies, conhecidos como cookies DART, para veicular anúncios aos visitantes do nosso site com base na visita a cronicasdafantasia.com.br e outros sites na internet. No entanto, os visitantes podem optar por recusar o uso de cookies DART visitando a Política de Privacidade da rede de anúncios e conteúdo do Google no seguinte URL – <a href="https://policies.google.com/technologies/ads" className="text-brand-gold hover:underline">https://policies.google.com/technologies/ads</a></p>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Políticas de Privacidade de Terceiros</h2>
                <p>A Política de Privacidade do Crônicas da Fantasia não se aplica a outros anunciantes ou sites. Portanto, recomendamos que você consulte as respectivas Políticas de Privacidade desses servidores de anúncios de terceiros para obter informações mais detalhadas. Pode incluir suas práticas e instruções sobre como cancelar certas opções.</p>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Consentimento</h2>
                <p>Ao utilizar nosso site, você consente com nossa Política de Privacidade e concorda com seus Termos e Condições.</p>
                
                <p className="italic text-sm mt-10 text-gray-500">Última atualização: Dezembro de 2024.</p>
            </section>
        </div>
    );
};

export default PrivacyPage;
