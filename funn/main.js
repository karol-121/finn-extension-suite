//main logic for funn extension
console.log("main loaded");

const currentPage = document.location.pathname;

//here handle loading and saving user settings

//register toTopComponent
componentDispatcher.registerComponent(toTopComponent);
componentDispatcher.registerComponent(mapComponent);


//TODO: this should be executed everytime the url og page changes
componentDispatcher.dispatch(currentPage); 