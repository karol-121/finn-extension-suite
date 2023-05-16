//object for "square meter" extension component
const square_meters = {
  __proto__: component_prototype,
  name: "Kvadrat meter",
  desc: "Beregner pris per kvadrat meter for alle til leie anonneser. Gode tilbud (verdi under 250kr/m²) er markert med gul skrift.",
  matches: /\/realestate\/lettings\/search\.html.*/gm, 
  greedy: true,

  prefs: {
    active: true,
    threshold: 250
  },

  apply() {
    let listings;

    //obtain list of currently visible listings
    listings = document.querySelector('main').children[2].children[1].children[0].children[2].children; 

    //check if list of listings is actually obtained, if not use alternative path
    //this is necessary as the path to relevant DOM object does change upon i.e adding filters (selected filters are prepended to the page which changes the DOM tree)
    if (listings.length < 1) {
      listings = document.querySelector('main').children[2].children[1].children[0].children[3].children;
    }

    //iterate through all listings and add ratio value for each
    for (listing of listings) {
      this.modifyListing(listing);
    }
  },

  modifyListing(listing) {

    //the first listing is different from the rest
    //therefore handle it accordingly
    if (listing.tagName === "ARTICLE") {
      this.modifyContent(listing.children[3].children[2]);
      return;
    }

    //check if listing has desired amount of children / expected DOM tree
    //this way we can assume that we are dealing with the right object
    //and avoid "undefined" exception when we actually want to access specified object

    //check target's child count
    if (listing.childElementCount < 4) {
      return;
    }

    //check target's child child count
    if (listing.children[4].childElementCount < 3) {
      return;
    }

    //at this point we know that desired object does actually exist so we can safety access it
    //note that we still does not know if it is the right object, we can only assume it
    this.modifyContent(listing.children[4].children[3]);
    
  },

  modifyContent(target) {

    //check if there is two values, otherwise is not possible to calculate the value
    //this does also further convince us that we are dealing with expected object
    if (target.children.length === 2) {

      //extract kr and m2 value from listing
      const m2 = this.extractNumber(target.children[0].innerText);
      const kr = this.extractNumber(target.children[1].innerText);

      const krPerM2 = this.calculate(m2,kr);

      //if calculated ratio value is below value, mark listing
      if (krPerM2 < this.prefs.threshold) {
        target.setAttribute("style","color: #d5840b;");
      } else {
        target.removeAttribute("style"); //safe as removeAttribute does not return error if attribute is not found
      }

      //create new span element in which calculated value will be shown
      const dataSpan = document.createElement("span");
        dataSpan.append(krPerM2 + " kr/m²");

      //append new span element to listing
      target.append(dataSpan);
    }

  },

  //function that extract int from a string
  extractNumber(string) {
    string = string.replace ( /[^\d.]/g, '' );
    return parseInt(string);
  },

  //calculating price per square meter
  calculate(m2, kr) {
    return Math.floor(kr/m2);
  }
}