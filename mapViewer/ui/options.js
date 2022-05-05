const open = {
  value: "openstreetmap"
}

const google = {
  value: "google"
}

const alternatives = [document.querySelector('#openstreetmap'), document.querySelector('#google'), document.querySelector('#custom')];
const urls = [open, google, document.querySelector("#custom-url")];
let a = 0;


function savePreferences(e) {

  e.preventDefault();

  browser.storage.local.set({
    prefered_url: {
      selected: a, 
      active: urls[a].value,
      custom: urls[2].value
    }
  });

}

function restorePreferences() {
  let storageItem = browser.storage.local.get("prefered_url");
  storageItem.then(sucess, failure);
}

function sucess(item) {
  let b = item.prefered_url;
  a = b.selected;

  alternatives[b.selected].checked = "checked";
  document.querySelector("#custom-url").value = b.custom;
}

function failure(item) {
  console.error(item);
}


function formUpdate(e) {
  a = +e.target.value;

}

document.querySelector('#openstreetmap').addEventListener('change', formUpdate);
document.querySelector('#google').addEventListener('change', formUpdate);
document.querySelector('#custom').addEventListener('change', formUpdate);

document.addEventListener('DOMContentLoaded', restorePreferences);
document.querySelector('form').addEventListener("submit", savePreferences);


