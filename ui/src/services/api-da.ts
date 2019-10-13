import axios from 'axios';

export enum Api {
    Finding,
    Shopping,
}

// const findApiUrl = 'api/finding'; // "https://svcs.ebay.com/services/search/FindingService/v1";
const findApiUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';
const findApiVersion = '1.13.0';
const shoppingApiUrl = 'api/shopping'; // "http://open.api.ebay.com/shopping";
const shoppingApiVersion = 1099; // 1085 doesn't work now wtf   
const eBayAppId = 'VincentW-renownap-PRD-0b31f104d-07a63429';

export const get = async (apiType: Api, params?: string): Promise<any> => {
    // todo add ebay apis to dev server
    const config = {
        headers: [
            { 'Access-Control-Allow-Origin': '*' },
            { 'Access-Control-Allow-Headers': 'X-Requested-With, Origin, Content-Type, X-Auth-Token' },
            { 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE' },
        ],
    };
    let uri = '';
    if (apiType === Api.Finding) {// storeName
        const params = {
            'OPERATION-NAME': 'findItemsIneBayStores',
            'SERVICE-VERSION': findApiVersion,
            'SECURITY-APPNAME': eBayAppId,
            // 'GLOBAL-ID': 'EBAY-US',
            'RESPONSE-DATA-FORMAT': 'JSON',
            'callback': '_cb_findItemsIneBayStores',
            'REST-PAYLOAD': '',
            // keywords: 'harry%20potter',
            'paginationInput.entriesPerPage': '3',
            'storeName' : 'imyown',
          };

        const instance = axios.create(config);
        return instance.get(findApiUrl, {params});
    } else if (apiType === Api.Shopping) {
        const str = 'version=' + shoppingApiVersion + '&appid=' + eBayAppId + '&responseencoding=JSON';
        uri = shoppingApiUrl + '?' + str + '&' + params;

        const instance = axios.create(config);
        return instance.get(uri);
    }


};

enum sortOrder {
    BidCountFewest,
    BidCountMost,
    BestMatch,
    CurrentPriceHighest,
    EndTimeSoonest,
    PricePlusShippingHighest,
    PricePlusShippingLowest,
    StartTimeNewest,
    WatchCountDecreaseSort,
}

export const getStoreItems = async (): Promise<any> => {
    // const paginationInput = {
    //     entriesPerPage: 10,
    //     pageNumber: 1,
    // };

    // const paginationInputJson = JSON.stringify(paginationInput);
    const result = await get(Api.Finding)
        .catch((e: any) => {
            const error = e;
            // todo: log error
        }); // &paginationInput=' + paginationInput);
    return result;
};

export const getItemDetails = async (itemIds: string): Promise<any> => {
    const result = get(Api.Shopping, 'callname=GetMultipleItems&ItemId=' + itemIds);
    return result;
};
