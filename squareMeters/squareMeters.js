console.log("meter ratio extension loaded!");

//saves last url used in callback
let lastUrl = location.href;

//collection of listings
let listings;

//threshold below which listing is marked as "good deal"
const threshold = 250;

//target in which observer observe for mutation
const feed = document.querySelector("body");

//config for mutation observer
const config = { childList: true, subtree: true };

//callback which is executed when change in feed occurs
const callback = () => {
  //execute only when there is change in url
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    modifyDOM();
    
  }
}

//create and activate mutation observer
const observer = new MutationObserver(callback);
observer.observe(feed, config);

//modify once upon page loading as this will not be catched by observer
modifyDOM();

function modifyDOM() {

  //update listing with current feed
  listings = document.querySelectorAll("article");

  //iterate through all listings and add ratio value for each
  //here the first listing is skipped as it is updated and not replaced, thus modifications are not reset and adds up
  for (listing of listings) {
    modifyListing(listing);
  }

}

function modifyListing(listing) {

  console.log(listing);

  //div where needed for calculation values exists
  const dataDiv = listing.children[3].children[2];

  //because the first listings is updated and not replaced, the previous modification will not be removed
  if(dataDiv.children.length === 3) {
    dataDiv.children[0].remove();
  }

  //check if there is atleast two values, otherwise it is not possible to calculate the value
  if (dataDiv.children.length === 2) {

    //extract kr and m2 value from listing
    const m2 = extractNumber(dataDiv.children[0].innerText);
    const kr = extractNumber(dataDiv.children[1].innerText);

    const krPerM2 = calculate(m2,kr);

    //if calculated ratio value is below value, mark listing
    if(krPerM2 < threshold) {
      dataDiv.setAttribute("style","color: #d5840b;");
    } else {
      dataDiv.removeAttribute("style"); //safe as removeAttribute does not return error if attribute is not found
    }

    //create new span element in which calculated value will be shown
    const dataSpan = document.createElement("span");
      dataSpan.append(krPerM2 + " kr/m²");

    //append new span element to listing
    dataDiv.append(dataSpan);
  }

}


//function that extract int from a string
function extractNumber(string) {
  string = string.replace ( /[^\d.]/g, '' );
  return parseInt(string);
}


//calculating price per square meter
function calculate(m2, kr) {
  return Math.floor(kr/m2);
}