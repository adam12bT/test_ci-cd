// =====================================================================
// TestMart - the rules of the shop
//
// The website calls these functions when a user signs in, signs up,
// uses the cart or edits their account. This is JavaScript, but it
// reads almost like Java:
//
//   let x = 5;              declares a variable (no type needed)
//   ==  !=  &&  ||  !       work like in Java
//   list.length             size of a list    (like list.size() in Java)
//   list[i]                 element number i  (like list.get(i) in Java)
//   list.push(x)            adds x at the end (like list.add(x) in Java)
//   user.email              a field of an object, like in Java
//
// loadUsers(), saveUsers(users), loadCart() and saveCart(cart) read and
// save the data in the browser. You do not need to look at them.
// =====================================================================


// ----- Sign in -----
// Returns the account that has this email AND this password,
// or null if there is no such account.
function findAccount(email, password) {
    let users = loadUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            return users[i];
        }
    }
    return null;
}


// ----- Sign up -----
// Returns true if every field of the sign up form is filled in.
function isSignUpFormComplete(name, email, password) {
    if (name == "" || email == "" || password == "") {
        return false;
    }
    return true;
}

// Creates a new account and saves it.
function createAccount(name, email, password) {
    let users = loadUsers();
    users.push({ name: name, email: email, password: password, phone: "", address: "" });
    // BUG: changes are not persisted.
}


// ----- Cart -----
// Adds one unit of a product to the cart.
function addToCart(productId) {
    let cart = loadCart();
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            cart[i].quantity = cart[i].quantity + 1;
            saveCart(cart);
            return;
        }
    }
    cart.push({ id: productId, quantity: 1 });
    saveCart(cart);
}

// Removes a product from the cart.
function removeFromCart(productId) {
    let cart = loadCart();
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id != productId) {
            newCart.push(cart[i]);
        }
    }
    saveCart(cart); // BUG: original cart saved
}


// ----- My account -----
// Saves the new name, phone and address of the account with this email.
function saveAccount(email, name, phone, address) {
    let users = loadUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            users[i].name = name;
            users[i].phone = phone;
            users[i].address = address;
        }
    }
    // BUG: changes are not persisted.
}
