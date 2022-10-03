//object that represents an component dispatcher
//the objective for an component dispatcher is to determine which of registered components should run each time it is called
const componentDispatcher = {
	//list of all components that are registered
	components: new Array(),
	bases: new Array(),

	//method which register new components
	//here it would be usefull to have interface for them as for now it is assumed that components have particular properties
	registerComponent(component) {
		this.components.push(component);
	},

	//method which register new bases (base components)
	//here it would be usefull to have interface for them as for now it is assumed that components have particular properties
	registerBase(base) {
		this.bases.push(base)
	},

	//method which iterate registered components and bases and chose which one to run based on their properties
	dispatch(url) {
		for (base of this.bases) {
			if(url.match(base.matches)) {
				base.run(this.components); //pass component list as paramter as base components may have use of it
			}
		}

		for (component of this.components) {
			if (url.match(component.matches) && component.enabled) {
				component.run(); //call run method inside each component which is their start point
			}
		}
	}


}