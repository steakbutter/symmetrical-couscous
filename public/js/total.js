const ctx = document.getElementById('myChart');

// Fetch data of transactions made by the user 
const fetchData = async () => {
  try {
    // Here is located the transactions info
    const response = await fetch(`/api/transactions`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    })
    //return just the transactions made by the user
    const data = await response.json();
    const transactions = data.transactions;
    return transactions;
    
  } catch (err) {
    console.error('Error fetching data.', err);
  }
};

// Create variables of income and expense
let income = 0;
let expense = 0;

// Run fetchData
fetchData()
.then(data => {
  // For loop to get the info just by their type and added to the variables, depending if it's income or expense
  for (i=0; i<data.length; i++){
    if (data[i].type === 'income'){
      income += parseFloat(data[i].amount);
    } else {
      expense += parseFloat(data[i].amount);
    }
  }
  return income, expense;
})
.then(() => {
  // Obtener el contexto del canvas
  var ctx = document.getElementById('myChart').getContext('2d');

  // Crear el gráfico
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        label: 'Transactions',
        data: [income, expense],
        borderWidth: 1,
        backgroundColor: ['#36A2EB', '#FF6384'], // Puedes cambiar los colores según tu preferencia
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});



