import { getListingItemsByStore, getItemDetails } from '../services/api-da';
import { FindItemsIneBayStoresResponse } from '../dto/findResponse';
import { ShoppingResponse } from '@/dto/shoppingResponse';

export interface IListing {
    Name: string;
    ImageUrls: string[];
    Price: string;
    id?: number;
}

export const GetListing = async (pageNum: number): Promise<IListing[]> => {
    var findStoreData = await getListingItemsByStore(pageNum);

    const responseData = findStoreData.findItemsIneBayStoresResponse[0];
    const items = responseData!.searchResult[0]!.item;

    const itemIds = items.map((element: any) =>  {
        return element.itemId;
    });
    const itemDetails = await getItemDetails(itemIds.join());

    let itemDetailsResponse = itemDetails.data as ShoppingResponse;

    const itemsFromApi = itemDetailsResponse.Item.map((x: any) => {
        return{
            Name: x.Title,
            ImageUrls: x.PictureURL,
            id: x.ItemID,
            Price: x.ConvertedCurrentPrice.Value,
        };
    });

    return itemsFromApi;
};
