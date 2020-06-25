# Overview
This is a custom ecommerce site written in vuejs (frontend), goland (api), redis and elastic search (db). Inventory items are sourced from ebay via their [api](https://developer.ebay.com/docs)

# Dev Setup
## Prerequisite
* VsCode **RECOMMEND**
* [chocolatey](https://chocolatey.org/install) (windows package manager) **NICE TO HAVE**
* [docker](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [nodejs](https://nodejs.org/en/download/)

## Local Environment
1. pull [dev branch](https://github.com/vwilson317/renown-apparel/tree/develop)
2. using command line navigate to branch ui directory
    * run command `npm install`
3. navigate to server directory
    * run command `docker-compose up`
4. open two instance of visual studio code. One from the ui directory and the other from the server directory
    * from the `server` vs code instance, open the main.go file in the api-server directory then click debug from the top tool bar (this runs the api)
    * from the `ui` vs code instance, use the vs code terminal to run the command `npm run serve`

## Architecture 
![](https://app.lucidchart.com/publicSegments/view/44b229ed-92bb-487a-b40a-38a9a87d6559/image.png)