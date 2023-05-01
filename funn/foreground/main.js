console.log("foreground/main.js");
//this is frontend agent

//callback for onclick event for settings button
function settings_buttonOnClick(event) {
	//read user prefs from storage
	settings_modal.components = componentDispatcher.components ; //
	settings_modal.show(); //show modal
}

//set onclick callback for settings button
settings_button.onClick = settings_buttonOnClick;
settings_button.create(); 


//register components
componentDispatcher.registerComponent(scroll_top);
componentDispatcher.registerComponent(square_meters);

//dispath modules
componentDispatcher.dispatch();







