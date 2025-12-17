import React, { useEffect, useContext } from 'react';
import { Page } from '../App';
import { BookContext } from '../context/BookContext';

interface SEOManagerProps {
    currentPage: Page;
}

const SEOManager: React.FC<SEOManagerProps> = ({ currentPage }) => {
    const { books, releases, authorPhoto } = useContext(BookContext);

    useEffect(() => {
        // 1. Atualiza Dados Estruturados (JSON-LD)
        const updateSchema = () => {
            const baseUrl = "https://www.cronicasdafantasia.com.br";
            const schemas = [];

            // --- Schema Global (Organization/WebSite) ---
            schemas.push({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Crônicas da Fantasia",
                "url": baseUrl,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${baseUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            });

            // --- Schema de Breadcrumb (Trilha de Navegação) ---
            // O Google ama saber onde a página está na hierarquia
            schemas.push({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": baseUrl
                    },
                    ...(currentPage !== 'home' ? [{
                        "@type": "ListItem",
                        "position": 2,
                        "name": currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
                        "item": `${baseUrl}/${currentPage}`
                    }] : [])
                ]
            });

            if (currentPage === 'home') {
                 // Home pode ter Organization mais detalhada
                 schemas.push({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Ashyus Books",
                    "url": baseUrl,
                    "logo": "https://www.cronicasdafantasia.com.br/logo.png", // Idealmente uma URL real
                    "sameAs": [
                        "https://www.instagram.com/cronicasdafantasia",
                        "https://x.com/ashyusdark"
                    ]
                 });
            } 
            else if (currentPage === 'books') {
                // Schema de Lista de Livros (ItemList)
                schemas.push({
                    "@context": "https://schema.org",
                    "@type": "ItemList",
                    "name": "Livros de Ashyus",
                    "description": "Lista completa de livros de Dark Fantasy e Romance publicados por Ashyus.",
                    "itemListElement": books.map((book, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "item": {
                            "@type": "Book",
                            "name": book.title,
                            "author": {
                                "@type": "Person",
                                "name": "Ashyus"
                            },
                            "url": `${baseUrl}/books#${book.id}`,
                            "image": book.coverUrl,
                            "description": book.shortSynopsis,
                            "offers": book.amazonUrl ? {
                                "@type": "Offer",
                                "availability": "https://schema.org/InStock",
                                "url": book.amazonUrl,
                                "priceCurrency": "BRL",
                                "price": "24.90" // Preço estimado ou dinâmico se tiver
                            } : undefined
                        }
                    }))
                });
            }
            else if (currentPage === 'about') {
                // Schema do Autor (Person)
                schemas.push({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Ashyus",
                    "url": baseUrl,
                    "image": authorPhoto,
                    "jobTitle": "Autor de Fantasia",
                    "description": "Ashyus é um autor brasileiro de Dark Fantasy e Romance.",
                    "sameAs": [
                        "https://www.instagram.com/cronicasdafantasia",
                        "https://x.com/ashyusdark",
                        "https://amazon.com/author/ashyus"
                    ]
                });

                // FAQ Page Schema (Perguntas Frequentes na página Sobre)
                // Isso gera Rich Snippets na busca!
                schemas.push({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Qual a ordem de leitura dos livros do Ashyus?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Embora a maioria dos livros possa ser lida de forma independente, recomenda-se começar pela saga principal disponível na página de Livros para entender a mitologia do universo."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Onde posso comprar os livros físicos?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Atualmente, os livros estão disponíveis principalmente em formato digital (eBook) na Amazon e Kindle Unlimited. Edições físicas são anunciadas em ocasiões especiais."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "O autor é brasileiro?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Sim, Ashyus é um autor brasileiro focado no mercado de Dark Fantasy, misturando elementos da cultura local com tropos clássicos de fantasia."
                            }
                        }
                    ]
                });
            }
            else if (currentPage === 'blog') {
                // Schema de Blog (Blog) e Lançamentos
                schemas.push({
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    "name": "Lançamentos e Novidades - Ashyus Books",
                    "blogPost": [
                        ...releases.map(release => ({
                            "@type": "BlogPosting",
                            "headline": `Lançamento: ${release.title}`,
                            "image": release.imageUrl,
                            "datePublished": new Date().toISOString(), 
                            "author": { "@type": "Person", "name": "Ashyus" },
                            "description": release.description
                        })),
                        ...books.map(book => ({
                            "@type": "BlogPosting",
                            "headline": `Livro Disponível: ${book.title}`,
                            "image": book.coverUrl,
                            "datePublished": book.createdAt,
                            "author": { "@type": "Person", "name": "Ashyus" },
                            "description": book.fullSynopsis
                        }))
                    ]
                });
            }

            // Injeta o script no head (Remove anterior e cria novo para evitar duplicação)
            const scriptId = 'dynamic-json-ld';
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }
            
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify(schemas);
            document.head.appendChild(script);
        };

        // 2. Atualiza Meta Keywords dinamicamente
        const updateKeywords = () => {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                let keys = "Ashyus Books, Dark Fantasy, Romance, Livros, Fantasia Brasileira, Kindle Unlimited";
                if (currentPage === 'books') keys += `, ${books.map(b => b.title).join(', ')}`;
                if (currentPage === 'blog') keys += ", Lançamentos, Novidades, Notícias Literárias, Wattpad";
                metaKeywords.setAttribute('content', keys);
            }
        };

        updateSchema();
        updateKeywords();

    }, [currentPage, books, releases, authorPhoto]);

    return null; 
};

export default SEOManager;