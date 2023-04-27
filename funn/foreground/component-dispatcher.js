//object that represents an component dispatcher
//the objective for an component dispatcher is to execute (dispatch) registered components, basically control when it happens and how
const componentDispatcher = {
	
	components: new Array(),

	registerComponent(component) {
		this.components.push(component);
	},

	url: document.location.href,
	pageContent: document.querySelector("body"),
	mutatorConfig: {childList: true, subtree: true},

	onChange() {
		const newUrl = document.location.href;
		if (newUrl !== this.url) {
			this.url = newUrl;
			this.creator.dispatchGreedy();
		}
	},

	//method which iterate registered components and chose which one to run based on their properties
	dispatch() {
		console.log("dispatch:");
		for (component of this.components) {
			if (this.url.match(component.matches) && !component.greedy) {
				component.apply();
			}
		}

		//arm mutator observer that will dispatch modules that should be reloaded upon url change
		const observer = new MutationObserver(this.onChange);
		observer.creator = this;
		observer.observe(this.pageContent, this.mutatorConfig);
	},

	dispatchGreedy() {
		console.log("dispatch Greedy:");
		for (component of this.components) {
			if (this.url.match(component.matches) && component.greedy) {
				component.apply();
			}
		}
	}
}
		
