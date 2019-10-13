import jsonBlob from './findResponseMock';
import { getItemDetails } from '../services/api-da';
import { FindItemsIneBayStoresResponse } from '../dto/findResponse';

export interface IListing {
    Name: string;
    ImageUrl: string;
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
    //

    const itemsFromApi = itemDetails.data.Item.map((x: any) => {
        return{
            Name: x.Title,
            ImageUrl: x.PictureURL[0],
            id: x.ItemID,
            Price: x.ConvertedCurrentPrice.Value,
        };
    });
    return Promise.resolve(itemsFromApi);
};
