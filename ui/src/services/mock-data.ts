export interface IListing{
    Name: string;
    ImageUrl: string;
    Price: string;
}

export const GetListing = async (): Promise<IListing[]> => {
    return Promise.resolve([
        {
            Name: 'Mens Under Armour UA Performance Athletic Causal Dress Golf Pants Size 34 X 32',
            ImageUrl: 'https://i.ebayimg.com/thumbs/images/g/9s0AAOSwURhdmlXN/s-l225.webp',
            Price: '30.00',
        },     
        {
            Name: 'NWT Women Nike Pro Warm Running DRI FIT Training Black Tights Running Yoga Pants',
            ImageUrl: 'https://i.ebayimg.com/images/g/IUAAAOSwHGxb~v8D/s-l500.jpg',
            Price: '14.67',
        },        
        {
            Name: 'Mens Polo Ralph Lauren Blake Two Ply Cotton Oxford Golf Dress Shirt Size Large L',
            ImageUrl: 'https://i.ebayimg.com/thumbs/images/g/RLYAAOSwxZFdcYtE/s-l225.webp',
            Price: '23.89',
        },        
        {
            Name: 'Mens Under Armour UA Performance Athletic Causal Dress Golf Pants Size 34 X 32',
            ImageUrl: 'https://i.ebayimg.com/thumbs/images/g/9s0AAOSwURhdmlXN/s-l225.webp',
            Price: '9.99',
        }  
    ]);
};
