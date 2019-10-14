module.exports = {
    devServer: {
        proxy: {
            '^/api/finding': {
                target: 'https://svcs.ebay.com/services/search/FindingService/v1',
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