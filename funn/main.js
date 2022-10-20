//main logic for funn extension

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
    componentDispatcher.dispatchGreedy(); 
    //some components needs to be refreshed upon dynamic content change (change page content without page reloading which finn is using)
  }
}

//here individual components and componentDispatcher itself are defined in their own files

//register base components
componentDispatcher.registerBaseComponent(settingsButtonBase);
componentDispatcher.registerBaseComponent(settingsPageBase);

//register module components (extensions)
componentDispatcher.registerModuleComponent(mapModule);
componentDispatcher.registerModuleComponent(toTopModule);
componentDispatcher.registerModuleComponent(squareMetersModule);

//dispatch components for the first time the page is loaded
componentDispatcher.dispatch();

//create and activate mutation observer, allows for dispatch to be dispatched when page content has been changed but not reloaded
//this does also bring bug where not overwritten elements will append continuously every time page is not reloaded fully
const observer = new MutationObserver(changeHandler);
observer.observe(pageContent, config);



