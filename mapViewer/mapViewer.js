console.log("finn location lookup is loaded!"); //debug string to dobel check if extension is loading

//assigns array of objects where address may be to subcategory
class TargetElements {
    constructor(category, elements) {
        this.category = category;
        this.elements = elements;
    }
}

const targets = new Array(); 
const url = "https://www.openstreetmap.org/search?query=";   //URL with serach parameter, used to show location in this case on openstreetmap.
const regex = /(^[\d ]+kr$)|(^[a-zøæåA-ZØÆÅ ]+$)|((reklamasjonsrett.)$)/ //regex that match NOT addresses


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
function changeAddress(Object) {

    const address_string = Object.innerText; //getting addres string from HTML object
    const final_url = url + address_string; //modifing url by adding address string to it.

    //create link object
    const link = document.createElement("a");
        link.setAttribute("href", final_url);
        link.setAttribute("target", "_blank");
        link.append(address_string);
    
    Object.replaceChild(link, Object.childNodes[0]); //replace text with link

}




