//base component extends core component
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