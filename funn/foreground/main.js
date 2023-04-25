console.log("foreground/main.js");
//this is frontend agent


//callback for onclick event for settings button
function settings_buttonOnclick(event) {
	settings_modal(); //opens modal
}

//append settings button and register onclick callback
settings_button(settings_buttonOnclick);
