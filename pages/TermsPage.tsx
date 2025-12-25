
import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20 prose prose-invert">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 border-b border-brand-gold/30 pb-4">Termos de Uso</h1>
            
            <section className="space-y-6 text-gray-300 leading-relaxed">
                <p>Bem-vindo ao <strong>Crônicas da Fantasia</strong>. Ao acessar este site, presumimos que você aceita estes termos e condições. Não continue a usar o portal se você não concordar com todos os termos e condições declarados nesta página.</p>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Propriedade Intelectual</h2>
                <p>A menos que indicado de outra forma, Ashyus Books e/ou seus licenciadores detêm os direitos de propriedade intelectual de todo o material no Crônicas da Fantasia. Todos os direitos de propriedade intelectual são reservados. Você pode acessar isso para seu uso pessoal, sujeito às restrições definidas nestes termos e condições.</p>
                
                <p>Você não deve:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Republicar material do Crônicas da Fantasia</li>
                    <li>Vender, alugar ou sublicenciar material do Crônicas da Fantasia</li>
                    <li>Reproduzir, duplicar ou copiar material do Crônicas da Fantasia</li>
                    <li>Redistribuir conteúdo do Crônicas da Fantasia</li>
                </ul>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Isenção de Responsabilidade</h2>
                <p>Na medida máxima permitida pela lei aplicável, excluímos todas as representações, garantias e condições relativas ao nosso site e ao uso deste site. Nada nesta isenção de responsabilidade irá:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Limitar ou excluir nossa ou sua responsabilidade por morte ou danos pessoais;</li>
                    <li>Limitar ou excluir nossa ou sua responsabilidade por fraude ou deturpação fraudulenta;</li>
                    <li>Limitar qualquer uma de nossas ou suas responsabilidades de qualquer forma que não seja permitida pela lei aplicável.</li>
                </ul>

                <h2 className="text-brand-gold font-serif text-2xl mt-10">Reserva de Direitos</h2>
                <p>Reservamo-nos o direito de solicitar que você remova todos os links ou qualquer link específico para nosso site. Você concorda em remover imediatamente todos os links para nosso site mediante solicitação.</p>
                
                <p className="italic text-sm mt-10 text-gray-500">Última atualização: Dezembro de 2024.</p>
            </section>
        </div>
    );
};

export default TermsPage;
