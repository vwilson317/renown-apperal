// To parse this data:
//
//   import { Convert, FindResponse } from "./file";
//
//   const findResponse = Convert.toFindResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface FindResponse {
    findItemsIneBayStoresResponse: FindItemsIneBayStoresResponse[];
}

export interface FindItemsIneBayStoresResponse {
    ack: string[];
    version: string[];
    timestamp: string[]; // todo: maybe fix this
    searchResult: SearchResult[];
    paginationOutput: PaginationOutput[];
    itemSearchURL: string[];
}

export interface PaginationOutput {
    pageNumber: string[];
    entriesPerPage: string[];
    totalPages: string[];
    totalEntries: string[];
}

export interface SearchResult {
    '@count': string;
    item: Item[];
}

export interface Item {
    itemId: string[];
    title: string[];
    globalId: GlobalID[];
    primaryCategory: PrimaryCategory[];
    galleryURL: string[];
    viewItemURL: string[];
    paymentMethod: PaymentMethod[];
    autoPay: string[];
    postalCode: string[];
    location: Location[];
    country: Country[];
    shippingInfo: ShippingInfo[];
    sellingStatus: SellingStatus[];
    listingInfo: ListingInfo[];
    returnsAccepted: string[];
    condition: Condition[];
    isMultiVariationListing: string[];
    topRatedListing: string[];
}

export interface Condition {
    conditionId: string[];
    conditionDisplayName: ConditionDisplayName[];
}

export enum ConditionDisplayName {
    NewWithTags = 'New with tags',
    PreOwned = 'Pre-owned',
}

export enum Country {
    Us = 'US',
}

export enum GlobalID {
    EbayUs = 'EBAY-US',
}

export interface ListingInfo {
    bestOfferEnabled: string[];
    buyItNowAvailable: string[];
    startTime: Date[];
    endTime: Date[];
    listingType: ListingType[];
    gift: string[];
    watchCount?: string[];
}

export enum ListingType {
    FixedPrice = 'FixedPrice',
    StoreInventory = 'StoreInventory',
}

export enum Location {
    DouglasvilleGAUSA = 'Douglasville,GA,USA',
    WinstonGAUSA = 'Winston,GA,USA',
}

export enum PaymentMethod {
    PayPal = 'PayPal',
}

export interface PrimaryCategory {
    categoryId: string[];
    categoryName: string[];
}

export interface SellingStatus {
    currentPrice: ConvertedCurrentPrice[];
    convertedCurrentPrice: ConvertedCurrentPrice[];
    sellingState: SellingState[];
    timeLeft: string[];
}

export interface ConvertedCurrentPrice {
    '@currencyId': CurrencyID;
    __value__: string;
}

export enum CurrencyID {
    Usd = 'USD',
}

export enum SellingState {
    Active = 'Active',
}

export interface ShippingInfo {
    shippingServiceCost: ConvertedCurrentPrice[];
    shippingType: ShippingType[];
    shipToLocations: ShipToLocation[];
    expeditedShipping: string[];
    oneDayShippingAvailable: string[];
    handlingTime: string[];
}

export enum ShipToLocation {
    Worldwide = 'Worldwide',
}

export enum ShippingType {
    Free = 'Free',
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toFindResponse(json: string): FindResponse {
        return cast(JSON.parse(json), r('FindResponse'));
    }

    public static findResponseToJson(value: FindResponse): string {
        return JSON.stringify(uncast(value, r('FindResponse')), null, 2);
    }
}

