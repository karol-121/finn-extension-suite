console.log("finn location lookup is loaded!"); //debug string to dobel check if extension is loading

//assigns array of objects where address may be to subcategory
class TargetElements {
    constructor(category, elements) {
        this.category = category;
        this.elements = elements;
    }
}

const targets = new Array(); 
const storageItem = browser.storage.local.get('prefered_url');
const regex = /(^[\d ]+kr$)|(^[a-zøæåA-ZØÆÅ ]+$)|((reklamasjonsrett.)$)/ //regex that match NOT addresses

//function that asynchronusly gets items from extension local storage
function getPreferedUrl() {
  return storageItem.then(sucess, failure);
}

//get user preferenced url in case of sucessfull async call
function sucess(item) {
  return item.prefered_url.active
}

//use default url in case of falied async call
function failure(item) {
  console.error(item);
  return "https://www.openstreetmap.org/search?query=";
}

//registering all possible locations of address for each category
targets.push(new TargetElements("car", document.getElementsByClassName("u-mh16")));
targets.push(new TargetElements("bap", document.getElementsByClassName("u-mb0"))); //torget
targets.push(new TargetElements("realestate", document.getElementsByClassName("u-mh16")));
targets.push(new TargetElements("mc", document.getElementsByClassName('u-t3')));
targets.push(new TargetElements("boat", document.getElementsByClassName('u-t3')));
targets.push(new TargetElements("job", document.getElementsByClassName('u-t3')));


const location = document.location.pathname; //gets pathname of current page
const subcategory = location.split('/')[1]; //extract category from pathname (url)

//find targets from array for current category
const target = targets.find((element) => element.category === subcategory);

//iterate through all elements where addres may be for given subcategory
for (const element of target.elements) {

    if (!element.innerText.match(regex)) {

        changeAddress(element);

    }

}

//function that adds address link to external map
async function changeAddress(Object) {

    //waits for the asynchronus call that returns elements from local extension storage, 
    //this is where user preferences are saved
    //if it fails, default url will be used
    const url = await getPreferedUrl();

    const address_string = Object.innerText; //getting addres string from HTML object
    const final_url = url + address_string; //modifing url by adding address string to it.

    //create link object
    const link = document.createElement("a");
        link.setAttribute("href", final_url);
        link.setAttribute("target", "_blank");
        link.append(address_string);
    
    Object.replaceChild(link, Object.childNodes[0]); //replace text with link

}




