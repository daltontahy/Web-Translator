// This script sends a POST request to the backend when the form is submitted
document.getElementById('translation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var inputText = document.getElementById('input-text').value;
    // By default, translate to English (or any default language you want)
    var language = document.getElementById('language').value; // Get the selected language

    // Send AJAX request to translation endpoint
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/translate', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('translated-text').textContent = response.translated_text;
        } else {
            console.error('Error:', xhr.status);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send(JSON.stringify({text: inputText, language: language}));
});


// oncall function to set the button langauges
function setLanguage(language) {
    // Simply set the language variable without sending a request
    document.getElementById('language').value = language;
}