function invalidValue(typ: any, val: any): never {
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
    function transformPrimitive({ typ, val }: { typ: string; val: any; }): any {
        if (typeof typ === typeof val) { return val; }
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) { return val; }
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) { return invalidValue('array', val); }
        return val.map((el) => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue('Date', val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== 'object' || Array.isArray(val)) {
            return invalidValue('object', val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach((key) => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typ === 'any') { return val; }
    if (typ === null) {
        if (val === null) { return val; }
        return invalidValue(typ, val);
    }
    if (typ === false) { return invalidValue(typ, val); }
    while (typeof typ === 'object' && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) { return transformEnum(typ, val); }
    if (typeof typ === 'object') {
        return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty('arrayItems')    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty('props')         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== 'number') { return transformDate(typ, val); }
    return transformPrimitive({ typ, val });
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    FindResponse: o([
        { json: 'findItemsIneBayStoresResponse', js: 'findItemsIneBayStoresResponse', typ: a(r('FindItemsIneBayStoresResponse')) },
    ], false),
    FindItemsIneBayStoresResponse: o([
        { json: 'ack', js: 'ack', typ: a('') },
        { json: 'version', js: 'version', typ: a('') },
        { json: 'timestamp', js: 'timestamp', typ: a(Date) },
        { json: 'searchResult', js: 'searchResult', typ: a(r('SearchResult')) },
        { json: 'paginationOutput', js: 'paginationOutput', typ: a(r('PaginationOutput')) },
        { json: 'itemSearchURL', js: 'itemSearchURL', typ: a('') },
    ], false),
    PaginationOutput: o([
        { json: 'pageNumber', js: 'pageNumber', typ: a('') },
        { json: 'entriesPerPage', js: 'entriesPerPage', typ: a('') },
        { json: 'totalPages', js: 'totalPages', typ: a('') },
        { json: 'totalEntries', js: 'totalEntries', typ: a('') },
    ], false),
    SearchResult: o([
        { json: '@count', js: '@count', typ: '' },
        { json: 'item', js: 'item', typ: a(r('Item')) },
    ], false),
    Item: o([
        { json: 'itemId', js: 'itemId', typ: a('') },
        { json: 'title', js: 'title', typ: a('') },
        { json: 'globalId', js: 'globalId', typ: a(r('GlobalID')) },
        { json: 'primaryCategory', js: 'primaryCategory', typ: a(r('PrimaryCategory')) },
        { json: 'galleryURL', js: 'galleryURL', typ: a('') },
        { json: 'viewItemURL', js: 'viewItemURL', typ: a('') },
        { json: 'paymentMethod', js: 'paymentMethod', typ: a(r('PaymentMethod')) },
        { json: 'autoPay', js: 'autoPay', typ: a('') },
        { json: 'postalCode', js: 'postalCode', typ: a('') },
        { json: 'location', js: 'location', typ: a(r('Location')) },
        { json: 'country', js: 'country', typ: a(r('Country')) },
        { json: 'shippingInfo', js: 'shippingInfo', typ: a(r('ShippingInfo')) },
        { json: 'sellingStatus', js: 'sellingStatus', typ: a(r('SellingStatus')) },
        { json: 'listingInfo', js: 'listingInfo', typ: a(r('ListingInfo')) },
        { json: 'returnsAccepted', js: 'returnsAccepted', typ: a('') },
        { json: 'condition', js: 'condition', typ: a(r('Condition')) },
        { json: 'isMultiVariationListing', js: 'isMultiVariationListing', typ: a('') },
        { json: 'topRatedListing', js: 'topRatedListing', typ: a('') },
    ], false),
    Condition: o([
        { json: 'conditionId', js: 'conditionId', typ: a('') },
        { json: 'conditionDisplayName', js: 'conditionDisplayName', typ: a(r('ConditionDisplayName')) },
    ], false),
    ListingInfo: o([
        { json: 'bestOfferEnabled', js: 'bestOfferEnabled', typ: a('') },
        { json: 'buyItNowAvailable', js: 'buyItNowAvailable', typ: a('') },
        { json: 'startTime', js: 'startTime', typ: a(Date) },
        { json: 'endTime', js: 'endTime', typ: a(Date) },
        { json: 'listingType', js: 'listingType', typ: a(r('ListingType')) },
        { json: 'gift', js: 'gift', typ: a('') },
        { json: 'watchCount', js: 'watchCount', typ: u(undefined, a('')) },
    ], false),
    PrimaryCategory: o([
        { json: 'categoryId', js: 'categoryId', typ: a('') },
        { json: 'categoryName', js: 'categoryName', typ: a('') },
    ], false),
    SellingStatus: o([
        { json: 'currentPrice', js: 'currentPrice', typ: a(r('ConvertedCurrentPrice')) },
        { json: 'convertedCurrentPrice', js: 'convertedCurrentPrice', typ: a(r('ConvertedCurrentPrice')) },
        { json: 'sellingState', js: 'sellingState', typ: a(r('SellingState')) },
        { json: 'timeLeft', js: 'timeLeft', typ: a('') },
    ], false),
    ConvertedCurrentPrice: o([
        { json: '@currencyId', js: '@currencyId', typ: r('CurrencyID') },
        { json: '__value__', js: '__value__', typ: '' },
    ], false),
    ShippingInfo: o([
        { json: 'shippingServiceCost', js: 'shippingServiceCost', typ: a(r('ConvertedCurrentPrice')) },
        { json: 'shippingType', js: 'shippingType', typ: a(r('ShippingType')) },
        { json: 'shipToLocations', js: 'shipToLocations', typ: a(r('ShipToLocation')) },
        { json: 'expeditedShipping', js: 'expeditedShipping', typ: a('') },
        { json: 'oneDayShippingAvailable', js: 'oneDayShippingAvailable', typ: a('') },
        { json: 'handlingTime', js: 'handlingTime', typ: a('') },
    ], false),
    ConditionDisplayName: [
        'New with tags',
        'Pre-owned',
    ],
    Country: [
        'US',
    ],
    GlobalID: [
        'EBAY-US',
    ],
    ListingType: [
        'FixedPrice',
        'StoreInventory',
    ],
    Location: [
        'Douglasville,GA,USA',
        'Winston,GA,USA',
    ],
    PaymentMethod: [
        'PayPal',
    ],
    CurrencyID: [
        'USD',
    ],
    SellingState: [
        'Active',
    ],
    ShipToLocation: [
        'Worldwide',
    ],
    ShippingType: [
        'Free',
    ],
};
