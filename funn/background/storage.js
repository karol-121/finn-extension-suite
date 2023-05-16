//session storage, data stored here are persistent as long browser is not closed or extension is reloaded
const prefs_storage_temp = {

	items: new Array(),

	save() {
		//save data from session storage to local storage where data will be persistent
		browser.storage.local.set({user_prefs: this.items});
	},

	load() {
		//retrive saved data from local storage
		browser.storage.local.get("user_prefs").then((result) => {

			//check if user_prefs from storage is an array,
			if(result.user_prefs.length > 0) {
				this.items = result.user_prefs;
			}

		});

	},

	//set item to session storage
	set(key, prefs) {

		//assign key to prefs object
		const item = {
			key: key,
			prefs, prefs
		}

		//check if item already exist, if so update it rather than push a new one
		const index = this.items.findIndex(element => element.key === key);

		//if item aleardy exist, update it and return
		if (index > -1) {
			this.items[index] = item;
			return;
		}

		//push new item if item with provided key does not exist yet.
		this.items.push(item); 

	},

	//get item from sesson storage
	get(key) {

		//find element using provided key
		const item = this.items.find(element => element.key === key);

		//if item exist, retrieve prefs object as it is stored inside item object together with the key 
		if (item) {
			return item.prefs;
		}

		//if none item object is returned, return whatever value "find" method did return
		return item;

	}

}

prefs_storage_temp.load(); //load items from storage upon loading of script

browser.runtime.onMessage.addListener((request) => {

	if (request.action === "set") {

		//set prefs to storage
		prefs_storage_temp.set(request.key, request.prefs); 
		prefs_storage_temp.save(); 

		return Promise.resolve(); //resolve promise which ends setting action

	}

	if (request.action === "get") {

		//get prefs with specified key from storage
		const prefs = prefs_storage_temp.get(request.key);

		return Promise.resolve(prefs); //return result of getting action

	}
  
});






