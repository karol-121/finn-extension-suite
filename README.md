# Finn.no browser extension suite
Pack of browser extension made for finn.no website. Purpose of these extensions is to make finn experience better. They add functionalites that I personally find lacking. 
Currently only for firefox, support for other browsers may or may not come.

## Description of extensions found in this suite

### 1. Finn.no - external map
![icon](/mapViewer/icons/icon-48.png)
Extension that lets you roughly lookup listing address on finn.no without having to log in. The extension opens external map service (openstreetmap) with the aproximate location.
This is usefull when you want to see where given address is located on a map without having to log in or you don't want to use finn's own maps.

#### How it works?
Adds link to an external map service in place where aproximate addres usually is listed. 
The external map opens in new tab showing results for that particular location.

#### Known issues
- Map Links generated for job and motorcycle listings are not always correct.
- Some sections may not have links generated.

#### Possible future features
- Add pin to location on external map.
- Allow for choosing prefeable map service.

### 2. Finn.no - thumbnail slideshow
![icon](/thumbnailSlideshow/icons/icon-48.png) 
Extension that implements image slideshow on listing's thumbnail. This make it possible to see listing's item from other perspectives (as long the author has provided these) directly from the frontpage.

#### How it works?
After hovering on given listing for x time, the thumbnail changes periodicaly showing all listings images in a loop. 

#### Known issues
- slideshow does now work on all listings, currently only for car like listings.

#### Possible future features
- none for now

## Installation
*for now you cannot install extensions as I'm unable to pack and sign them.*
1. Download extension located in *release* section to the right.
2. Refer to this instruction on how to install add-ons from a file: https://support.mozilla.org/en-US/kb/find-and-install-add-ons-add-features-to-firefox

## Development
Extension soruce files with `manifest.json` file are located in their directory (`mapViewer/` for external map extension and `thumbnailSlideshow/` for thumbnail slideshow extension). On how to develop extensions refer to this guide: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension


