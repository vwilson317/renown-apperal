import axios from 'axios';

export enum Api {
    Finding,
    Shopping,
}

const findApiUrl = 'api/finding'; // "https://svcs.ebay.com/services/search/FindingService/v1";
const findApiVersion = '1.13.0';
const shoppingApiUrl = 'api/shopping'; // "http://open.api.ebay.com/shopping";
const shoppingApiVersion = 1085;
const eBayAppId = 'VincentW-renownap-PRD-0b31f104d-07a63429';

export const get = async (apiType: Api, params: string): Promise<any> => {
    // todo add ebay apis to dev server
    const config = {
        headers: [{'Access-Control-Allow-Origin': '*'}],
    };
    switch (apiType) {
        case Api.Finding : {// storeName
            const str = 'SERVICE-VERSION=' + findApiVersion + '&SECURITY-APPNAME=' + eBayAppId + '&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD';

            const uri = findApiUrl + '?' + str + '&' + params;
            const instance = axios.create(config);

            return instance.get(uri);
        }
        case Api.Shopping: {// GetMultipleItems
            const str = 'version=' + shoppingApiVersion + '&appid=' + eBayAppId + '&responseencoding=JSON';
            const uri = shoppingApiUrl + '?' + str + '&' + params;
            const instance = axios.create(config);

            return instance.get(uri);
        }
        default:
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
    const result = await get(Api.Finding, 'storeName=imyown')
    .catch((e) => {
        const error = e;
        // todo: log error
    }); // &paginationInput=' + paginationInput);
    return result;
};

export const getItemDetails = async (itemId: number): Promise<any> => {
    const result =  get(Api.Shopping, 'callname=GetMultipleItems&ItemId=' + itemId);
    return result;
};
