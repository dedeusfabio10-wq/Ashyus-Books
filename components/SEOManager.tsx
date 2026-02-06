
import React, { useEffect, useContext } from 'react';
import { Page } from '../App';
import { BookContext } from '../context/BookContext';

interface SEOManagerProps {
    currentPage: Page;
}

const SEOManager: React.FC<SEOManagerProps> = ({ currentPage }) => {
    const { books, releases, authorPhoto } = useContext(BookContext);

    useEffect(() => {
        const baseUrl = "https://cronicasdafantasia.com.br";
        
        const updateSchema = () => {
            const schemas: any[] = [];

            // 1. Organization & Website
            schemas.push({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Ashyus Books",
                "alternateName": "Crônicas da Fantasia",
                "url": baseUrl,
                "publisher": {
                    "@type": "Organization",
                    "name": "Ashyus Books",
                    "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
                }
            });

            // 2. Author Entity (E-E-A-T)
            schemas.push({
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": `${baseUrl}/#author`,
                "name": "Ashyus",
                "url": `${baseUrl}/about`,
                "image": authorPhoto,
                "description": "Escritor brasileiro especializado em Dark Fantasy e Romance.",
                "sameAs": [
                    "https://www.instagram.com/cronicasdafantasia",
                    "https://x.com/ashyusdark",
                    "https://www.amazon.com.br/Ashyus/e/B0D6F1Z5X6"
                ]
            });

            // 3. Page Specific Logic
            if (currentPage === 'books') {
                schemas.push({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Biblioteca Ashyus Books",
                    "description": "Catálogo completo de livros de fantasia sombria e romance.",
                    "mainEntity": {
                        "@type": "ItemList",
                        "itemListElement": books.map((book, i) => ({
                            "@type": "ListItem",
                            "position": i + 1,
                            "item": {
                                "@type": "Book",
                                "name": book.title,
                                "author": { "@id": `${baseUrl}/#author` },
                                "description": book.shortSynopsis,
                                "image": book.coverUrl,
                                "publisher": "Ashyus Books",
                                "offers": {
                                    "@type": "Offer",
                                    "availability": "https://schema.org/InStock",
                                    "price": "0.00",
                                    "priceCurrency": "BRL",
                                    "url": book.amazonUrl || book.amazonEbookUrl || "https://www.amazon.com.br/s?k=ashyus"
                                }
                            }
                        }))
                    }
                });
            }

            const scriptId = 'json-ld-seo';
            let script = document.getElementById(scriptId) as HTMLScriptElement;
            if (!script) {
                script = document.createElement('script');
                script.id = scriptId;
                script.type = 'application/ld+json';
                document.head.appendChild(script);
            }
            script.text = JSON.stringify(schemas);
        };

        updateSchema();
    }, [currentPage, books, releases, authorPhoto]);

    return null;
};

export default SEOManager;
