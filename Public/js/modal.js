// let displayData = document.getElementById('displayData');
// let form = document.getElementById('transactionForm');

// form.addEventListener('submit', function(event) {
//   event.preventDefault(); 
//   let type = document.getElementById('transactionType').value;
//   let amount = document.getElementById('amount').value;
//   let category = document.getElementById('category').value;
//   let date = document.getElementById('date').value;

//   displayData.innerHTML = "<h3>Transaction:</h3><p>Type: " + type + "</p><p>Amount: " + amount + "</p><p>Category: " + category + "</p><p>Date: " + date + "</p>";
// })



// -------------------------------------------------------------------------------------------------
// const newTransactionHandler = async (event) => {
//   console.log('Connected');
//   event.preventDefault();

//   const type = document.getElementById('#transactionType').value;
//   const amount = document.getElementById('#amount').value;
//   const category = document.getElementById('#category').value;
//   const date = document.getElementById('#date').value;

//   if (type && amount && category) {
//     const response = await fetch(`/api/transactions`, {
//       method: 'POST',
//       body: JSON.stringify({ type, amount, category, date}),
//       headers: {
//         'Content/type': 'application/json',
//       }
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert('Failed to add a transaction');
//     }
//   }
// };

// document.querySelector('#transactionForm').addEventListener('submit', newTransactionHandler);