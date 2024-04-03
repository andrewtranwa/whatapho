document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'a67d01465805eabc466a03839cb395e2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Bellingham,WA,USA&appid=${apiKey}&units=imperial`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const temp = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherDiv = document.getElementById('weather');
        weatherDiv.innerHTML = `Current Weather: ${weatherDescription} - ${temp}°F`;
        recommendDish(temp, weatherDescription);
    })
    .catch(error => console.error('Error:', error));

    // Initialize the first menu item
    showMenu('pho');
});

function showMenu(category) {
    const sections = document.querySelectorAll('.menu-category');

    // Hide all sections
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(category);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Update the active state on the menu
    updateMenuActiveState(category);
}

function recommendDish(temp, weatherDescription) {
    let recommendation = '';
    if (temp <= 50) {
        recommendation = 'It\'s chilly! Warm up with our comforting <a href="javascript:void(0);" onclick="showAndScrollToItem(\'pho\', \'pho-bo\')">Phở Bò</a> or a hot bowl of <a href="javascript:void(0);" onclick="showAndScrollToItem(\'soups\', \'bun-bo-hue\')">Bún Bò Huế</a>.';
    } else if (weatherDescription.includes('rain')) {
        recommendation = 'Rainy day? Our <a href="javascript:void(0);" onclick="showAndScrollToItem(\'pho\', \'pho-ga\')">Phở Gà</a> and a hot cup of <a href="javascript:void(0);" onclick="showAndScrollToItem(\'drinks\', \'ca-phe-sua-da\')">Cà Phê Sữa Đá</a> will make it better!';
    } else if (temp >= 77) {
        recommendation = 'It\'s warm outside! Try our refreshing <a href="javascript:void(0);" onclick="showAndScrollToItem(\'pho\', \'veggie-pho\')">Veggie Phở</a> or a cool <a href="javascript:void(0);" onclick="showAndScrollToItem(\'drinks\', \'bubble-tea\')">Bubble Tea</a>.';
    } else {
        recommendation = 'Enjoy a perfect day with our <a href="javascript:void(0);" onclick="showAndScrollToItem(\'pho\', \'pho-bo\')">Phở Bò</a>!';
    }
    const dishDiv = document.getElementById('dish');
    dishDiv.innerHTML = recommendation;
}

function updateMenuActiveState(activeCategory) {
    const menuItems = document.querySelectorAll('#menu nav ul li');
    menuItems.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('onclick') === `showMenu('${activeCategory}')`) {
            item.classList.add('active');
        }
    });
}

function showAndScrollToItem(category, itemId) {
    showMenu(category);
    setTimeout(() => {
        const item = document.getElementById(itemId);
        if (item) {
            item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100); // Delay to allow for section display transition
}
