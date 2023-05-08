const scroll_top = {
  name: "Til toppen",
  desc: "Legger til en knapp som blar til toppen",
  matches: /\/.*/gm,
  greedy: false,

  prefs: {
    active: true
  },

  //await here may be unnecessary, remove if so
  async savePrefs() {
    await storageAgent.set(this.name, this.prefs);
  },

  //load user preferences from storage
  async loadPrefs() {

    //request data from storage using foreground storage object
    const prefsObj = await storageAgent.get(this.name)
    
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
    console.log("scroll_top deployed");
    const html = document.querySelector("html");
    const body = document.querySelector("body");

    //create button
    const button = document.createElement("button");
      button.className = "button button-right-bottom";
      button.append("til toppen");
      button.addEventListener('click', (event) => {
        html.scrollIntoView({behavior: "smooth", block: "start"}); //function that scrolls to the top of the page
      });

    //adding button to the page
    body.append(button);

  }
}