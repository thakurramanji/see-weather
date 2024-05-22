document.getElementById('fetchDataButton').addEventListener('click', fetchData);

function fetchData() {
    // Get the city name from the input field
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Please enter your city name');
        return;
    }

    // The URL of the backend API endpoint with the dynamic city name
    const apiKey = '5e90592bd78559cebd5e10b72213a1c6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Make a GET request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Process the data and update the HTML
            displayData(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert('Error fetching data. Please check the city name and try again.');
        });
}

function displayData(data) {
    // Get the div where we will display the data
    const apiDataDiv = document.getElementById('apiData');

    // Clear any existing data
    apiDataDiv.innerHTML = '';

    // Create elements to display the data
    const city = document.createElement('h2');
    city.textContent = `Weather in ${data.name}`;

    const temp = document.createElement('p');
    temp.className = 'weather-info';
    temp.textContent = `Temperature: ${data.main.temp} °C`;

    const weather = document.createElement('p');
    weather.className = 'weather-info';
    weather.textContent = `Weather: ${data.weather[0].description}`;

    const humidity = document.createElement('p');
    humidity.className = 'weather-info';
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const wind = document.createElement('p');
    wind.className = 'weather-info';
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Append the data to the div
    apiDataDiv.appendChild(city);
    apiDataDiv.appendChild(temp);
    apiDataDiv.appendChild(weather);
    apiDataDiv.appendChild(humidity);
    apiDataDiv.appendChild(wind);
}
