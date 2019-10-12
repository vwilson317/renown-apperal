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
    let config = {
        headers:[{'Access-Control-Allow-Origin':'*'}]
    };
    let uri: string = '';

    debugger;
    switch (apiType) {
        case Api.Finding : {// storeName
            const str = 'SERVICE-VERSION=1.13.0&SECURITY-APPNAME=' + eBayAppId + '&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD'

            uri = findApiUrl + '?' + str + '&' +params;
            break;
        }
        case Api.Shopping: {// GetMultipleItems
            const str = 'version=' + 1099 + "&appid=" + eBayAppId + '&responseencoding=JSON'
            uri = shoppingApiUrl + '?' + str + '&' + params;
            break;
        }
    }
    debugger;
    const instance = axios.create(config);
    return instance.get(uri);

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
    const result = await get(Api.Finding, 'storeName=imyown')
    .catch(e =>{
        debugger;
        console.error(e);
    });//&paginationInput=' + paginationInput);
    return result;
};

export const getItemDetails = async (itemId: number): Promise<any> => {
    const result =  get(Api.Shopping, 'callname=GetMultipleItems&ItemId=' + itemId);
    return result;
};
