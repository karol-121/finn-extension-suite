//object that represents an component dispatcher
//the objective for an component dispatcher is to execute (dispatch) registered components, basically control when it happens and how
//which component does actually run and which not is determined in the component itself based both on internal values and values passed here
const componentDispatcher = {
	
	//list of all components that are registered
	components: new Array(),
	bases: new Array(),

	//method which register new components
	//here it would be useful to have interface for them as for now it is assumed that components have particular properties
	registerModuleComponent(component) {
		this.components.push(component);
	},

	//method which register new bases (base components)
	//here it would be useful to have interface for them as for now it is assumed that components have particular properties
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

	//greedy dispatch, this one looks for greedy attribute, and run only those whose greedy attribute is set to true
	//also this does not run the base components as currently no base component requires greedy run
	dispatchGreedy() { 
		for (component of this.components) {
			component.run(true);
		}	
	}

}