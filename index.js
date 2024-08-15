const expenseForm = document.getElementById("expense-form");
const expensesList = document.getElementById("expenses-list");
let expenses = [];
let editingIndex = null;

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  let expenseObj = { amount, description, category };

  if (editingIndex !== null) {
    expenses[editingIndex] = expenseObj;
    editingIndex = null;
  } else {
    addExpense(expenseObj);
  }

  displayExpenses(expenses);
  expenseForm.reset();
});

// Display Expenses
function displayExpenses(expenses) {
  expensesList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const btnContainer = document.createElement('span');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right', 'delete-btn');
    deleteBtn.addEventListener('click', function () {
      deleteExpense(index);
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'float-right', 'edit-btn');
    editBtn.addEventListener('click', function () {
      document.getElementById("amount").value = expense.amount;
      document.getElementById("description").value = expense.description;
      document.getElementById("category").value = expense.category;
      editingIndex = index;
    });

    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(editBtn);

    li.textContent = `${expense.amount} ${expense.description} (${expense.category}) `;
    li.appendChild(btnContainer);

    expensesList.appendChild(li);
  });
}

// Add Expense
function addExpense(expense) {
  expenses.push(expense); 
}


// Delete Expense 
function deleteExpense(index) {
  expenses = expenses.filter((_, i) => i !== index); 
  displayExpenses(expenses);
}

