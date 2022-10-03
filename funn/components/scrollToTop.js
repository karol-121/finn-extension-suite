//object for "to the top button" extension component
const toTopComponent = {

  //component metadata
  name: "Til toppen",
  desc: "Legger til en knapp som blar til toppen",
  matches: /\/.*/gm, //defines on which url this component should be active on
  enabled: true, //defines if extension is active, component activity is defined by the end user
  
  //kinda could be cool to manifest the needs of component here , ie. access to all components
  //needs: components

  //component entry point
  run() {
    //debug string to dobel check if extension is loading
    console.log("scroll to top extension loaded!"); 

    const html = document.querySelector("html");
    const body = document.querySelector("body");

    //create button
    const button = document.createElement("button");
      button.className = "button position-fixed bottom-8 right-8 zindex-999";
      button.append("til toppen");
      button.addEventListener('click', (event) => {
        html.scrollIntoView({behavior: "smooth", block: "start"}); //function that scrolls to the top of the page
      });

    //adding button to the page
    body.append(button);
  }
}




