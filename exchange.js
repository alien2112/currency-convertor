const amount = document.getElementById('amount');
const currency = document.getElementById('currency');
const currency2 = document.getElementById('currency2');
const convert = document.getElementById('convert');
const result = document.getElementById('result');
const API_KEY = "eHvCt4mLJkhtHT2R1VAuqQ==gYpDl9pe3sMvyFxG";

// Conversion function
function convertCurrency() {
    const amountTotal = amount.value;
    const have = currency.value;
    const want = currency2.value;
    const url = `https://api.api-ninjas.com/v1/convertcurrency?want=${want}&have=${have}&amount=${amountTotal}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-API-Key': API_KEY
        },
    })
    .then(res => res.json())
    .then(data => {
        const conversionResult = `${amountTotal} ${have} = ${data.new_amount} ${want}`;
        result.innerHTML = conversionResult;
        addToHistory(conversionResult);
    })
    .catch(error => {
        console.error('Request failed:', error);
        result.innerHTML = 'An error has occurred. Please try again later.';
    });
}

// Manage conversion history
function addToHistory(conversion) {
    let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history.unshift(conversion);
    if (history.length > 10) history.pop(); // Keep only the last 10 conversions
    localStorage.setItem('conversionHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    history.forEach(conversion => {
        const li = document.createElement('li');
        li.textContent = conversion;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem('conversionHistory');
    displayHistory();
}

// Manage current balance
function updateBalance() {
    const balance = parseFloat(document.getElementById('balance').value);
    const balanceCurrency = document.getElementById('balance-currency').value;

    if (isNaN(balance)) {
        alert('Please enter a valid balance');
        return;
    }

    localStorage.setItem('currentBalance', JSON.stringify({ amount: balance, currency: balanceCurrency }));
    displayBalance();
}

function displayBalance() {
    const balanceData = JSON.parse(localStorage.getItem('currentBalance'));
    if (balanceData) {
        document.getElementById('balance-display').textContent = 
            `Your current balance: ${balanceData.amount.toFixed(2)} ${balanceData.currency}`;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayHistory();
    displayBalance();

    // Populate balance currency options
    const balanceCurrencySelect = document.getElementById('balance-currency');
    [currency, currency2].forEach(select => {
        Array.from(select.options).forEach(option => {
            const newOption = option.cloneNode(true);
            balanceCurrencySelect.appendChild(newOption);
        });
    });

    convert.addEventListener('click', convertCurrency);
    document.getElementById('clear-history').addEventListener('click', clearHistory);
    document.getElementById('update-balance').addEventListener('click', updateBalance);
});
