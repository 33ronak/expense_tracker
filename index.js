const expenseForm = document.getElementById("expense-form");
const expensesList = document.getElementById("expenses-list");

// Save expenses to local storage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load expenses from local storage
function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses"));
  if (expenses) {
    return expenses;
  } else {
    return [];
  }
}

// Display expenses on the screen
function displayExpenses(expenses) {
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
      <strong>${expense.amount}</strong> ${expense.description} (${expense.category})
      <button class="btn btn-danger btn-sm float-right delete-btn" data-id="${expense.id}">Delete</button>
      <button class="btn btn-warning btn-sm float-right edit-btn" data-id="${expense.id}">Edit</button>
    `;
    expensesList.appendChild(li);
  });
}

// Add expense
function addExpense(expense) {
    const expenses = loadExpenses();
    expense.id = new Date().getTime(); // set unique id
    expenses.push(expense);
    saveExpenses(expenses);
    displayExpenses(expenses);
  }

// Delete expense
function deleteExpense(id) {
    const expenses = loadExpenses();
    const updatedExpenses = expenses.filter((expense) => expense.id !== parseInt(id));
    saveExpenses(updatedExpenses);
    displayExpenses(updatedExpenses);
  }

// Edit expense
function editExpense(id, newDescription) {
    const expenses = loadExpenses();
    const expenseToEdit = expenses.find((expense) => expense.id === parseInt(id));
    expenseToEdit.description = newDescription;
    saveExpenses(expenses);
    displayExpenses(expenses);
  }

// Event listeners
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const id = new Date().getTime();
  addExpense({ amount, description, category, id });
  expenseForm.reset();
});

expensesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteExpense(e.target.dataset.id);
  } else if (e.target.classList.contains("edit-btn")) {
    const newDescription = prompt("Enter a new description");
    editExpense(e.target.dataset.id, newDescription);
  }
});

// Load expenses when the page loads
window.addEventListener("load", () => {
  const expenses = loadExpenses();
  displayExpenses(expenses);
});