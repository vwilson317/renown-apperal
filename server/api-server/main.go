package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	linq "github.com/ahmetb/go-linq"
	elasticsearch "github.com/elastic/go-elasticsearch/v8"
	esutil "github.com/elastic/go-elasticsearch/v8/esutil"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

type FindingReponse struct {
	FindItemsIneBayStoresResponse []struct {
		Ack          []string    `json:"ack"`
		Version      []string    `json:"version"`
		Timestamp    []time.Time `json:"timestamp"`
		SearchResult []struct {
			Count string `json:"@count"`
			Item  []Item `json:"item"`
		} `json:"searchResult"`
		PaginationOutput []struct {
			PageNumber     []string `json:"pageNumber"`
			EntriesPerPage []string `json:"entriesPerPage"`
			TotalPages     []string `json:"totalPages"`
			TotalEntries   []string `json:"totalEntries"`
		} `json:"paginationOutput"`
		ItemSearchURL []string `json:"itemSearchURL"`
	} `json:"findItemsIneBayStoresResponse"`
}

type bulkResponse struct {
	Errors bool `json:"errors"`
	Items  []struct {
		Index struct {
			ID     string `json:"_id"`
			Result string `json:"result"`
			Status int    `json:"status"`
			Error  struct {
				Type   string `json:"type"`
				Reason string `json:"reason"`
				Cause  struct {
					Type   string `json:"type"`
					Reason string `json:"reason"`
				} `json:"caused_by"`
			} `json:"error"`
		} `json:"index"`
	} `json:"items"`
}

type Item struct {
	ItemID          []string `json:"itemId"`
	Title           []string `json:"title"`
	GlobalID        []string `json:"globalId"`
	PrimaryCategory []struct {
		CategoryID   []string `json:"categoryId"`
		CategoryName []string `json:"categoryName"`
	} `json:"primaryCategory"`
	GalleryURL    []string `json:"galleryURL"`
	ViewItemURL   []string `json:"viewItemURL"`
	PaymentMethod []string `json:"paymentMethod"`
	AutoPay       []string `json:"autoPay"`
	PostalCode    []string `json:"postalCode"`
	Location      []string `json:"location"`
	Country       []string `json:"country"`
	ShippingInfo  []struct {
		ShippingServiceCost []struct {
			CurrencyID string `json:"@currencyId"`
			Value      string `json:"__value__"`
		} `json:"shippingServiceCost"`
		ShippingType            []string `json:"shippingType"`
		ShipToLocations         []string `json:"shipToLocations"`
		ExpeditedShipping       []string `json:"expeditedShipping"`
		OneDayShippingAvailable []string `json:"oneDayShippingAvailable"`
		HandlingTime            []string `json:"handlingTime"`
	} `json:"shippingInfo"`
	SellingStatus []struct {
		CurrentPrice []struct {
			CurrencyID string `json:"@currencyId"`
			Value      string `json:"__value__"`
		} `json:"currentPrice"`
		ConvertedCurrentPrice []struct {
			CurrencyID string `json:"@currencyId"`
			Value      string `json:"__value__"`
		} `json:"convertedCurrentPrice"`
		SellingState []string `json:"sellingState"`
		TimeLeft     []string `json:"timeLeft"`
	} `json:"sellingStatus"`
	ListingInfo []struct {
		BestOfferEnabled  []string    `json:"bestOfferEnabled"`
		BuyItNowAvailable []string    `json:"buyItNowAvailable"`
		StartTime         []time.Time `json:"startTime"`
		EndTime           []time.Time `json:"endTime"`
		ListingType       []string    `json:"listingType"`
		Gift              []string    `json:"gift"`
		WatchCount        []string    `json:"watchCount"`
	} `json:"listingInfo"`
	ReturnsAccepted []string `json:"returnsAccepted"`
	Condition       []struct {
		ConditionID          []string `json:"conditionId"`
		ConditionDisplayName []string `json:"conditionDisplayName"`
	} `json:"condition"`
	IsMultiVariationListing []string `json:"isMultiVariationListing"`
	TopRatedListing         []string `json:"topRatedListing"`
}

func findingHandler(c *gin.Context) {
	pageNum := c.DefaultQuery("pageNum", "1")
	pageSize := c.DefaultQuery("pageSize", "20")
	keywords := c.DefaultQuery("keywords", "")

	parsedSized, _ := strconv.Atoi(pageSize)
	var responseData = getData(keywords, parsedSized, pageNum)
	c.String(http.StatusOK, string(responseData))
}

func healthHandler(c *gin.Context) {
	c.Status(http.StatusOK)
}

func listingPostHandler(c *gin.Context) {
	key := c.DefaultQuery("itemId", "")
	isInCart := c.DefaultQuery("isInCart", "true")
	parsed, _ := strconv.ParseBool(isInCart)
	err := client.Set(key, parsed, time.Hour).Err()
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
	} else {
		c.Status(http.StatusCreated)
	}
}

// func shopHandler(c *gin.Context) {
// 	type queryHolder struct {
// 		Ids []string `form:"ids[]" binding:"required"`
// 	}
// 	var qholder queryHolder
// 	if err := c.ShouldBindQuery(&qholder); err != nil {
// 		c.AbortWithStatus(http.StatusBadRequest)
// 		return
// 	}
// 	log.Printf("%+v\n", qholder)

