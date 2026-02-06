import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.cronicasdafantasia.com.br';
const PAGES = [
    '',
    '/books',
    '/about',
    '/blog',
    '/privacy',
    '/terms'
];

const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${PAGES.map(page => `
    <url>
        <loc>${BASE_URL}${page}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${page === '' || page === '/books' ? 'daily' : 'monthly'}</changefreq>
        <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
    `).join('')}
</urlset>`;

    const publicDir = path.resolve(__dirname, '../public');

    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap gerado com sucesso em public/sitemap.xml');
};

generateSitemap();
