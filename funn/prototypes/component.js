//prototype of component object, this does include methods that are universal for each component
//some of those needs to be overwritten in actuall component, those are added here just to be safe
const component_prototype = {
  name: "", //overwrite this
  prefs: null, //overwrite this
  
  //await here may be unnecessary, remove if so
  async savePrefs() {
    await storageAgent.set(this.name, this.prefs);
  },

  //load user preferences from storage
  async loadPrefs() {

    //request data from storage using foreground storage object
    const prefsObj = await storageAgent.get(this.name)
    
    //if prefs obj has been obtained from storage, use it
    if (prefsObj) {
      this.prefs = prefsObj;
    }
    
  },

  //entry point
  async run() {
    
    await this.loadPrefs(); //wait until loading of user preferences is resolved

    //at this point user preferences should be resolved
    //check therefore is component should run based on user preferences
    if (this.prefs.active) {
      this.apply();
    }

  },

  apply() { //overwrite this
  }

}

