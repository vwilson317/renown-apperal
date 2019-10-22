import { getListingItemsByStore, getItemDetails, getCartStatus } from '../services/apiDataAccess';
import { FindItemsIneBayStoresResponse } from '../dto/findResponse';
import { ShoppingResponse } from '@/dto/shoppingResponse';

export interface IListing {
    Name: string;
    ImageUrls: string[];
    Price: string;
    id?: number;
    isInCart: boolean;
}

export const GetListing = async (pageNum: number, keyWords?: string): Promise<IListing[]> => {
    const response = await getListingItemsByStore(pageNum, keyWords);
    const responseData = response.data.findItemsIneBayStoresResponse[0];
    const items = responseData!.searchResult[0]!.item;

    const itemIds = items.map((element: any) => {
        return element.itemId;
    });
    const itemDetails = await getItemDetails(itemIds.join());

    const itemDetailsResponse = itemDetails.data as ShoppingResponse;

    const itemPromises = itemDetailsResponse.Item.map(async (x: any): Promise<IListing> => {
        return {
            Name: x.Title,
            ImageUrls: x.PictureURL,
            id: x.ItemID,
            Price: x.ConvertedCurrentPrice.Value,
            isInCart: await getCartStatus(x.ItemID),
        };
    });

    const listings = Promise.all(itemPromises);
    return listings;
};
