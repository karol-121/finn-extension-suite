function savePreferences() {
  browser.storage.local.set({
    prefered_url: document.querySelector("#custom-url").value
  });
}

function restorePreferences() {
  let storageItem = browser.storage.local.get('prefered_url');
  storageItem.then(sucess, failure);
}

function sucess(item) {
  document.querySelector("#custom-url").value = item.prefered_url;
}

function failure(item) {
  console.error(item);
}


document.addEventListener('DOMContentLoaded', restorePreferences);
window.addEventListener('unload', savePreferences);
