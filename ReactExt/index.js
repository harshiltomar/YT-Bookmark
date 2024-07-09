async function sayHello() {
    // Query all tabs and pull out the Tab that is currently active
    let [tab]= await chrome.tabs.query({ active: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: ()=> {
            alert('Hello from my Extension !');
        }
    })
};

// Gets Id of button and throws alert function
document.getElementById("myButton").addEventListener("click", sayHello);