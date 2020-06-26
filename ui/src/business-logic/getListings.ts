import { getListingItemsByStore, getItemDetails, getCartStatus } from '../services/apiDataAccess';
import { FindItemsIneBayStoresResponse, Item } from '../dto/findResponse';
import { ShoppingResponse } from '@/dto/shoppingResponse';

export interface IListing {
    Name: string;
    ImageUrls: string[];
    Price: string;
    id?: number;
    isInCart: boolean;
}

export const GetListings = async (pageNum: number, keyWords?: string): Promise<IListing[]> => {
    const response = await getListingItemsByStore(pageNum, keyWords);
    const responseData = response.data.findItemsIneBayStoresResponse[0];
    const items = responseData!.searchResult[0]!.item;
    const itemIds: string[] = items.map((element: any) => {
        return element.itemId;
    });

    let availableItemCount = 0;
    let i = 0;
    const itemDetails: ShoppingResponse[] = [];
    do {
        i++;
        if (itemIds.length < 20) {
            availableItemCount = itemIds.length;
        } else {
            availableItemCount = 20;
        }
        const subArray: string[] = itemIds.splice(1, availableItemCount);
        const data = await getItemDetails(subArray).catch((e) => {
            console.log(e);
        });
        if(data !== "")
            itemDetails.push(data as ShoppingResponse);
    } while (i * 20 < process.env.VUE_APP_PAGE_SIZE);

    const returnResult: IListing[] = [];
    if(itemDetails.length > 0){
        itemDetails.forEach((x: ShoppingResponse) => {
            const listings = MapListing(x);
            returnResult.push(...listings);
        });
    }
    else{
        //getMutipleItems api call is down for some reason
        let listings = items.map((x: any): IListing => {
            return {
                Name: x.title[0],
                ImageUrls: ['https://cdn.shopify.com/s/files/1/0273/5387/4537/products/594b26735d8cdc1e6099f4d0-original_1024x1024.jpg?v=1570681462'],
                id: x.itemId[0],
                Price: 'N/A',
                isInCart: false
            }
        })
        returnResult.push(...listings);
    }

    return returnResult;
};

function MapListing(shoppingResponse: ShoppingResponse): IListing[] {
    let listings: IListing[] = [];
    try {
        if(shoppingResponse.Item.length !== 0)
        {
            listings = shoppingResponse.Item.map((x: any): IListing => {
                const listing = {
                    Name: x.Title,
                    ImageUrls: x.PictureURL,
                    id: x.ItemID,
                    Price: x.ConvertedCurrentPrice.Value,
                } as IListing;
    
                getCartStatus(x.ItemID).then((data) => listing.isInCart = data);
    
                return listing;
            });
        }
        
    } catch (e) {
        console.error(e);
    }

    return listings;
}

export const GetListing = async (id: string): Promise<IListing> => {
    const itemDetail = await getItemDetails([id]);
    const casted = itemDetail as ShoppingResponse;
    try {
        const data = MapListing(casted);
        return data[0];
    } catch (e) {
        console.log(e);
    }

    return {} as IListing;
};
