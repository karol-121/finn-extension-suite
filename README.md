# Finn.no browser extension suite
Pack of browser extension made for finn.no website. Purpose of these extensions is to make finn experience better. They add functionalites that I personally find lacking. 
Currently only for firefox, support for other browsers may or may not come.

## 1. Finn.no - external map
![icon](/mapViewer/icons/icon-48.png)
Extension that adds support for third party map services. It provides address links to external map services, currently OpenStreetMap. It is usefull when one wants to quickly look up location on a map without having to use finn's own maps.

Note: this extension will not expose full addresses on listings that requires user to log in, it will only generate links to what is allready visible for user. (which is all I wanted)

### How it works?
Adds link to an external map service in place where address usually is listed.
The external map opens in new tab showing results for that particular location.

### Installation
*coming soon*

### Known issues
- There is possibility for false positives, some non-address text can recieve clickable links
- Some sections may not have links generated.
- OpenStreetMap does not mark locations, only show area of first result

### Possible future features
- Allow for choosing prefeable map service.
- Fix for OpenStreetMap, see issues

## 2. Finn.no - thumbnail slideshow (proof of concept)
![icon](/thumbnailSlideshow/icons/icon-48.png) 
Extension that implements image slideshow on listing's thumbnail. This make it possible to see listing's item from other perspectives (as long the author has provided these) directly from the frontpage. 

### How it works?
After hovering on given listing for x time, the thumbnail changes periodicaly showing all listings images in a loop. 

### Installation
*Note that this extension mostly does not work right*

Avaiable only as local debug install, how to do it refer to mozilla's guide.
- [Installing extension locally](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

### Known issues
- strange behaviour, it is easy to end up in situation where wrong images are substituted, orginal images are overwritten, endless loops etc.
- slideshow does now work on all listings, currently only for car like listings.

### Possible future features
- none for now

## Development
Extension soruce files with `manifest.json` file are located in their directory (`mapViewer/` for external map extension and `thumbnailSlideshow/` for thumbnail slideshow extension). On how to develop extensions refer to this guide: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


