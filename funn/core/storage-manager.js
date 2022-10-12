//storage manager handlers extension's local storage
//its main job is to implement saving and retrieving values by predefined key

//constructor for storage items where storage is array of those elements
function StorageItem(key, content) {
	this.key = key;
	this.content = content;
}

//storage manager that handlers setting and getting content via a key
const storageManager = {
	items: new Array(),

	fetchingOK(item) {
		console.log("successfully fetched items from storage");
		this.items = item.storageItems; //this does not update the storageManager value. for some reason "this" here is not this object
		console.log(this);
	},

	fetchingErr(error) {		
		console.log("fetching items form storage failed, creating new array instead");
	},

	inititalize() {
		let a = browser.storage.local.get("storageItems");
		a.then(this.fetchingOK, this.fetchingErr);
	},

	set(key, content) {
		console.log(this.items);

		const itemKeyComparator = (element) => element.key === key;

		const itemIndex = this.items.findIndex(itemKeyComparator); //search for item containing provided key

		if (itemIndex === -1) {
			//if no object with provided key was found, create new object and add it to array
			const storageItem = new StorageItem(key, content);
			this.items.push(storageItem);
		} else {
			//if object with provided key was found, update its content
			this.items[itemIndex].content = content;
		}

		//set the updated array to the storage
		const storage = {
			storageItems: this.items
		};

		browser.storage.local.set(storage).then(
			() => {
				console.log("storage was successfully updated");
			}, 
			() => {
				console.log("storage updating failed");
			}
		);
	},

	async get(key) {
		await this.fetch;
		
		//return item with given key if found
		console.log("the key is: "+ key);
		console.log(this.items);
		const itemKeyComparatora = (element) => element.key === key;

		return this.items.find(itemKeyComparatora);
	}
}

storageManager.inititalize();