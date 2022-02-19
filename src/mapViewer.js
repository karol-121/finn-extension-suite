
const url = "https://www.openstreetmap.org/search?query=";   //URL with serach parameter, used to show location in this case on openstreetmap.
const address_DOM = document.getElementsByClassName("u-mb0")[0];   //HTML object that holds the address value




if (address_DOM != null) { //if element has been found, modify it (not all finn pages does have location shown i.e main page)

    const address_string = address_DOM.innerText; //getting addres string from HTML object
    const final_url = url + address_string; //modifing url by adding address to it. 

    address_DOM.innerHTML = "<a href='"+final_url+"' target='_blank'>"+address_string+"</a>" //replace location text with link to map
}




