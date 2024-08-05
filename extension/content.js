// Function to send selected text to the background script
function sendSelectedTextForSummarization() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        chrome.runtime.sendMessage({ type: 'summarizeText', text: selectedText }, (response) => {
            console.log(response.status); // Logs 'received'
        });
    }
}

// Adding an event listener to trigger the function on a keyboard shortcut, e.g., Ctrl+Shift+S
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        sendSelectedTextForSummarization();
    }
});

// Example of using addEventListener for MediaQueryList
const mediaQueryList = window.matchMedia('(max-width: 600px)');
mediaQueryList.addEventListener('change', (event) => {
    if (event.matches) {
        console.log('The viewport is 600px or less.');
    } else {
        console.log('The viewport is more than 600px.');
    }
});
