console.log("background/core.js");

//session storage, data stored here are presistent as long browser is not closed or extension reloaded
const prefs_storage = {

	prefs_items: new Array(),

	set(key, prefs) {

		const item = {
			key: key,
			prefs, prefs
		}

		this.prefs_items.push(item);

	},

	get(key) {
		//TODO: use "find()" or smt insted of homebrewed finding algorithm
		for (item of this.prefs_items) {

			if (item.key === key) {
				return item;
			}

		}

	}

}

browser.runtime.onMessage.addListener((request) => {

	if (request.action === "set") {
		
		//set prefs to storage
		prefs_storage.set(request.key, request.prefs);

		return Promise.resolve({ response: true }); //TODO make this response not hardcoded

	}

	if (request.action === "get") {

		//get prefs with specified key from storage
		const prefs = prefs_storage.get(request.key);

		return Promise.resolve({ response: prefs });

	}
  
});






