//base module that appends extension config to finn's webpage
//this uses an unused endpoint which normally leads to 404 page
//this modue replaces content on 404 page with extensions settings
const settingsPageBaseHead = {
	matches: /\/funn/gm
}

const settingsPageBaseBody = {
  main(components) {
  	//locales/text
		const page_title = "Innstillinger for Funn utvidelse";
		const page_desc = "Her kan du tilpasse Funn utvidelse til dine preferanser. Du kan blant annet slå på eller av ulike moduler";
		const setting_group_name = "Funn utvidelse moduler"
		
		//html content below does need this stylesheet in order to look as intended
		const stylesheet = document.createElement("link")
			stylesheet.href = 'https://assets.finn.no/pkg/consent-frontend-frontpage-layout/1.0.116/style.css';
			stylesheet.media = "all";
			stylesheet.type = "text/css";
			stylesheet.rel = "stylesheet";
		
		document.head.append(stylesheet);

		//main content of the 404 page
		const content = document.querySelector("div");

		//header title
		const page_container_section_title = document.createElement("h1");
			page_container_section_title.append(page_title); 

		//header paragraph
		const page_container_section_paragraph = document.createElement("p");
			page_container_section_paragraph.append(page_desc);

		//group for header title and paragraph
		const page_container_section = document.createElement("div");
			page_container_section.className = "md:col-span-2";
			page_container_section.append(page_container_section_title);
			page_container_section.append(page_container_section_paragraph);

		//wrapper for header title and paragraph group
		const page_container_section_wrapper = document.createElement("div");
			page_container_section_wrapper.className = "md:grid grid-cols-3 gap-32 space-y-32 md:space-y-0";
			page_container_section_wrapper.append(page_container_section);

		//parent element for header
		const page_container = document.createElement("div");
			page_container.className = "page-container";
			page_container.append(page_container_section_wrapper);


		//title for setting group
		const setting_group_title = document.createElement("h3");
			setting_group_title.className = "mb-16";
			setting_group_title.append(setting_group_name);

		//setting group
		const setting_group = document.createElement("div");
			setting_group.className = "group block relative break-words last-child:mb-0 p-16 rounded-8 -mx-16 sm:mx-0 rounded-l-0 rounded-r-0 sm:rounded-8 mt-16 mb-16";
			setting_group.setAttribute("style", "background-color: white;");
			setting_group.append(setting_group_title);

			//do it for every module component (actuall extensions)
			for (component of components) {
				
				//createSettingGroupItem is an async method, therefore .then is used
				const item = this.createSettingGroupItem(component);

				item.then(function (created_item) {
					//append item after async method resolves
					setting_group.append(created_item);
					setting_group.append(settingsPageBaseBody.createSettingGroupSeparator()); //here the scope is global, therefore cannot call separator metod by "this"
				});
			}
			

		//wrapper for setting group
		const main_section_shrinker = document.createElement("div");
			main_section_shrinker.className = "md:col-span-2";
			main_section_shrinker.append(setting_group);

		//container for setting groups
		const main_section = document.createElement("div");
			main_section.className = "md:grid grid-cols-3 gap-16 space-y-16 md:space-y-0";
			main_section.append(main_section_shrinker);

		//setting section body
		const main = document.createElement("main");
			main.className = "page-container pt-32 pb-64";
			main.append(main_section);

		//parent for setting section body
		const banner = document.createElement("div");
			banner.className = "banner";
			banner.append(main);


		//first add extra div with content to main page
		content.parentNode.insertBefore(page_container, content);

		//then replace the original div with the second content div 
		content.replaceWith(banner);

  },

  //creates separator for group settings so the node does not have to be duplicated
	createSettingGroupSeparator() {
		//separator
		const separator = document.createElement("hr");
			separator.className = "mb-16";

			return separator;
	},


	//function that creates setting group item
	async createSettingGroupItem(item) {

		//title for setting item
		const title = document.createElement("h4");
			title.append(item.getName());

		//description for setting item
		const description = document.createElement("p");
			description.append(item.getDesc());

		//description wrapper
		const description_wrapper = document.createElement("div");
			description_wrapper.className = "text-14 pr-16";
			description_wrapper.setAttribute("style", "flex-grow: 1;");
			description_wrapper.append(description);

		//selected and unselected class for toggle background
		const toggle_background_selected = "absolute h-full w-full rounded-full transition-colors top-0 left-0 bg-blue-600 f-track-selected";
		const toggle_background_unselected = "absolute h-full w-full rounded-full transition-colors top-0 left-0  bg-gray-300 f-track-unselected";

		//selected and unselected class for toggle toggler
		const toggle_toggler_selected = "absolute transition-gpu h-16 w-16 top-4 left-4 rounded-full transition-transform bg-white shadow f-switch-selected";
		const toggle_toggler_unselected = "absolute transition-gpu h-16 w-16 top-4 left-4 rounded-full transition-transform bg-white shadow";

		//background inside toggle
		const toggle_background = document.createElement("span");

		//moving part of the toggle
		const toggle_toggler = document.createElement("span");

		let isActive_Local = await item.isActive(); //load status from module

		//start with selected or unselected toggle based on passed value
		if (isActive_Local) {
			toggle_toggler.className = toggle_toggler_selected;
			toggle_background.className = toggle_background_selected; 
		} else {
			toggle_toggler.className = toggle_toggler_unselected;
			toggle_background.className = toggle_background_unselected;
		}
		

		//toggle, on off button
		const toggle = document.createElement("button");
			toggle.className = "block relative h-24 w-44 cursor-pointer f-switch focus:outline-none focus:ring ring-offset-1 ring-blue-200 rounded-full";
			toggle.append(toggle_background);
			toggle.append(toggle_toggler);

			//attach click listener to button so its setting_value gets updated
			toggle.addEventListener("click", function () { item_toggled(toggle);});

			//function that updates the value of the toggle
			function item_toggled(toggle) {

				isActive_Local = !isActive_Local;
				
				if (isActive_Local) {
					//change apperance of the toggle
					toggle.children[0].className = toggle_background_selected;
					toggle.children[1].className = toggle_toggler_selected;
					//callback to item's function that updates it status
					item.enabled();

				} else {
					//change appearnce of the toggle
					toggle.children[0].className = toggle_background_unselected;
					toggle.children[1].className = toggle_toggler_unselected;
					//callback to item's function that updates it status
					item.disabled();
				}

			}
			
		//wrapper for toggle
		const toggle_wrapper = document.createElement("div");
			toggle_wrapper.className = "tap-highlight-transparent";
			toggle_wrapper.append(toggle);
		
		//group for toggle and description
		const setting_item_wrapper = document.createElement("div");
			setting_item_wrapper.setAttribute("style", "display: flex;");
			setting_item_wrapper.append(description_wrapper);
			setting_item_wrapper.append(toggle_wrapper);

		//full setting item
		const setting_group_item = document.createElement("div");
			setting_group_item.className = "pb-8";
			setting_group_item.append(title);
			setting_group_item.append(setting_item_wrapper);

		return setting_group_item;
	}
}

//creating actuall object using content defined here
const settingsPageBase = new BaseComponent(settingsPageBaseHead, settingsPageBaseBody);




