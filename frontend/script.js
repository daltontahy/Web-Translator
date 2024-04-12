document.getElementById('translation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var inputText = document.getElementById('input-text').value;

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
    xhr.send(JSON.stringify({text: inputText}));
});