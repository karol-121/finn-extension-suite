//foreground storage agent that handles communication with background storage
const storageAgent = {

	//method that saves prefs to storage, key is used to identify prefs
	set(key, prefs) {
		
		return browser.runtime.sendMessage({

			//params to send to the storage
			action: "set", 
			key: key, 
			prefs: prefs

		}).then((response) => {

			return response; 
	    
	  }).catch(() => {
	  	return false;
	  });
	},

	//method that retrievies prefs from storage by specified key
	get(key) {

		return browser.runtime.sendMessage({

			//params to send to the storage
			action: "get", 
			key: key

		}).then((response) => {

			return response;
	    
	  }).catch(() => {
	  	return false;
	  });
	}
}