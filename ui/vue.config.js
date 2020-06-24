module.exports = {
    devServer: {
        proxy: {
            '/api/listings': {
                target: 'http://localhost:8083',
            },
            '/api/finding': {
                target: 'http://localhost:8083',
            },
            '/api/shopping': {
                target: 'http://open.api.ebay.com/shopping',
            },
            '/api/trading': {
                target: 'https://api.ebay.com/ws/api.dll',
                changeOrigin: true
            },
        }
    }
}