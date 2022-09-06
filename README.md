# Finn.no browser extension suite
Pack of browser extension made for finn.no website. Purpose of these extensions is to make Finn.no experience better. They add functionalities that I personally find lacking. 
Currently only for Firefox, support for other browsers may or may not come.

I plan on developing a "master extension" which will combine all of these extension in to one. The user then will be able to config and turn on/off each of them according to their preferences. Therefore currently none of extension below will implement user preferences as this part will be reworked. For now I focus on implementing core functionality of each extension and testing it if is viable or not. 

## 1. Finn.no - external map
![icon](/mapViewer/icons/icon-48.png)

Extension that allows for address lookup on kart.finn.no map service. It creates links to Finn maps with location of listing. It is useful when one wants to look up location on a map.

**Note:** this extension will not expose full addresses on listings that requires user to log in, it will only generate links to what is already visible for the user.

### How it works?
Adds link to Finn map with current listing location
The map opens in new tab showing results for that particular location.

![link to external map created by extension](/assets/img01-externalMap.png)

*Link to kart.finn.no where listing location will be shown on map*

![External map where created by extension link leads to](/assets/img02-externalMap.png)

*part of the kart.finn.no map where created by extension link leads to*

### Installation
Currently this extension is not signed which means you can not install it the ordinary way. This however may change soon.
In mean time you can still use or try it by installing it as local debug install. **Note that you will have to install it every time you open browser**
- [Installing extension locally](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

### Known issues
- Shows marker on incomplete addresses which can lead to confusion as pin pointing approximate location is incorrect.

### Possible future features
- Allow for user preferences, i.e set zoom distance on map, show marker, open in new tab etc.
- Allow for choosing preferable map service.

## 2. Finn.no - thumbnail slideshow (proof of concept)
![icon](/thumbnailSlideshow/icons/icon-48.png) 

Extension that implements image slideshow on listing's thumbnail. This make it possible to see listing's item from other perspectives (as long the author has provided these) directly from the front page. 

### How it works?
After hovering on given listing for x time, the thumbnail changes periodically showing all listings images in a loop. 

### Installation
*Note that this extension mostly does not work right*

Available only as local debug install, on how to do it refer to Mozilla's guide.
- [Installing extension locally](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

### Known issues
- strange behavior, it is easy to end up in situation where wrong images are substituted, original images are overwritten, endless loops etc.
- slideshow does now work on all listings, currently only for car like listings.

### Possible future features
- none for now

## Development
Extension source files with `manifest.json` file are located in their directory (`mapViewer/` for external map extension and `thumbnailSlideshow/` for thumbnail slideshow extension). On how to develop extensions refer to this guide: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


