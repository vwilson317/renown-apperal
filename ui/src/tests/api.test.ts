import { GetListing } from '../business-logic/getListings';

test('basic', async () => {
   const val = await GetListing('1');
   expect(val).not.toBeNull();
});
