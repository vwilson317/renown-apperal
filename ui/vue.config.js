module.exports = {
    devServer: {
        proxy: {
            'api/finding': {
                target: 'https://svcs.ebay.com/services/search/FindingService/v1',
                changeOrigin: true,
                headers: {
                    'X-EBAY-SOA-OPERATION-NAME': 'findItemsIneBayStores',
                    'X-EBAY-SOA-SERVICE-VERSION': '1.13.0' ,
                    'X-EBAY-SOA-SERVICE-NAME': 'FindingService',
                    'X-EBAY-SOA-SECURITY-APPNAME': 'VincentW-renownap-PRD-0b31f104d-07a63429',
                    'RESPONSE-DATA-FORMAT': 'JSON' , // doesn't seem to work,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                  }
            },
            'api/shopping': {
                target: 'http://open.api.ebay.com/shopping',
                changeOrigin: true,
                'X-EBAY-API-VERSION': '1099',
                'X-EBAY-API-APP-ID': 'VincentW-renownap-PRD-0b31f104d-07a63429',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
        }
    }
}