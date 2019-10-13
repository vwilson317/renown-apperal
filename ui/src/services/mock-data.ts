import jsonBlob from './findResponseMock';
import { getItemDetails } from '../services/api-da';
import { FindItemsIneBayStoresResponse } from '../dto/findResponse';
import { ShoppingResponse } from '@/dto/shoppingResponse';

export interface IListing {
    Name: string;
    ImageUrls: string[];
    Price: string;
    id?: number;
}

export const GetListing = async (): Promise<IListing[]> => {
    // var jsonResponseObj = jsonResponseObj;//JSON.parse(jsonBlob);
    const responseData: FindItemsIneBayStoresResponse = jsonBlob.findItemsIneBayStoresResponse[0];
    const items = responseData!.searchResult[0]!.item;

    const constItemIds = items.map((element: any) =>  {
        return element.itemId;
    });
    const itemDetails = await getItemDetails(constItemIds.join());

    let itemDetailsRepsonse = itemDetails.data as ShoppingResponse;

    const itemsFromApi = itemDetailsRepsonse.Item.map((x: any) => {
        return{
            Name: x.Title,
            ImageUrls: x.PictureURL,
            id: x.ItemID,
            Price: x.ConvertedCurrentPrice.Value,
        };
    });

    return Promise.resolve(itemsFromApi);
};
