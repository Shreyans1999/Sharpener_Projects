// script.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Function to render expenses
    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach(function (expense, index) {
            const expenseItem = document.createElement("div");
            expenseItem.classList.add("expense-item", "list-group-item", "d-flex", "justify-content-between", "align-items-center");
            expenseItem.innerHTML = `
                <span>${expense.amount} - ${expense.category} - ${expense.description}</span>
                <div>
                    <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
                    <button class="btn btn-sm btn-primary edit-btn" data-index="${index}">Edit</button>
                </div>`;
            expenseList.appendChild(expenseItem);
        });
    }

    // Initial rendering
    renderExpenses();

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const amount = document.getElementById("expense-amount").value;
        const description = document.getElementById("expense-description").value;
        const category = document.getElementById("expense-category").value;

        if (amount && description && category) {
            const expense = {
                amount: amount,
                description: description,
                category: category
            };

            expenses.push(expense);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses();

            // Clear form fields
            document.getElementById("expense-amount").value = "";
            document.getElementById("expense-description").value = "";
            document.getElementById("expense-category").selectedIndex = 0;
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Event delegation for delete and edit buttons
    expenseList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses();
        } else if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            const expense = expenses[index];
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-description").value = expense.description;
            document.getElementById("expense-category").value = expense.category;
            expenses.splice(index, 1);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses();
        }
    });
});
