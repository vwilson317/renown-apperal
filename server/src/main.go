package main

import (
	// "encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

func findingHandler(c *gin.Context) {
	pageNum := c.DefaultQuery("pageNum", "1")
	response, err := http.Get("https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsIneBayStores&SERVICE-VERSION=1.13.0&SECURITY-APPNAME=VincentW-renownap-PRD-0b31f104d-07a63429&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD=&paginationInput.entriesPerPage=20&paginationInput.pageNumber=" + pageNum + "&storeName=imyown")
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(response.Body)
		c.String(http.StatusOK, string(data))
	}
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

func listingGetHandler(c *gin.Context) {
	key := c.DefaultQuery("itemId", "")
	value, err := client.Get(key).Result()
	if err != nil {
		if err.Error() == "redis: nil" {
			c.Status(http.StatusNotFound)
		} else {
			c.String(http.StatusInternalServerError, err.Error())
		}
	} else {
		var boolVal = value != "0"
		c.String(http.StatusOK, strconv.FormatBool(boolVal))
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

var client *redis.Client

func main() {
	fmt.Println("Starting the application...")

	router := gin.Default()

	client = initClient()

	router.GET("/api/finding", findingHandler)
	router.GET("/health", healthHandler)

	router.POST("/api/listings", listingPostHandler)
	router.GET("/api/listings/cartstatus", listingGetHandler)

	router.Use(cors.Default())
	router.Run(":8083")

	fmt.Println("Terminating the application...")
}
