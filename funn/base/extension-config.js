//base module that appends extension config to finn's webpage
//this uses an unused endpoint which normally leads to 404 page
//this modue replaces content on 404 page with extensions settings
console.log("base extension-config.js is loaded");

//this check if it is right endpoint, this will be redone where a global dispatcher will callback given module
if (window.location.pathname === "/funn") {
	showExtensionSettings();
}


//entry point of whole extension for now
function showExtensionSettings() {

	//locales
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
		//this content here should be looped for each module that is registered
		//TODO: the group separator does not work well here

		setting_group.append(createSettingGroupItem("Kart utvidelse","Annonse lokasjon er mulig å se på kart.finn.no"));
		setting_group.append(createSettingGroupSeparator());
		setting_group.append(createSettingGroupItem("Galleri slideshow","viser frem annonse galleri ved mouse over"));
		setting_group.append(createSettingGroupSeparator());
		setting_group.append(createSettingGroupItem("Til toppen","Legges til til toppen knapp"));
		setting_group.append(createSettingGroupSeparator());
		setting_group.append(createSettingGroupItem("Kvadrat meter","Beregner og viser pris per kvadrat meter til annonser"));

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
	
}

//creates separator for group settings so the node does not have to be duplicated
function createSettingGroupSeparator() {

	//separator
	const separator = document.createElement("hr");
		separator.className = "mb-16";

		return separator;
}

//function that creates setting group item
function createSettingGroupItem(setting_title, setting_desc) {

	//title for setting item
	const title = document.createElement("h4");
		title.append(setting_title);

	//description for setting item
	const description = document.createElement("p");
		description.append(setting_desc);

	//description wrapper
	const description_wrapper = document.createElement("div");
		description_wrapper.className = "text-14 pr-16";
		description_wrapper.setAttribute("style", "flex-grow: 1;");
		description_wrapper.append(description);

	//background inside toggle
	const toggle_background = document.createElement("span");
		toggle_background.className = "absolute h-full w-full rounded-full transition-colors top-0 left-0 bg-blue-600 f-track-selected";

	//moving part of the toggle
	const toggle_toggler = document.createElement("span");
		toggle_toggler.className = "absolute transition-gpu h-16 w-16 top-4 left-4 rounded-full transition-transform bg-white shadow f-switch-selected";

	//toggle, on off button
	const toggle = document.createElement("button");
		toggle.className = "block relative h-24 w-44 cursor-pointer f-switch focus:outline-none focus:ring ring-offset-1 ring-blue-200 rounded-full";
		toggle.append(toggle_background);
		toggle.append(toggle_toggler);
		//add aria label etc.
		//TODO add event listener for toggles, the toggle has to change also
		
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