const apiKey = '516eec3b5f358c65a1e8c407';  
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const currencyNames = {
    "USD": "American Dollar",
    "TRY": "Turkish Lira",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "INR": "Indian Rupee",
    "CNY": "Chinese Yuan",
    "BRL": "Brazilian Real",
};

document.addEventListener("DOMContentLoaded", function() {
    populateCurrencyOptions();
});

async function populateCurrencyOptions() {
    try {
        const response = await fetch(`${apiUrl}USD`);
        const data = await response.json();
        
        const currencyCodes = Object.keys(data.conversion_rates);
        const fromCurrencySelect = document.getElementById("fromCurrency");
        const toCurrencySelect = document.getElementById("toCurrency");

        currencyCodes.forEach(currency => {
            const currencyName = currencyNames[currency] ? ` - ${currencyNames[currency]}` : "";
            
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = `${currency}${currencyName}`;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = `${currency}${currencyName}`;
            toCurrencySelect.appendChild(option2);
        });
    } catch (error) {
        console.error("Error fetching currency list:", error);
    }
}

function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") { 
        document.getElementById("login-page").style.display = "none";
        document.getElementById("converter-page").style.display = "block";
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${fromCurrency}`);
        const data = await response.json();

        const conversionRate = data.conversion_rates[toCurrency];
        if (conversionRate) {
            const convertedAmount = (amount * conversionRate).toFixed(2);
            document.getElementById("convertedAmount").value = convertedAmount;
        } else {
            alert("Conversion rate not available for the selected currencies.");
        }
    } catch (error) {
        console.error("Error fetching conversion rate:", error);
        alert("There was an error with the currency conversion. Please try again.");
    }
}
