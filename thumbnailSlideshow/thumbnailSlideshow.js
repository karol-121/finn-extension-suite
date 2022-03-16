console.log("thumbnail slideshow extension has been loaded"); //debug string to dobel check if extension is loading

const actionDelay = 1500; //defines the time after which the slideshow starts showing
const galleryUrl = 'https://www.finn.no/gallery.html?finnkode='; //url to gallery from which images will be fetched
const xhttp = new XMLHttpRequest(); //xhr request object

let currentListing; //holds current object that is being processed (where the slideshow should be shown) 
let currentListingID; //id of relevant listing, is needed to get images for this specific listing (current target)
let orginalListingSrcset; //holds the currents object orginal srcset, so it is possible to revert to orgnial state after "mouseout"
let modified = false; //defines if object is currently modified or not, false here means that no object needs any treatning
let imageFetchTimeout; //holds timeout for function that will fetch images via xhr. this allows to cancel it before it happens by refering to this variable

const dummyImgUrl = 'https://images.finncdn.no/dynamic/480w/2022/3/vertical-0/16/4/251/444/864_1099160377.jpg'; //for tests


document.addEventListener("mouseover", beginSlideshow);


function beginSlideshow(event) {

    if (modified) {
        //in practice this block will only run if previous event started the "modifing process"

        clearTimeout(imageFetchTimeout);
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
    xhttp.open("GET", "https://www.finn.no/gallery.html?finnkode="+currentListingID, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {

            //returns string that contains links to images
            console.log(xhttp.responseText);

            //update thumbnail with dummy img for now
            currentListing.parentNode.parentNode.previousSibling.firstChild.firstChild.srcset = dummyImgUrl;


        }
    }
}














