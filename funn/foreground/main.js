console.log("foreground/main.js");
//this is frontend agent

//callback for onclick event for settings modal save button
function settings_modalOnSave(event, prefs) {
	//save confinguration to storage
	console.log(prefs);
}

//callback for onclick event for settings button
function settings_buttonOnClick(event) {
	//read user prefs from storage
	settings_modal.userPrefs = "bar"; //update settings modal with user prefs
	settings_modal.show(); //show modal
}

//set onclick callback for settings modal save button
settings_modal.onSave = settings_modalOnSave;

//set onclick callback for settings button
settings_button.onClick = settings_buttonOnClick;
settings_button.create(); 


//register components
componentDispatcher.registerComponent(scroll_top);
componentDispatcher.registerComponent(square_meters);

//dispath modules
componentDispatcher.dispatch();







