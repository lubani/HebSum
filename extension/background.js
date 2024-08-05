// Check if the window object is defined (not in a service worker context)
if (typeof window !== "undefined") {
    const mediaQueryList = window.matchMedia('(max-width: 600px)');

    // Use addEventListener instead of the deprecated addListener
    mediaQueryList.addEventListener('change', (event) => {
        if (event.matches) {
            console.log('The viewport is 600px or less.');
        } else {
            console.log('The viewport is more than 600px.');
        }
    });
}

// Check if we are in a browser extension context
if (typeof chrome !== "undefined" && chrome.action) {
    chrome.action.onClicked.addListener(() => {
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: 400,
            height: 600
        });
    });
}
