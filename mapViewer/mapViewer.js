console.log("finn location lookup is loaded!"); //debug string to dobel check if extension is loading

//prototype of object that holds relation between category and reference to DOM
class AddressObject {
    constructor(category, path) {
        this.category = category;
        this.path = path;
    }
}

const targets = new Array(); //collection that holds all registered DOMs
const url = "https://www.openstreetmap.org/search?query=";   //URL with serach parameter, used to show location in this case on openstreetmap.
// const url = "https://duckduckgo.com/?iaxm=maps&q=";
const addressRegEx = /.*\d+.*/gm; //matches strings that have numbers in it


//registering all possible locations of addres for each category
targets.push(new AddressObject("car", document.getElementsByClassName("u-mh16")));
targets.push(new AddressObject("bap", document.getElementsByClassName("u-mb0"))); //torget
targets.push(new AddressObject("realestate", document.getElementsByClassName("u-mh16")));
targets.push(new AddressObject("mc", document.getElementsByClassName('u-t3')));
targets.push(new AddressObject("boat", document.getElementsByClassName('u-t3')));
targets.push(new AddressObject("job", document.getElementsByClassName('u-t3')));


const location = document.location.pathname; //gets pathname of current page
const subcategory = location.split('/')[1]; //extract category from pathname (url)

//find desired object/objects to modify
for (const DOM of targets) {
    if (DOM.category === subcategory) {

        //iterate subset of objects assigned to current category
        for (const a of DOM.path) {

            //only modify those with mathing text 
            if (a.innerText.match(addressRegEx)) {

                changeAddress(a);

            }
        }

    }
}


//function that adds link to target object
function changeAddress(Object) {

    const address_string = Object.innerText; //getting addres string from HTML object
    const final_url = url + address_string; //modifing url by adding address string to it.

    Object.innerHTML = "<a href='"+final_url+"' target='_blank'>"+address_string+" ↗</a>"; //replace location text with link to map
}




