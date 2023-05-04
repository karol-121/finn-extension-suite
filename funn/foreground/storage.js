//foreground storage plug that handles communication with background
const storage = {

	onError(message) {
		console.err(message);
		return false;
	},

	//method that saves prefs to storage, key is used to identify prefs
	set(key, prefs) {
		browser.runtime.sendMessage({

			//params to send to the storage
			action: "set", 
			key: key, 
			prefs: prefs

		}).then((response) => {

			return response;
	    
	  }).catch(this.onError);
	},

	//method that retrievies prefs from storage by specified key
	get(key) {
		browser.runtime.sendMessage({

			//params to send to the storage
			action: "get", 
			key: key

		}).then((response) => {

			return response; 
	    
	  }).catch(this.onError);
	}


}