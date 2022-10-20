//object for "to the top button" extension component
const toTopModuleHead = {
  matches: /\/.*/gm,
  greedy: false,
  name: "Til toppen",
  desc: "Legger til en knapp som blar til toppen"
}

const toTopModuleBody = {
  main() {
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

//creating actuall object using content defined here
const toTopModule = new ModuleComponent(toTopModuleHead, toTopModuleBody);