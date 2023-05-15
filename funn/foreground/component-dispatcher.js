//object that represents an component dispatcher
//the objective for an component dispatcher is to execute (dispatch) registered components, basically control when it happens and how
const componentDispatcher = {
	
	components: new Array(),

	registerComponent(component) {
		this.components.push(component);
	},

	getComponents() {
		return this.components; 
	},

	//parameters for event listener which decides when components dispatches
	url: document.location.href,
	pageContent: document.querySelector("body"),
	mutatorConfig: {childList: true, subtree: true},

	//check if url has changed upon page content change
	onChange() {
		const newUrl = document.location.href;
		if (newUrl !== this.url) {
			this.url = newUrl;
			this.parent.dispatchGreedy();
		}
	},

	//dispatching registered components
	dispatch() {
		for (component of this.components) {
			if (this.url.match(component.matches) && !component.greedy) {
				component.run();
			}
		}

		//arm mutator observer that will dispatch modules that should be reloaded upon url change
		const observer = new MutationObserver(this.onChange);
		observer.parent = this; //save reference to this object in order to make onchange() function accessible
		observer.observe(this.pageContent, this.mutatorConfig);
	},

	//dispatching registered components in "greedy" mode
	//greedy means that components will run upon every url change
	dispatchGreedy() {
		for (component of this.components) {
			if (this.url.match(component.matches) && component.greedy) {
				component.run();
			}
		}
	}
}
		
