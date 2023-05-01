const scroll_top = {
  name: "Til toppen",
  desc: "Legger til en knapp som blar til toppen",
  matches: /\/.*/gm,
  greedy: false,

  prefs: {
    active: true
  },

  savePrefs() {
    console.log("saving prefs for :" + this.name);
    //storage.setPrefs = this.prefs
  },

  loadPrefs() {
    console.log("loading prefs for :" + this.name);
    //this.prefs = storage.getPrefs
  },

  //entry point
  run() {
    this.loadPrefs(); //load prefs from storage

    if (this.prefs.active) {
      this.apply(); //run module if set to active
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