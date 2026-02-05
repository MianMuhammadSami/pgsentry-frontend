export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/', '/login/'],
        },
        sitemap: 'https://pgsentry.com/sitemap.xml',
        host: 'https://pgsentry.com',
    };
}
