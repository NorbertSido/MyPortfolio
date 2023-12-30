// Search id-s
const inputField = document.getElementById('text-input');
const palindromBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

// Nothing value alert
function alertClick(input) {
    if (input.value == "") alert('Please input a value')
    return;
}

// Palindrome answer
function palindrome() {
    
    let cleanedInput = inputField.value.replace(/[^a-z0-9]/gi, "").toLowerCase();
    let reverseInput = cleanedInput.split('').reverse().join('');
    resultDiv.innerHTML = "";

    if (inputField.value !== "") {
        let p = document.createElement('p');
        p.className = "resultP";
        p.innerHTML = ""
        resultDiv.appendChild(p)

        if (cleanedInput === reverseInput) {
            p.innerHTML = inputField.value + ' is a palindrome!';
        }
        else {
            p.innerHTML = inputField.value + ' is not a palindrome!'
        }
    }
    else alertClick(inputField)
}