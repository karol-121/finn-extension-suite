//object for "external map" extension component
const map_viewer = {
  __proto__: component_prototype,
  
  name: "Kart Utvidelse",
  desc: "Gjør det mulig å se adressen på kart.finn.no",
  matches: /\/.*\/ad\.html.*/gm,
  greedy: false,

  prefs: {
    active: true
  },

  apply() {
    //array of all images on page, it should contain map tile
    const images = document.querySelectorAll('img');
    let mapTile;

    //find map tile
    for (image of images) {
      if (image.alt === "Kart") {
        mapTile = image; //assign map tile to a variable
        break;
      }
    }

    //if mapTile was found
    if (mapTile) {

      //extracting latitute and longtitue paramteres from map tile image source 
      const mapTileUrl = new URL(mapTile.src);
      const mapTileUrlParams = new URLSearchParams(mapTileUrl.search);

      //creating parameters for the new map link
      const mapUrlParams = new URLSearchParams();
        mapUrlParams.set('lat', mapTileUrlParams.get("lat"));
        mapUrlParams.set('lng', mapTileUrlParams.get("lng"));
        mapUrlParams.set('zoom', 10);
        mapUrlParams.set('showPin',1); //add marker to location, this may introduce confusion due to incomplete addresses

      //constructing new map link
      const mapUrl = new URL("https://kart.finn.no/");
        mapUrl.search = mapUrlParams.toString();

      //creating link dom object for new map link  
      const mapLink = document.createElement("a");
        mapLink.setAttribute("href", mapUrl.href);
        mapLink.setAttribute("target", "_blank");
        mapLink.append("Se adressen på " + mapUrl.hostname + " 🡵");

      //appending the new map link to dom
      mapTile.parentNode.prepend(mapLink);

    }

  }

}