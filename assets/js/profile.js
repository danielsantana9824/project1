document.addEventListener('DOMContentLoaded', function() {
    fetchSoccerData();
});

function fetchSoccerData() {
    // Replace this URL with your actual API endpoint
    fetch('https://api.example.com/soccer-data')
        .then(response => response.json())
        .then(data => {
            displaySoccerData(data);
        })
        .catch(error => {
            console.error('Error fetching soccer data:', error);
        });
}

function displaySoccerData(data) {
    const soccerDataElement = document.getElementById('soccerData');
    // Process and display the data as needed
    // This is just a simple example
    soccerDataElement.innerHTML = `
        <h2>Latest Soccer Data</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
}