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
	active: true, //set default value true

	matches() {
		return this.core.head.matches;
	},

	run() {
		this.core.body.main();
	},

	loadStatus() {
		//here: read "active" from local storage
		console.log("status loaded for: "+ this.core.head.name);
	},

	saveStatus() {
		//here: save "active" value to local storage
		console.log("status saved for: " + this.core.head.name);
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

function ModuleComponent(head, body) {
	this.core = new Component(head, body);
	this.loadStatus(); //resolve status, tries to load
}

Object.assign(ModuleComponent.prototype, moduleComponentPrototype);