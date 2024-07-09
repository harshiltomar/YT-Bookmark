chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // Below logic checks if tab has a URL and the URL includes yt watch
  if (tab.url && tab.url.includes("youtube.com/watch")) {

    // grabs the watch?=xyz 's unique use and use it as a param
    const queryParameters = tab.url.split("?")[1];

    // Just an interface to work with URL Params
    const urlParameters = new URLSearchParams(queryParameters);
    console.log(urlParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",

      // Yt video is like 'yt.com/watch?v=xyz'
      videoId: urlParameters.get("v"),
    });
  }
});
  