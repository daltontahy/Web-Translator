document.getElementById('translation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var inputText = document.getElementById('input-text').value;
    var language = "es";
    language = document.getElementById('language').value; // Get the selected language

    // Send AJAX request to translation endpoint
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/translate', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('translated-text').textContent = response.translated_text;

            // Add the translation to the history
            addToTranslationHistory({
                input_text: inputText,
                translated_text: response.translated_text,
                target_lang: language
            });
        } else {
            console.error('Error:', xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send(JSON.stringify({text: inputText, language: language}));
});

// Function to set the language when a language is selected from the dropdown menu
document.getElementById('language-dropdown').addEventListener('change', function() {
    // Set the value of the hidden input field to the selected language from the dropdown menu
    document.getElementById('language').value = this.value;
});


// Function to fetch and display translation history
function fetchTranslationHistory() {
    // Retrieve translation history from local storage
    console.log(localStorage.getItem('translation_history'));
    const history = JSON.parse(localStorage.getItem('translation_history')) || [];
    displayTranslationHistory(history);
}

// Function to display translation history on the webpage
function displayTranslationHistory(history) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; // Clear existing history

    history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Input Text:</strong> ${item.input_text}<br>
            <strong>Translated Text:</strong> ${item.translated_text}<br>
            <strong>Target Language:</strong> ${item.target_lang}<br><br>
        `;
        historyList.appendChild(listItem);
    });
}

// Function to add a translation to the history and update the displayed history
function addToTranslationHistory(item) {
    // Retrieve current history from local storage
    const history = JSON.parse(localStorage.getItem('translation_history')) || [];
    // Add new item to history
    history.push(item);
    // Store updated history in local storage
    localStorage.setItem('translation_history', JSON.stringify(history));

    // Update displayed history
    displayTranslationHistory(history);
}

// Function to clear translation history
function clearTranslationHistory() {
    // Clear translation history from local storage
    localStorage.removeItem('translation_history');
    // Refresh displayed history
    fetchTranslationHistory();
}

// Call fetchTranslationHistory when the page loads or when the user requests it
window.onload = fetchTranslationHistory;



// Function to toggle the visibility of the translation history container
document.getElementById('show-history-btn').addEventListener('click', function() {
    var historyContainer = document.getElementById('translation-history-container');
    if (historyContainer.style.display === 'none') {
        historyContainer.style.display = 'block';
        fetchTranslationHistory(); // Fetch and display history when shown
    } else {
        historyContainer.style.display = 'none';
    }
});


/** COMMENT OUT DOTS CODE
// Number of dots to be placed
const numDots = 35;

// Function to generate random coordinates
function getRandomCoordinate(max) {
    return Math.floor(Math.random() * max);
}

// Function to check if a point is within a rectangle
function isPointInsideRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}


// Function to create dots
function createDots() {
    const body = document.querySelector('body');
    const bodyWidth = body.offsetWidth;
    const bodyHeight = body.clientHeight;

    const inputBox = document.getElementById('input-text'); // Assuming your input box has id 'input-text'
    const inputBoxRect = inputBox.getBoundingClientRect(); // Get the bounding rectangle of the input box

    for (let i = 0; i < numDots; i++) {
        let dotX = getRandomCoordinate(bodyWidth);
        let dotY = getRandomCoordinate(bodyHeight);

        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        body.appendChild(dot);
    }
}


// Create dots when the page loads
window.onload = createDots;
*/