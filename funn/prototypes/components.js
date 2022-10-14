//core component
const componentPrototype = {
	//execute component if current location matches one defined in object's metadata (head)
	run() {
		const url = document.location.pathname;
		if (url.match(this.head.matches)) {
			this.body.main();
		}
	},

	//same as "run()" except this one passes attributes to object's "main()"
	run(params) {
		const url = document.location.pathname;
		if (url.match(this.head.matches)) {
			this.body.main(params);
		}
	},

	//"run()" in "greedy mode" which is defined in objects metadata (head)
	runGreedy() {
		const url = document.location.pathname;
		if (url.match(this.head.matches) && this.head.greedy) {
			this.body.main();
		}
	}
}

//core component constructor
function Component(head, body) {
	this.head = head;
	this.body = body;
}

Object.assign(Component.prototype, componentPrototype);

//base component extends core component
//(for now it is only wrapper for core component but i want base and module component to be on the same level)
const baseComponentPrototype = {

	run() {
		this.core.run();
	},

	run(params) {
		this.core.run(params);
	}
}

//base component constructor
function BaseComponent(head, body) {
	this.core = new Component(head, body);
}

Object.assign(BaseComponent.prototype, baseComponentPrototype);

//module component extends core component
const moduleComponentPrototype = {	
	//TODO: here create head object that holds metadata relevant for module component (name, desc);
	//TODO: here create object that hold variables that are possibel for user to change, this object will be saved and loaded 

	active: true,

	async run(greedy) {

		await this.loadStatus(); //wait until "active" value is updated
		
		//TODO: currently this method (run) is only method that invokes "loadStatus()" this means the active value is default before this method exectues

		if (this.active) {
			if (greedy) {
				this.core.runGreedy();
			} else {
				this.core.run();
			}
		}
		
	},

	fetchFromStorage() {
		return browser.storage.local.get(this.core.head.name).then(
			function (item) {
				//success, return gotten items
				return item;
			},
			function (){
				//failure, for now, log to console
				console.err("failed to load from storage");
			}
		);
	},

	async loadStatus() {
		//get item from storage manager using key (name of this object)
		const fromStorage = await this.fetchFromStorage();

		//TODO: check what a is, now it is assumed it is correct object from storage

		//update value with value from storage
		this.active = Object.values(fromStorage)[0];
	},

	saveStatus() {

		//value wrapped into a object which will be saved
		const storage = {
			[this.core.head.name]: this.active
		};

		//set current value to the storage
		browser.storage.local.set(storage).then(
			function () {
				//success, 
				console.log("storage was successfully updated");
			}, 
			function () {
				//failure, 
				console.log("storage updating failed");
			}
		);
	},

	//used by settings page
	enabled() {
		this.active = true;
		this.saveStatus();
	},

	disabled() {
		this.active = false;
		this.saveStatus();
	},

	getName() {
		return this.core.head.name;
	},

	getDesc() {
		return this.core.head.desc;
	},

	isActive() {
		return this.active;
	}
}

function ModuleComponent(head, body) {
	this.core = new Component(head, body);
	//this.loadStatus();
}

Object.assign(ModuleComponent.prototype, moduleComponentPrototype);