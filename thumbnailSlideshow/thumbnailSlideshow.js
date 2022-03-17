console.log("thumbnail slideshow extension has been loaded"); //debug string to dobel check if extension is loading

const actionDelay = 700; //defines the time after which the slideshow starts showing
const actionInterval = 1000; //defines how ofter images should change in slideshow
const galleryUrl = 'https://www.finn.no/gallery.html?finnkode='; //url to gallery from which images will be fetched
const urlRegEx = /https:\/\/images\.finncdn.no\/.* [a-z0-9]*/gm; //regex that filters srcsets from page source code
const xhttp = new XMLHttpRequest(); //xhr request object

let currentListing; //holds current object that is being processed (where the slideshow should be shown) 
let currentListingID; //id of relevant listing, is needed to get images for this specific listing (current target)
let orginalListingSrcset; //holds the currents object orginal srcset, so it is possible to revert to orgnial state after "mouseout"
let modified = false; //defines if object is currently modified or not, false here means that no object needs any treatning
let imageFetchTimeout; //holds timeout object for function that will fetch images via xhr. this allows to cancel it before it happens by refering to this variable
let slideshowInterval; //holds interval object for function that will change images.


document.addEventListener("mouseover", beginSlideshow);


function beginSlideshow(event) {

    if (modified) {
        //in practice this block will only run if previous event started the "modifing process"

        clearTimeout(imageFetchTimeout);
        clearInterval(slideshowInterval);
        currentListing.parentNode.parentNode.previousSibling.firstChild.firstChild.srcset = orginalListingSrcset; //revert modifications
        modified = false; //update status
        console.log("recovered / canceled modifing process");
    }

    if (event.target.tagName === 'A' && event.target.className === 'ads__unit__link') { //filter for pages mouseovers, only listing mouseovers are alowed 
            
            //set / update global variables with current listing 
            currentListing = event.target;
            currentListingID = event.target.id;
            orginalListingSrcset = event.target.parentNode.parentNode.previousSibling.firstChild.firstChild.srcset;
            
            //start fetch of images after specified delay
            imageFetchTimeout = setTimeout(dispatchImgFetch, actionDelay);

            //update status
            modified = true;
            console.log("started modifing process");

        }

}

function dispatchImgFetch() {

    //this function should only execute if there is need for fetched images.

    console.log("dipatched img fetch")
    xhttp.open("GET", "https://www.finn.no/gallery.html?finnkode="+currentListingID, true); //todo: use the global defined url
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {

            console.log("pass fetched srcsets futher");
            //passes array with srcsets to function that will show slideshow
            startSlideshow(xhttp.responseText.match(urlRegEx));
        }
    }
}


function startSlideshow(srcsets) {

    //todo: add check if there is more than one image
    
    let i = 1;

    //instatly show the second image as the user has allerady waited for x time to see other images
    currentListing.parentNode.parentNode.previousSibling.firstChild.firstChild.srcset = srcsets[i];


    slideshowInterval = setInterval(function () {
        //show rest of the images by cycling through the provided array

        i = (i + 1) % srcsets.length;

        currentListing.parentNode.parentNode.previousSibling.firstChild.firstChild.srcset = srcsets[i];

    }, actionInterval)

}















