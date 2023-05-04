//foreground storage plug that handles communication with background
const storage = {

	//method that saves prefs to storage, key is used to identify prefs
	set(key, prefs) {
		console.log("storage - setting to storage:");
		console.log(prefs);
		
		return browser.runtime.sendMessage({

			//params to send to the storage
			action: "set", 
			key: key, 
			prefs: prefs

		}).then((response) => {

			console.log("storage - set to storage:");
			console.log(response);
			return response; 
	    
	  }).catch(() => {
	  	return false;
	  });
	},

	//method that retrievies prefs from storage by specified key
	get(key) {
		console.log("storage - getting from storage using: ");
		console.log(key);

		return browser.runtime.sendMessage({

			//params to send to the storage
			action: "get", 
			key: key

		}).then((response) => {

			console.log("storage - got from storage:");
			console.log(response);
			return response;
	    
	  }).catch(() => {
	  	return false;
	  });
	}
}