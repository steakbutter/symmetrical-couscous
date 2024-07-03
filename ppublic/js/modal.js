const newTransactionHandler = async (event) => {

  event.preventDefault();

  const type = document.querySelector('#transaction-type').value;
  const amount = document.querySelector('#transaction-amount').value;
  const category = document.querySelector('#transaction-category').value;
  const date = new Date().toJSON();
  

  console.log(type, amount, category, date);
  if (type && amount && category) {
    const response = await fetch(`/api/transactions`, {
      method: 'POST',
      body: JSON.stringify({ type, amount, category, date}),
      headers: {
        'Content-type': 'application/json',
      }
    });

    console.log(response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add a transaction');
    }
  }
};

document.querySelector('#transaction-form').addEventListener('submit', newTransactionHandler);