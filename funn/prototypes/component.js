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