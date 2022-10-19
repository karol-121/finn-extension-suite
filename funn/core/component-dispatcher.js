//object that represents an component dispatcher
//the objective for an component dispatcher is to determine which of registered components should run each time it is called
const componentDispatcher = {
	//list of all components that are registered
	components: new Array(),
	bases: new Array(),

	//method which register new components
	//here it would be usefull to have interface for them as for now it is assumed that components have particular properties
	registerModuleComponent(component) {
		this.components.push(component);
	},

	//method which register new bases (base components)
	//here it would be usefull to have interface for them as for now it is assumed that components have particular properties
	registerBaseComponent(base) {
		this.bases.push(base)
	},

	//method which iterate registered components and bases and chose which one to run based on their properties
	dispatch() {
		for (base of this.bases) {
			base.run(this.components);
		}

		for (component of this.components) {
			component.run(false);
		}
	},

	dispatchGreedy() { //greedy dispatch, this one looks for greedy attribute, and run only those whose greedy attribute is set to true 
		for (component of this.components) {
			component.run(true);
		}	
	}

}