// Initialize an empty users array if it doesn't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Function to handle user signup
function signup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('User already exists. Please log in.');
        return;
    }

    // Add new user to users array
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! You can now log in.');
}

// Function to handle user login
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));

    // Check user credentials
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        // Store current user in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = 'books.html'; // Redirect to books page
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Function to handle book purchase
function purchaseBook(bookName) {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const phoneNumber = document.getElementById('phone').value;
    const name = document.getElementById('name').value; // Add name input

    if (!user.email) {
        alert('Please log in to purchase a book.');
        return;
    }

    const purchaseData = {
        book: bookName,
        user: user.email,
        phone: phoneNumber,
        name: name, // Store the name
        timestamp: new Date().toISOString()
    };

    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    purchases.push(purchaseData);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    
    alert('Purchase successful! Book: ' + bookName);
    window.location.href = 'books.html'; // Redirect back to books page
}

// Function to validate access code in data.html
window.validateAccess = function() {
    const inputCode = document.getElementById('accessCode').value;
    const correctCode = 'anas8989';

    if (inputCode === correctCode) {
        displayData();
    } else {
        alert('Invalid access code. Please try again.');
    }
};

// Function to display data in data.html
function displayData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    const dataBody = document.getElementById('dataBody');

    if (dataBody) {
        dataBody.innerHTML = '';

        // Combine user data and purchase data for display
        purchases.forEach(purchase => {
            const user = users.find(user => user.email === purchase.user);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user ? user.email : 'N/A'}</td>
                <td>${user ? user.password : 'N/A'}</td>
                <td>${purchase.book}</td>
                <td>${purchase.phone}</td>
                <td>${purchase.name}</td>
                <td>${purchase.timestamp}</td>
            `;
            dataBody.appendChild(row);
        });

        document.getElementById('dataTable').style.display = 'block'; // Show the data table
    }
}
