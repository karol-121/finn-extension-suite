
//wrapper that wraps array object. This allow to "overwrite/extend" the push method to include check
class ArrayWrapper {
    #array = new Array(); 

    RegisterDOM(DOMclass, DOMtag) { //method that adds element if it has given classname and tagname

        for (const elem of document.getElementsByClassName(DOMclass)) {

            if (elem.tagName === DOMtag) {

                this.#array.push(elem);

            }
        }
      
    }

    GetArray() {   //getter for array so it can be read from elsewhere
        console.log(this.#array);
        return this.#array;
    }

    
}


const url = "https://www.openstreetmap.org/search?query=";   //URL with serach parameter, used to show location in this case on openstreetmap.

const a = new ArrayWrapper();

//definitions of addres text locations for different pages, this creates a lot of false positives
a.RegisterDOM("u-mb0", "H3");   //address object for "torget" listings
a.RegisterDOM("u-mh16", "SPAN");   //address object for "bil og næring og boliger" listings
a.RegisterDOM("u-mh16", "P"); //address object for i guess some "boliger"
a.RegisterDOM("u-t3", "H2");    //address object for "båter og jobb" listings


for (const DOM of a.GetArray()) {
    const address_string = DOM.innerText; //getting addres string from HTML object
    const final_url = url + address_string; //modifing url by adding address string to it.

    DOM.innerHTML = "<a href='"+final_url+"' target='_blank'>"+address_string+"</a>"; //replace location text with link to map
}


