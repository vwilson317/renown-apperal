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
    const itemIds : string[] = items.map((element: any) => {
        return element.itemId;
    });

    let availableItemCount = 0;
    let i = 0;
    let itemDetails: ShoppingResponse[] = [];
    do{
        i++;
        if(itemIds.length < 20){
            availableItemCount = itemIds.length;
        }
        else{
            availableItemCount = 20;
        }
        let subArray: string[] = itemIds.splice(1, availableItemCount);
        let data = await getItemDetails(subArray).catch(e => {
            console.error(e);
        });
        itemDetails.push(data as ShoppingResponse);
    } while(i * 20 < process.env.VUE_APP_PAGE_SIZE);

    let returnResult: IListing[] = []

    itemDetails.forEach((x: ShoppingResponse) => {
        let listings = MapListing(x);
        returnResult.push(...listings);
    });
    return returnResult;
};

function MapListing(shoppingResponse: ShoppingResponse): IListing[] {
    let listings: IListing[] = [];
    try{
        listings = shoppingResponse.Item.map((x: any): IListing => {
            const listing = {
                Name: x.Title,
                ImageUrls: x.PictureURL,
                id: x.ItemID,
                Price: x.ConvertedCurrentPrice.Value
            } as IListing;

            getCartStatus(x.ItemID).then(data => listing.isInCart = data);
    
            return listing;
        });
    }
    catch(e){
        console.error(e)
    }

    return listings;
}

export const GetListing = async (id: string): Promise<IListing> => {
    let itemDetail = await getItemDetails(id);
    let casted = itemDetail.data as ShoppingResponse;
    try{
        const data = await MapListing(casted);
        return data[0];
    }
    catch(e){
        console.error(e);
    }

    return {} as IListing;
}
