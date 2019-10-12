import axios from 'axios';

export enum Api {
    Finding,
    Shopping,
}

const findApiUrl = 'api/finding'; // "https://svcs.ebay.com/services/search/FindingService/v1";
const shoppingApiUrl = 'api/shopping'; // "http://open.api.ebay.com/shopping";
const eBayAppId = 'VincentW-renownap-PRD-0b31f104d-07a63429';

export const get = async (apiType: Api, params: string): Promise<any> => {
    // todo add ebay apis to dev server
    let config;
    let uri;

    switch (apiType) {
        case Api.Finding: { // storeName
            config = {
                // baseURL: findApiUrl,
                headers: [
                    { 'X-EBAY-SOA-OPERATION-NAME': 'findItemsIneBayStores' },
                    { 'X-EBAY-SOA-SERVICE-VERSION': '1.13.0' },
                    { 'X-EBAY-SOA-SERVICE-NAME': 'FindingService' },
                    { 'X-EBAY-SOA-SECURITY-APPNAME': eBayAppId }, //
                    { 'RESPONSE-DATA-FORMAT': 'JSON' }, // doesn't seem to work
                ],
            };
            uri = findApiUrl + '?' + params;
        }
        case Api.Shopping: { // GetMultipleItems
            config = {
                // baseURL: shoppingApiUrl,
                headers: [
                    { 'X-EBAY-API-VERSION': '1099' },
                    { 'X-EBAY-API-APP-ID': eBayAppId },
                ],
            };
            uri = shoppingApiUrl + '?' + params;
        }
            //    debugger;
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
    const paginationInput = {
        entriesPerPage: 10,
        pageNumber: 1,
    };

    const paginationInputJson = JSON.stringify(paginationInput);

    return get(Api.Finding, 'storeName=imyown&paginationInput=' + paginationInputJson);
};

export const getItemDetails = async (itemId: number): Promise<any> => {
    return get(Api.Shopping, 'callname=GetMultipleItems&ItemId=' + itemId);
};
