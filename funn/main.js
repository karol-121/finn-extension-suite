//main logic for funn extension
console.log("main loaded");

//url used by component dispatcher to decide which extensions to load
const currentPage = document.location.pathname;

//saves last url used in callback
let lastUrl = document.location.href;

//target in which observer observe for mutation
const pageContent = document.querySelector("body");

//config for mutation observer
const config = { childList: true, subtree: true };

//function that executes whenever there is change in page content
const changeHandler = () => {
  const url = document.location.href;
  if (url !== lastUrl) {
  	//execute only when there is change in url
    lastUrl = url;
    componentDispatcher.dispatch(currentPage);
  }
}

//TODO: here handle loading and saving user settings

//register base components
componentDispatcher.registerBase(baseExtensionButton);
componentDispatcher.registerBase(baseExtensionSettings);

//register components (extensions)
componentDispatcher.registerComponent(toTopComponent);
componentDispatcher.registerComponent(mapComponent);
componentDispatcher.registerComponent(squareMeterComponent);

//dispatch components for the first time the page is loaded
componentDispatcher.dispatch(currentPage);

//create and activate mutation observer, allows for dispatch to be dispatched when page content has been changed but not reloaded
const observer = new MutationObserver(changeHandler);
observer.observe(pageContent, config);






