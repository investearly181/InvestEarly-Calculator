let chart;

function parseNumber(value) {
    return parseFloat(value.replace(/,/g, '')) || 0;
}

function formatNumber(value) {
    return value.toLocaleString('en-IN');
}

function formatInput(input) {
    let value = input.value.replace(/,/g, '');
    if (!isNaN(value) && value !== '') {
        input.value = Number(value).toLocaleString('en-IN');
    }
}

function calculate() {
    let salaryInput = document.getElementById("salary").value;
    let expensesInput = document.getElementById("expenses").value;
    let goalInput = document.getElementById("goal").value;
    let risk = document.getElementById("risk").value;

    let salary = parseNumber(salaryInput);
    let expenses = parseNumber(expensesInput);
    let goal = parseNumber(goalInput);

    if (salary === 0 || expenses === 0 || goal === 0) {
        alert("Please fill in all fields correctly.");
        return;
    }

    let availableInvestment = salary - expenses;

    let fd = 0, mutualFunds = 0, stocks = 0, gold = 0, crypto = 0, emergencyFund = 0;
    let annualReturnRate;

    if (risk === "Low") {
        fd = availableInvestment * 0.40;
        mutualFunds = availableInvestment * 0.20;
        stocks = availableInvestment * 0.10;
        gold = availableInvestment * 0.10;
        crypto = availableInvestment * 0.05;
        emergencyFund = availableInvestment * 0.20;
        annualReturnRate = 0.06;
    } else if (risk === "Medium") {
        fd = availableInvestment * 0.30;
        mutualFunds = availableInvestment * 0.25;
        stocks = availableInvestment * 0.20;
        gold = availableInvestment * 0.10;
        crypto = availableInvestment * 0.10;
        emergencyFund = availableInvestment * 0.05;
        annualReturnRate = 0.10;
    } else if (risk === "High") {
        fd = availableInvestment * 0.32;
        mutualFunds = availableInvestment * 0.16;
        stocks = availableInvestment * 0.08;
        gold = availableInvestment * 0.08;
        crypto = availableInvestment * 0.04;
        emergencyFund = availableInvestment * 0.20;
        annualReturnRate = 0.15;
    }

    let annualInvestment = availableInvestment * 12;

    let estimatedYears = Math.log((goal * annualReturnRate / annualInvestment) + 1) / Math.log(1 + annualReturnRate);

    if (isNaN(estimatedYears) || estimatedYears < 0) {
        estimatedYears = 0;
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        💰 Available Investment: ₹${formatNumber(availableInvestment)}<br>
        🏦 FD Allocation: ₹${formatNumber(fd)}<br>
        📈 Mutual Funds Allocation: ₹${formatNumber(mutualFunds)}<br>
        🧾 Stocks Allocation: ₹${formatNumber(stocks)}<br>
        🪙 Gold Allocation: ₹${formatNumber(gold)}<br>
        ₿ Crypto Allocation: ₹${formatNumber(crypto)}<br>
        🚨 Emergency Fund: ₹${formatNumber(emergencyFund)}<br>
        ⏳ Estimated Years to Reach Goal: ${estimatedYears.toFixed(1)} years
    `;
    resultDiv.classList.add('show');

    drawChart(fd, mutualFunds, stocks, gold, crypto, emergencyFund);
}

function drawChart(fd, mutualFunds, stocks, gold, crypto, emergencyFund) {
    const ctx = document.getElementById('investmentChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['FD', 'Mutual Funds', 'Stocks', 'Gold', 'Crypto', 'Emergency Fund'],
            datasets: [{
                data: [fd, mutualFunds, stocks, gold, crypto, emergencyFund],
                backgroundColor: [
                    '#0074D9', '#2ECC40', '#FF851B', '#FFDC00', '#FF4136', '#B10DC9'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateScale: true
            }
        }
    });
}

function clearFields() {
    document.getElementById("salary").value = '';
    document.getElementById("expenses").value = '';
    document.getElementById("goal").value = '';
    document.getElementById("risk").selectedIndex = 0;
    document.getElementById("result").innerHTML = '';
    document.getElementById("result").classList.remove('show');
    if (chart) {
        chart.destroy();
    }
}
