// Load expenses from local storage if available
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Render expenses table
function renderTable() {
    const tableBody = $('#expenseTable tbody');
    tableBody.empty();
    expenses.forEach((expense, index) => {
        const row = `
            <tr>
                <td>${expense.amount}</td>
                <td>${expense.description}</td>
                <td>${expense.category}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
                    <button class="btn btn-primary btn-sm" onclick="editExpense(${index})">Edit</button>
                </td>
            </tr>`;
        tableBody.append(row);
    });
}

// Add new expense
$('#expenseForm').submit(function (event) {
    event.preventDefault();
    const expenseAmount = $('#expenseAmount').val();
    const expenseDesc = $('#expenseDesc').val();
    const expenseCategory = $('#expenseCategory').val();

    const newExpense = {
        amount: expenseAmount,
        description: expenseDesc,
        category: expenseCategory
    };

    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderTable();
    this.reset();
});

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderTable();
}

// Edit expense
function editExpense(index) {
    const expense = expenses[index];
    $('#expenseAmount').val(expense.amount);
    $('#expenseDesc').val(expense.description);
    $('#expenseCategory').val(expense.category);

    deleteExpense(index);
}

// Initial table rendering
renderTable();