// 	var queryStr = "http://open.api.ebay.com/shopping?version=1099&appid=VincentW-renownap-PRD-0b31f104d-07a63429&responseencoding=JSON&callname=GetMultipleItems&ItemId=124150163896,124229824881,124210081637,124075792524,124210081439,124213947485,124210081529,124229824975,124229824984,124229824779,124206054067,124229824899,124084970319,124189357278,124224494536,124189357410,124224494550,124203491168,124215667117,124229824915"
// 	idsStr := strings.Join(qholder.Ids, ",")
// 	response, _ := http.Get(queryStr + idsStr)
// 	data, _ := ioutil.ReadAll(response.Body)
// 	c.String(http.StatusOK, string(data))
// }

func listingGetHandler(c *gin.Context) {
	key := c.DefaultQuery("itemId", "")
	value, err := client.Get(key).Result()
	if err != nil && err.Error() != "redis: nil" {
		c.String(http.StatusInternalServerError, err.Error())
	} else {
		var boolVal = value == "1"
		c.String(http.StatusOK, strconv.FormatBool(boolVal))
	}
}

func getData(keywords string, pageSize int, pageNum string) []byte {
	pageSizeStr := strconv.Itoa(pageSize)
	var queryStr = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsIneBayStores&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=VincentW-renownap-PRD-0b31f104d-07a63429&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&paginationInput.entriesPerPage=" + pageSizeStr + "&paginationInput.pageNumber=" + pageNum + "&storeName=imyown"
	queryStr += "&keywords=" + keywords
	var data []byte
	response, err := http.Get(queryStr)
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ = ioutil.ReadAll(response.Body)
	}

	return data
}

func popHandler(c *gin.Context) {
	pageSize := 100
	var (
		// b             []byte
		stringBuilder strings.Builder
		// jsonData      string
		responseObjs []FindingReponse
		totalPages   int = 1
	)

	for i := 1; i <= totalPages; i++ {
		pageNum := strconv.Itoa(i)
		var responseByteArray = getData("", pageSize, pageNum)
		stringBuilder.Grow(len(responseByteArray))
		stringBuilder.Write(responseByteArray)

		responseObj := FindingReponse{}
		err := json.Unmarshal(responseByteArray, &responseObj)
		if err != nil {
			fmt.Println("error:", err)
		}
		responseObjs = append(responseObjs, responseObj)
		totalPages, _ = strconv.Atoi(responseObj.FindItemsIneBayStoresResponse[0].PaginationOutput[0].TotalPages[0])
	}

	res, err := esClient.Indices.Delete([]string{indexName}, esClient.Indices.Delete.WithIgnoreUnavailable(true))
	if err != nil || res.IsError() {
		log.Fatalf("Cannot delete index: %s", err)
	}
	res.Body.Close()

	res, err = esClient.Indices.Create(indexName)
	if err != nil {
		fmt.Printf("Cannot create index: %s", err)
	}
	if res.IsError() {
		fmt.Printf("Cannot create index: %s", res)
	}

	addToEs(responseObjs, c)

	c.Status(http.StatusOK)
}

func addToEs(response []FindingReponse, c *gin.Context) {
	items := []Item{}
	linq.From(response).SelectManyT(
		func(x FindingReponse) linq.Query {
			return linq.From(x.FindItemsIneBayStoresResponse[0].SearchResult[0].Item)
		}).ToSlice(&items)

	bi, err := esutil.NewBulkIndexer(esutil.BulkIndexerConfig{
		Index:      indexName, // The default index name
		Client:     esClient,  // The Elasticsearch client
		NumWorkers: 20,        // The number of worker goroutines
	})
	if err != nil {
		log.Fatalf("Error creating the indexer: %s", err)
	}

	fmt.Println("rec count: " + strconv.Itoa(len(items)))

	var index int
	for i, rec := range items {
		itemID := rec.ItemID[0]
		data, err := json.Marshal(rec)
		if err != nil {
			fmt.Println("Error creating the es client: %s", err)
		}

		err = bi.Add(
			context.Background(),
			esutil.BulkIndexerItem{
				// Action field configures the operation to perform (index, create, delete, update)
				Action: "index",

				// DocumentID is the (optional) document ID
				DocumentID: itemID,

				// Body is an `io.Reader` with the payload
				Body: bytes.NewReader(data),

				// OnFailure is called for each failed operation
				OnFailure: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem, err error) {
					if err != nil {
						log.Printf("ERROR: %s", err)
					} else {
						log.Printf("ERROR: %s: %s", res.Error.Type, res.Error.Reason)
					}
				},
			},
		)
		if err != nil {
			log.Fatalf("Unexpected error: %s", err)
		}

		index = i + 1 //some of the records have dup item ids for some reason
	}

	fmt.Printf("Uploaded rec count: %d", index)

	if err := bi.Close(context.Background()); err != nil {
		log.Fatalf("Unexpected error: %s", err)
	}
}

func initClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:8086",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	return client
}

func initEsClient() *elasticsearch.Client {
	es, err := elasticsearch.NewDefaultClient()
	if err != nil {
		fmt.Println("Error creating the es client: %s", err)
	}

	return es
}

var (
	client    *redis.Client
	esClient  *elasticsearch.Client
	indexName string = "listings"
)

func main() {
	fmt.Println("Starting the application...")

	router := gin.Default()

	client = initClient()
	esClient = initEsClient()

	router.GET("/api/finding", findingHandler)
	router.GET("/health", healthHandler)
	router.GET("/api/populate", popHandler)
	//router.GET("/api/shopping", shopHandler)

	router.POST("/api/listings", listingPostHandler)
	router.GET("/api/listings/cartstatus", listingGetHandler)

	router.Use(cors.Default())

	router.Run(":8083")

	fmt.Println("Terminating the application...")
}
