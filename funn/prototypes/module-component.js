//module component extends core component
const moduleComponentPrototype = {	

	//value that defines if component is active or not
	active: true,

	//method that decides if and how component should be executed 
	async run(greedy) {

		await this.loadStatus(); //await method that loads "active" value, it ensures that correct value is used below

		if (this.active) {
			if (greedy) {
				this.core.runGreedy();
			} else {
				this.core.run();
			}
		}
		
	},

	//method that gets "this.active" value from storage area and updates it upon success.
	async loadStatus() {

		//get values from storage area using key (name of this object)
		const fromStorage = await browser.storage.local.get(this.core.head.name).then(
			function (result) {
				//success, return result
				return result;
			},
			function (result) {
				console.err(result);
			}
		);
		
		//check whether relevant result from storage exist, if not return
		if (Object.values(fromStorage)[0] === undefined) {
			return;
		}

		//update value with value from storage
		this.active = Object.values(fromStorage)[0];
	},

	//method that saves "this.active" value to the storage area
	saveStatus() {

		//value wrapped into a object which will be saved
		const storage = {
			[this.core.head.name]: this.active
		};

		//save current value to storage area
		browser.storage.local.set(storage).then(
			function (result) {
				//handle successful save
				console.log("OK");
			}, 
			function (result) {
				//handle failed save
				console.err(result);
			}
		);
	},

	//methods used by settings page:
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

	async isActive() {
		await this.loadStatus(); //await method that loads "active" value, it ensures that correct value is used below
		return this.active;
	}
}

//module component constructor
function ModuleComponent(head, body) {
	this.core = new Component(head, body);
}

Object.assign(ModuleComponent.prototype, moduleComponentPrototype);