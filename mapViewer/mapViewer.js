console.log("finn location lookup is loaded!"); //debug string to dobel check if extension is loading

//prototype of object that holds relation between category and reference to DOM
class AddressDOM {
    constructor(category, path) {
        this.category = category;
        this.path = path;
    }
}


const addressDOMs = new Array(); //collection that holds all registered DOMs
const url = "https://www.openstreetmap.org/search?query=";   //URL with serach parameter, used to show location in this case on openstreetmap.


//registering all possible locations of addres for each category
addressDOMs.push(new AddressDOM("car", document.getElementsByClassName("u-mh16")[1]));
addressDOMs.push(new AddressDOM("bap", document.getElementsByClassName("u-mb0")[0])); //torget
addressDOMs.push(new AddressDOM("realestate", document.getElementsByClassName("u-mh16")[1]));
addressDOMs.push(new AddressDOM("mc", document.getElementsByClassName('u-t3')[3]));
addressDOMs.push(new AddressDOM("job", document.getElementsByClassName('u-t3')[3]));


const location = document.location.pathname; //gets pathname of current page
const subcategory = location.split('/')[1]; //extract category from pathname (url)

//apply address change for each element(location) that match current category
for (const DOM of addressDOMs) {
    if (DOM.category === subcategory) {
        console.log(DOM);
        changeAddress(DOM.path);
    }
}


//function that adds link to provided DOM
function changeAddress(DOM) {

    console.log(DOM.innerHTML);

    const address_string = DOM.innerText; //getting addres string from HTML object
    const final_url = url + address_string; //modifing url by adding address string to it.

    DOM.innerHTML = "<a href='"+final_url+"' target='_blank'>"+address_string+"</a>"; //replace location text with link to map
}




