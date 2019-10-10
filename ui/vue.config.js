module.exports = {
    devServer: {
        proxy: {
            'api': {
                target: 'https://svcs.ebay.com/services/search/FindingService/v1',
                changeOrigin: true
            }
        }
    }
}