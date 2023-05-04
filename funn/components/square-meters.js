//object for "square meter" extension component
const square_meters = {
  name: "Kvadrat meter",
  desc: "Beregner pris per kvadrat meter for alle til leie anonneser. Gode tilbud (verdi under 250kr/m²) er markert med gul skrift.",
  matches: /\/realestate\/lettings\/search\.html.*/gm, 
  greedy: true,

  prefs: {
    active: true,
    threshold: 250
  },

  //await here may be unnecessary, remove if so
  async savePrefs() {
    await storage.set(this.name, this.prefs);
  },

  //load user preferences from storage
  async loadPrefs() {

    //request data from storage using foreground storage object
    const prefsObj = await storage.get(this.name)
    
    //if prefs obj has been obtained from storage, use it
    if (prefsObj) {
      this.prefs = prefsObj;
    }
    
  },

  //entry point
  async run() {
    
    await this.loadPrefs(); //wait until loading of user preferences is resolved

    //at this point user preferences should be resolved
    //check therefore is component should run based on user preferences
    if (this.prefs.active) {
      this.apply();
    }

  },

  apply() {
    console.log("square-meters deployed");
    //collection of listings
    let listings;

    //update listing with current feed
    listings = document.querySelectorAll("article");

    //iterate through all listings and add ratio value for each
    //here the first listing is skipped as it is updated and not replaced, thus modifications are not reset and adds up
    for (listing of listings) {
      this.modifyListing(listing, this.threshold);
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