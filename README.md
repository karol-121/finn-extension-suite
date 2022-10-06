# Funn - browser extension for finn.no
Funn is a browser extension that provides extra features for finn.no website. The purpose of this extension is to make Finn.no experience better. This extension can be seen as an master extension that inclueds smaller extensions (called modules) which are described in detail below. Each module can be turn on/off in the master extension meaning that everone can choose which one to run.

This extension is currently under development which means that it may not work as intended. List of features is also subject of change at this moment.

Currently only for Firefox, support for other browsers may or may not come.

## Modules
### 1. Finn.no - external map
Extension that allows for address lookup on kart.finn.no map service. It creates links to Finn maps with location of listing. It is useful when one wants to look up location on a map.

**Note:** this extension will not expose full addresses on listings that requires user to log in, it will only generate links to what is already visible for the user.

Adds link to Finn map with current listing location
The map opens in new tab showing results for that particular location.

![link to external map created by extension](/assets/img01-externalMap.png)

*Link to kart.finn.no where listing location will be shown on map*

![External map where created by extension link leads to](/assets/img02-externalMap.png)

*part of the kart.finn.no map where created by extension link leads to*


### 2. Finn.no - to the top
Extension that adds "to the top" button across whole webpage. This button allow to quickly scroll to the top of the page.

Simply a button in the right bottom corner is added. When it is pressed, the page automatically scrolls to the top.

!["to the top" button](/assets/img01-toTheTop.png)

*"to the top" button that is displayed in right bottom corner*

### 3. Finn.no - square meters
Extension that add price per square meter to house rent listings. In addition listings that have price per square meter below given threshold, will be marked. This way one can quickly spot a "good deal".

Extension adds price per square meter value next to price and amount of square meters on house rent listings. Value is calculated from given price and square meters count. The calculated value is approximate. In addition listings where price per square meter is below predetermined value are marked. This is so one can spot a "good deal" easier.

![price per square meter value displayed in listing tile](/assets/img01-squareMeters.png)

*Price per square meter value displayed in listing tile*

![listing marked as "good deal" by coloring values](/assets/img02-squareMeters.png)

*listing marked as "good deal" by coloring values to gold*

### 4. Finn.no - thumbnail slideshow (proof of concept)
Extension that implements image slideshow on listing's thumbnail. This make it possible to see listing's item from other perspectives (as long the author has provided these) directly from the front page. 

After hovering on given listing for x time, the thumbnail changes periodically showing all listings images in a loop. 

![listing images are shown as slideshow upon mouse hover](/assets/img01-thumbnailSlideshow.gif)

*listing images are shown as slideshow upon mouse hover*

## Installation
Extension is currently below version 1.0 which means it will not be published yet. For now it does lack basic functionality and I don't feel like it is ready for publishing. This means that this extension is not signed and therefore you can not install it in the ordinary way.
In mean time you can still use or try it by installing it as local debug install. **Note that you will have to install it every time you open browser**
- [Installing extension locally](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

**Note** that you can either install the master extension (funn) which includes all of the modules (except thumbnail slideshow) or each module individually. Manifest file (used for local install) for funn extension is located in the `/funn/` directory. Manifest file for invidual modules are located under `/standalone/{module-name}/` directory. 

In the future I plan only on publishing and developing the master extension (funn) which means that the standalone modules will not be accessible outside of local installation.

## Development
Extension source files with `manifest.json` file are located in `/funn/` directory for funn extension and `/standalone/{module-name}` for individual modules. On how to develop extensions refer to this guide: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension

## Known issues
- See issues on this repo

## Possible future features
- See issues on this repo




