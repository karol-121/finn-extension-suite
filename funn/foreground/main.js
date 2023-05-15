console.log("foreground/main.js");
//this is frontend agent

//callback for onclick event for settings button
function settings_buttonOnClick(event) {
	//read user prefs from storage
	settings_modal.components = componentDispatcher.getComponents(); //adding components to settings modal
	settings_modal.show(); //show modal
}

//set onclick callback for settings button
settings_button.onClick = settings_buttonOnClick;
settings_button.create(); 


//register components
componentDispatcher.registerComponent(map_viewer);
componentDispatcher.registerComponent(scroll_top);
componentDispatcher.registerComponent(square_meters);

//dispath modules
componentDispatcher.dispatch();







