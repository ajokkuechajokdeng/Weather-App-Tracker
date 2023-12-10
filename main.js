document.addEventListener("DOMContentLoaded", async function () {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const locationSpan = document.getElementById("city");
    const temperatureParagraph = document.getElementById("temperature");
    const conditionParagraph = document.getElementById("condition");
    const humidityParagraph = document.getElementById("humidity");
    const windSpeedParagraph = document.getElementById("windSpeed");

    searchButton.addEventListener("click", async function () {
        const cityName = searchInput.value.trim();

        if (!cityName) {
            alert("Please enter a city name");
            return;
        }

        try {
            const response = await fetch(`https://open-weather13.p.rapidapi.com/city/${cityName}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'a2cf4ae05dmsh90241921e679318p100a30jsn62cda76504fa',
                    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
                },
            });

            if (response.status === 200) {
                const data = await response.json();

                locationSpan.textContent = data.name;
                temperatureParagraph.textContent = `Temperature: ${data.main.temp}°C`;
                conditionParagraph.textContent = `Condition: ${data.weather[0].description}`;
                humidityParagraph.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeedParagraph.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            } else {
                locationSpan.textContent = "City not found";
                // Clear the weather details
                temperatureParagraph.textContent = "";
                conditionParagraph.textContent = "";
                humidityParagraph.textContent = "";
                windSpeedParagraph.textContent = "";
            }
        } catch (error) {
            console.error(error);
        }
    });
});
