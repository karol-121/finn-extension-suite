console.log("scroll to top extension loaded!"); //debug string to dobel check if extension is loading

const html = document.querySelector("html");
const body = document.querySelector("body");

//create button
const button = document.createElement("button");
  button.setAttribute("class", "button position-fixed bottom-8 right-8 zindex-999");
  button.append("til toppen");
  button.addEventListener('click', (event) => {
    html.scrollIntoView({behavior: "smooth", block: "start"}); //function that scrolls to the top of the page
  });

//adding button to the page
body.append(button);