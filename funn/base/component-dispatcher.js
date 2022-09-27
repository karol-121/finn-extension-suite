//object that represents an component dispatcher
//the objective for an component dispatcher is to determine which of registered components should run each time it is called
const componentDispatcher = {
	//list of all components that are registered
	components: new Array(),

	//method which register new components
	//here it would be usefull to have interface for them as for now it is assumed that components have particular properties
	registerComponent: function (component) {
		this.components.push(component);
	},

	//method which iterate registered components and chose which one to run based on their properties (url for now)
	dispatch: function (url) {
		for (component of this.components) {
			if (url.match(component.matches) && component.enabled) {
				component.run(); //call run method inside each component which is their start point
			}
		}
	}


}