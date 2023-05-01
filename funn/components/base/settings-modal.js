//base module that appends extension config to finn's webpage
const settings_modal = {
	components: null,

	//function that collect data and sends it to callback function
	onSave(event) {
		for (component of this.components) {
			component.savePrefs();
		}
	},

	onLoad() {
		for (component of this.components) {
			component.loadPrefs();
		}
	},

	show() {
		this.onLoad();
		this.render();
	},

	render() {
		//page body
		const body = document.querySelector("body");

		//modal backdrop
		const modal_backdrop = document.createElement("div");
			modal_backdrop.className = "f-modal-backdrop fixed inset-0 sm:place-content-center sm:place-items-center items-end z-20 flex";
			body.append(modal_backdrop); 

		//modal 
		const modal = document.createElement("div");
			modal.className = "f-modal rounded-8 mx-0 sm:mx-16 bg-white flex flex-col overflow-hidden outline-none space-y-16 pt-8 sm:pt-32 sm:pb-32 rounded-b-0 sm:rounded-b-8";
			modal_backdrop.append(modal);

		//modal title
		const modal_title = document.createElement("div");
			modal_title.className = "f-modal-title -mt-4 sm:-mt-8 h-40 sm:h-48 flex items-center justify-end px-16 sm:px-32 flex-shrink-0";
			modal.append(modal_title);	

		//modal content
		const modal_content = document.createElement("div");
			modal_content.className = "block overflow-y-auto overflow-x-hidden last-child:mb-0 flex-grow flex-shrink px-16 sm:px-32 relative";
			modal.append(modal_content);
		
		//modal footer
		const modal_footer = document.createElement("div");
			modal_footer.className = "flex flex-col-reverse sm:flex-row gap-16 sm:gap-32 justify-center sm:justify-end flex-shrink-0 px-16 sm:px-32";
			modal.append(modal_footer);


		//modal close button
		const close_button = document.createElement("button");
			close_button.className = "f-modal-title-button button button--pill justify-self-end";
			close_button.addEventListener("click", function (e) {
				//close modal
				modal_backdrop.remove(); //remove backdrop as this is root node for whole modal

			});
			modal_title.append(close_button);

		//cross icon
		const cross_icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			cross_icon.setAttribute("width", "16");
			cross_icon.setAttribute("height", "16");
			cross_icon.setAttribute("viewBox", "0 0 16 16");
			cross_icon.setAttribute("fill", "none");
			cross_icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			cross_icon.innerHTML =  '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.5 3.5-9 9M3.5 3.5l9 9"></path>';
			close_button.append(cross_icon);

		//save button
		const save_button = document.createElement("button");
			save_button.className = "button button--primary min-w-full sm:min-w-max";
			save_button.parentObject = this; //save reference to this object
			save_button.addEventListener("click", function (e) {
				//here we are in the scope of the button and therefore we can make user of reference to object we passed earlier
				this.parentObject.onSave(e);
				modal_backdrop.remove(); //close modal
			});
			save_button.append("Lagre");
			modal_footer.append(save_button);

		const title = document.createElement("h2");
			title.append("Innstillinger for Funn utvidelse");
			modal_content.append(title);

		const subtitle = document.createElement("h4");
			subtitle.append("Her kan du tilpasse Funn utvidelse til dine preferanser. Du kan blant annet slå på eller av ulike moduler");
			modal_content.append(subtitle);

		const list = document.createElement("ul");
			for (component of this.components) {
				const item = document.createElement("li");
					item.append(component.name);
					item.append(component.desc);
					item.append(component.prefs.active);
				list.append(item);
			}
			modal_content.append(list);
	}
}





