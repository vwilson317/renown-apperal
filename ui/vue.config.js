module.exports = {
    devServer: {
        proxy: {
            '^/api/finding': {
                target: 'http://localhost:8083/api/finding',
                changeOrigin: true
            },
            '^/api/shopping': {
                target: 'http://open.api.ebay.com/shopping',
                changeOrigin: true
            },
            '^/api/trading': {
                target: 'https://api.ebay.com/ws/api.dll',
                changeOrigin: true
            },
        }
    }
}