document.addEventListener('DOMContentLoaded', () => {
    const expenseform = document.getElementById("expense-form");
    const expenselist = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];
    let editingId = null; 

    expenseform.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const date = document.getElementById("expense-date").value;
        const category = document.getElementById("expense-category").value;

        if (editingId !== null) {
            const expense = expenses.find(expense => expense.id === editingId);
            expense.name = name;
            expense.amount = amount;
            expense.date = date;
            expense.category = category;

            editingId = null; 
        } else {
            const expense = {
                id: Date.now(),
                name,
                amount,
                category,
                date
            };

            expenses.push(expense);
        }

        displayExpenses(expenses);
        updateTotalAmount();
        expenseform.reset();
    });

    expenselist.addEventListener('click', (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotalAmount();
        }

        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const expense = expenses.find(expense => expense.id === id);
            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;
            editingId = id;
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category);
            displayExpenses(filteredExpenses);
        }
    });

    function displayExpenses(expenses) {
        expenselist.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
                <td>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>`;
            expenselist.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }
});
