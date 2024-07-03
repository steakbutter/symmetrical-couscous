const ctx = document.getElementById('expense-chart');

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


let totalGroceries = 0;
let totalServices = 0;
let totalMedical = 0;
let totalHome = 0;
let totalCar = 0;
let totalOthers = 0;


let category = ['Groceries', 'Services', 'Medical', 'Home','Car', 'Others'];
let incomes = []
// Run fetchData
fetchData()
.then(data => {
  // For loop to get the info just by their type and added to the variables, depending if it's income or expense
  for (i=0; i<data.length; i++){
    if (data[i].type === 'expense'){
      if (data[i].category === 'groceries'){
        totalGroceries += parseInt(data[i].amount);
      } else if (data[i].category === 'services'){
        totalServices += parseInt(data[i].amount);
      } else if (data[i].category === 'home'){
        totalHome += parseInt(data[i].amount);
      } else if (data[i].category === 'medical'){
        totalMedical += parseInt(data[i].amount);
      } else if (data[i].category === 'car'){
        totalCar += parseInt(data[i].amount);
      } else if (data[i].category === 'others'){
        totalOthers += parseInt(data[i].amount);
      }
    }
  }

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: category,
      datasets: [{
        label: 'Income transactions',
        data: [totalGroceries, totalServices, totalMedical, totalHome, totalCar, totalOthers],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});
