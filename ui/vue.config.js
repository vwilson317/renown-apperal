module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8083',
                changeOrigin: true
            },
            '/api/shopping': {
                target: 'http://open.api.ebay.com/shopping',
                changeOrigin: true
            },
            '/api/trading': {
                target: 'https://api.ebay.com/ws/api.dll',
                changeOrigin: true
            },
        }
    }
}