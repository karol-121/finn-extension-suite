# Funn - browser extension for finn.no
Funn is a browser extension that provides extra features for finn.no website. The purpose of this extension is to make Finn.no experience better. This extension can be seen as an master extension that includes smaller extensions (called modules) which are described in detail in [module section](#modules). Each module can be turned on and off independently meaning that the user can customize its finn.no experience.
 
This extension is currently under development which means that it may not work as intended. List of features is also subject of change at this moment.

Currently only for Firefox, support for other browsers may or may not come.

## Installation
Extension is published on Firefox Browser Add-ons service (addons.mozilla.org) where it can be installed from. Link to this extension on Firefox Browser Add-ons: https://addons.mozilla.org/en/firefox/addon/funn/

In addition you also install it as local debug install. **Note that you will have to install it every time you open the browser**
- [Installing extension locally](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#installing)

**Note also** that you can either install the master extension (Funn) which includes all of the modules (except [thumbnail slideshow](#4-finnno---thumbnail-slideshow-proof-of-concept) or each module individually. Manifest file (used for local install) for Funn extension is located in the `/funn/` directory. Manifest file for individual modules are located under `/standalone/{module-name}/` directory. 

I plan only on publishing and developing the master extension (Funn) which means that the standalone modules will probably not be accessible outside of local installation.

## Usage
After installing extension, a "Funn" button will appear on top bar across all finn.no websites. Clicking on this button will lead to a settings page where user can activate and deactivate chosen modules. On default all modules are active. The [module section](#modules) describes in detail each module that are included with the extension.

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
Extension that adds "to the top" button across whole webpage. This button allows to quickly scroll to the top of the page.

Simply a button in the right bottom corner is added. When it is pressed, the page automatically scrolls to the top.

!["to the top" button](/assets/img01-toTheTop.png)

*"to the top" button that is displayed in right bottom corner*

### 3. Finn.no - square meters
Extension that add price per square meter to home rent listings. In addition listings that have price per square meter below given threshold, will be marked. Currently the threshold is set to 250kr/m² which may not be applicable for everyone, however I plan to make it a user preference.

Extension adds price per square meter value next to price and amount of square meters on house rent listings. Value is calculated from given price and square meters count. The calculated value is approximate. In addition listings where price per square meter is below predetermined value are marked.

![price per square meter value displayed in listing tile](/assets/img01-squareMeters.png)

*Price per square meter value displayed in listing tile*

![listing marked as "good deal" by coloring values](/assets/img02-squareMeters.png)

*listing marked as "good deal" by coloring values to gold*

### 4. Finn.no - thumbnail slideshow (proof of concept)
Extension that implements image slideshow on listing's thumbnail. This make it possible to see listing's item from other perspectives (as long the author has provided these) directly from the front page. 

After hovering on given listing for x time, the thumbnail changes periodically showing all listings images in a loop.

**Note** that this extension does not work properly so use it with caution. I originally developed it as functional prototype and found that this function is not so great afterwards. Therefore for now it is abandoned by me.

![listing images are shown as slideshow upon mouse hover](/assets/img01-thumbnailSlideshow.gif)

*listing images are shown as slideshow upon mouse hover*

## Development
Extension source files with `manifest.json` file are located in `/funn/` directory for funn extension and `/standalone/{module-name}` for individual modules. On how to develop extensions refer to this guide: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension

Documentation in form of wiki will come in the future, for now I'm still experimenting with the structure and therefore hasn't wrote it yet. 

## Known issues
- See issues on this repo

## Possible future features
- See issues on this repo




