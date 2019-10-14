import axios from 'axios';

export enum Api {
    Finding,
    Shopping,
}

const findApiUrl = 'api/finding'; 
const shoppingApiUrl = 'api/shopping'; // "http://open.api.ebay.com/shopping";
const shoppingApiVersion = 1099; // 1085 doesn't work now wtf   
const eBayAppId = 'VincentW-renownap-PRD-0b31f104d-07a63429';

export const getListingItemsByStore = async (pageNum: number): Promise<any> => {
    //todo: update to pass page
    const result = await get(Api.Finding);
    return result;
};

export const getItemDetails = async (itemIds: string): Promise<any> => {
    const result = await get(Api.Shopping, 'callname=GetMultipleItems&ItemId=' + itemIds);
    return result;
};

export const get = async (apiType: Api, params?: string): Promise<any> => {
    // todo add ebay apis to dev server

    let uri = '';
    if (apiType === Api.Finding) {// storeName
        // 'paginationInput.entriesPerPage': '20',
        // 'paginationInput.pageNumber': '1',

        return axios.get(findApiUrl);
    } else if (apiType === Api.Shopping) {
        const str = 'version=' + shoppingApiVersion + '&appid=' + eBayAppId + '&responseencoding=JSON';
        uri = shoppingApiUrl + '?' + str + '&' + params;

        return axios.get(uri);
    }
};


