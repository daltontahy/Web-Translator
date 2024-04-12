document.getElementById('translation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var inputText = document.getElementById('input-text').value;
    var language = document.getElementById('language').value; // Get the selected language

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
