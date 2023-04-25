//base module that appends extension config link to finn's topbar


function settings_button(onclick_callback) {
	//endpoint in where the link will lead to, this does define where extension config page will be

	//topbar nav dom element
	const topbar_nav = document.querySelector("finn-topbar").shadowRoot.querySelector("nav");

	//span element for the new link element
	const extension_link_span = document.createElement("span");
		extension_link_span.className = "hidden md:block ml-8 text-gray-800 translate font-bold";
		extension_link_span.setAttribute("style", "color: #474445;");
		extension_link_span.append("Funn");

	//icon for funn extension in svg format
	//TODO: export svg icon to 25px and maybe redo the innerHTML to actuall nodes
	const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		icon.className = "false";
		icon.setAttribute("width", "25");
		icon.setAttribute("height", "25");
		icon.setAttribute("viewBox", "0 0 48 48");
		icon.setAttribute("fill", "none");
		icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		icon.innerHTML = `
			<g clip-path="url(#clip0_1_34)">
			<path d="M1 24C1 11.2975 11.2975 1 24 1H44C45.6569 1 47 2.34315 47 4V44C47 45.6569 45.6569 47 44 47H4C2.34315 47 1 45.6569 1 44V24Z" stroke="#818B9A" stroke-width="2"/>
			<rect x="22" y="14" width="3" height="19" rx="1.5" fill="#818B9A"/>
			<rect x="33" y="22" width="3" height="19" rx="1.5" transform="rotate(90 33 22)" fill="#818B9A"/>
			</g>
			<defs>
			<clipPath id="clip0_1_34">
			<rect width="48" height="48" fill="white"/>
			</clipPath>
			</defs>
			</svg>
		`

	//creating new link
	const extension_link = document.createElement("a");
		extension_link.addEventListener("click", onclick_callback); //create eventlistener with callback specified by this functions parameter
		extension_link.className = " border-white justify-center p-0 flex-auto md:flex-none relative no-wrap min-width-0 py-0 px-10 ml-10 border-b-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none bg-white flex items-center text-12 text-blue-500 no-underline hover:no-underline focus:no-underline active:no-underline"
		extension_link.append(icon);
		extension_link.append(extension_link_span);

	//appending new link to navbar 
	topbar_nav.append(extension_link);
}

