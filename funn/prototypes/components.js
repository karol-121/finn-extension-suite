//core component
const componentPrototype = {
	//none for now
}

function Component(head, body) {
	this.head = head;
	this.body = body;
}

Object.assign(Component.prototype, componentPrototype);

//base component extends core component
//(for now it is only wrapper for core component but i want base and module component to be on the same level)
const baseComponentPrototype = {
	matches() {
		return this.core.head.matches;
	},

	run() {
		this.core.body.main();
	},

	run(parameter) {
		this.core.body.main(parameter);
	}
}

function BaseComponent(head, body) {
	this.core = new Component(head, body);
}

Object.assign(BaseComponent.prototype, baseComponentPrototype);

//module component extends core component
const moduleComponentPrototype = {	
	active: true, //set default value to true, technically the value could be determined from storage manager

	matches() {
		return this.core.head.matches;
	},

	run() {
		this.core.body.main();
	},

	loadStatus() {
		//get item from storage manager using key (name of this object)

		console.log("retriving value from the storage");
		//TODO: here check what is the value of gotten item, if it is undefined, then dont overwrite current value
		this.active = this.storage.get(this.core.head.name);
	},

	saveStatus() {
		//set item to storage manager using key (name of this object)
		console.log("sending "+ this.core.head.name + "'s value ("+this.active+") to storage manager");
		this.storage.set(this.core.head.name, this.active);
		
	},

	enabled() {
		this.active = true;
		this.saveStatus();
	},

	disabled() {
		this.active = false;
		this.saveStatus();
	},

	isActive() {
		//await load status
		return this.active;
	},

	isGreedy() {
		return this.core.head.greedy;
	},

	getName() {
		return this.core.head.name;
	},

	getDesc() {
		return this.core.head.desc;
	}
}

function ModuleComponent(head, body, storage) {
	this.core = new Component(head, body);
	this.storage = storage; //define storage manager for this object
	this.loadStatus(); //
}

Object.assign(ModuleComponent.prototype, moduleComponentPrototype);