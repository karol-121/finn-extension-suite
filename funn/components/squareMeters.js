//object for "square meter" extension component

const squareMeterComponent = {

  //component metadata
  name: "Kvadrat meter",
  desc: "Beregner pris per kvadrat meter for alle til leie anonneser. Gode pris er også markert",
  matches: /\/realestate\/lettings\/search\.html.*/gm, //defines on which url this component should be active on
  enabled: true, //defines if extension is active, component activity is defined by the end user

  //component entry point
  run() {
    console.log("meter ratio extension loaded!");
    
    //collection of listings
    let listings;

    //threshold below which listing is marked as "good deal"
    const threshold = 250;

    //update listing with current feed
    listings = document.querySelectorAll("article");

    //TODO: remove the first article from listing list as i dont have intention of applying modification to it at this moment

    //iterate through all listings and add ratio value for each
    //here the first listing is skipped as it is updated and not replaced, thus modifications are not reset and adds up
    for (listing of listings) {
      this.modifyListing(listing);
    }
  },

  modifyListing(listing, threshold) {
    //div where needed for calculation values exists
    const dataDiv = listing.children[3].children[3];

    //check if there is two values, otherwise is not possible to calculate the value
    if (dataDiv.children.length === 2) {

      //extract kr and m2 value from listing
      const m2 = this.extractNumber(dataDiv.children[0].innerText);
      const kr = this.extractNumber(dataDiv.children[1].innerText);

      const krPerM2 = this.calculate(m2,kr);

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