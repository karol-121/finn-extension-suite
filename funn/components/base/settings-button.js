//base module that appends extension config link to finn's topbar
const settings_button = {

	set onClick(callback) {
		this.onclick_callback = callback;
	},

	create() {
		//endpoint in where the link will lead to, this does define where extension config page will be
		//topbar nav dom element
		const topbar_nav = document.querySelector("finn-topbar").shadowRoot.querySelector("nav");

		//span element for the new link element
		const extension_link_span = document.createElement("span");
			extension_link_span.className = "hidden md:block ml-8 text-gray-800 translate font-bold";
			extension_link_span.setAttribute("style", "color: #474445;");
			extension_link_span.append("Funn");

		//icon for funn extension in svg format
		const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			icon.className = "false";
			icon.setAttribute("width", "25");
			icon.setAttribute("height", "25");
			icon.setAttribute("viewBox", "0 0 25 25");
			icon.setAttribute("fill", "none");
			icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			icon.innerHTML = `
				<g>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M-9.15527e-05 15C0 5 5 0 15 0H20C23 0 24 1 24 4V20C24 23 23 24 20 24H4C1 24 -9.15527e-05 23 -9.15527e-05 20V15ZM1.49991 15C1.5 5.5 6.5 1.5 15 1.5H20C22 1.5 22.5 2 22.5 4V20C22.5 22 22 22.5 20 22.5H4C2 22.5 1.5 22 1.49991 20V15Z" fill="#818B9A"/>
					<path d="M11.5002 16L11.5 13L8.50023 13C8.00023 13 7.50001 13 7.50001 12.25C7.50001 11.5 8.00023 11.5 8.50023 11.5H11.5V8.5C11.5002 8 11.5 7.5 12.25 7.5C13 7.5 13.0002 8 13 8.5V11.5H16.0002C16.5002 11.5 16.9998 11.5 17 12.25C17.0002 13 16.5002 13 16.0002 13L13 13L13.0002 16C13.0002 16.5 13.0002 17 12.25 17C11.4998 17 11.5002 16.5 11.5002 16Z" fill="#818B9A"/>
				</g>
				<defs>
					<clipPath>
						<rect width="25" height="25" fill="white" transform="translate(0.5 0.5)"/>
					</clipPath>
				</defs>
			`

		//creating new link
		const extension_link = document.createElement("a");
			extension_link.addEventListener("click", this.onclick_callback);
			extension_link.className = " border-white justify-center p-0 flex-auto md:flex-none relative no-wrap min-width-0 py-0 px-10 ml-10 border-b-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none bg-white flex items-center text-12 text-blue-500 no-underline hover:no-underline focus:no-underline active:no-underline"
			extension_link.append(icon);
			extension_link.append(extension_link_span);

		//appending new link to navbar 
		topbar_nav.append(extension_link);
	}
}




