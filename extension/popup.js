document.getElementById("summarizeButton").addEventListener("click", () => {
    const text = document.getElementById("textInput").value;

    // Show loading message
    document.getElementById("summaryOutput").innerText = "מסכם...";

    fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        // Display the summary
        document.getElementById("summaryOutput").innerText = data.summary;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("summaryOutput").innerText = "Error occurred while summarizing.";
    });
});
