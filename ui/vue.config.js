module.exports = {
    devServer: {
        proxy: {
            '^/api/finding': {
                target: 'https://svcs.ebay.com/services/search/FindingService/v1',
                changeOrigin: true,
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, X-Auth-Token',
                    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE'
                }
            },
            '^/api/shopping': {
                target: 'http://open.api.ebay.com/shopping',
                changeOrigin: true
            }
        }
    }
}