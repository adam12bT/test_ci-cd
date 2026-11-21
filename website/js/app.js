// TestMart - all data is kept in the browser's localStorage. There is no server.

const PRODUCTS = [
  { id: 1, name: "Nova Laptop 14", price: "2400 TND", art: "laptop", stock: "In stock", description: "14-inch laptop with 16 GB of RAM and a 512 GB SSD." },
  { id: 2, name: "Nova Laptop 16 Pro", price: "3900 TND", art: "laptop", stock: "In stock", description: "16-inch laptop with 32 GB of RAM and a 1 TB SSD." },
  { id: 3, name: "Pulse Smartphone X", price: "1800 TND", art: "phone", stock: "In stock", description: "6.5-inch smartphone with a 50 MP camera." },
  { id: 4, name: "Pulse Smartphone Lite", price: "750 TND", art: "phone", stock: "Out of stock", description: "Affordable 6.1-inch smartphone with a two-day battery." },
  { id: 5, name: "Orbit Wireless Headphones", price: "320 TND", art: "headphones", stock: "In stock", description: "Noise-cancelling headphones with 30 hours of battery." },
  { id: 6, name: "Orbit Bluetooth Speaker", price: "210 TND", art: "speaker", stock: "In stock", description: "Waterproof portable speaker." },
  { id: 7, name: "Vista 27 Monitor", price: "950 TND", art: "monitor", stock: "In stock", description: "27-inch QHD monitor with a 144 Hz refresh rate." },
  { id: 8, name: "Swift Wireless Mouse", price: "65 TND", art: "mouse", stock: "In stock", description: "Silent ergonomic mouse with a USB receiver." },
];

// Flat drawings of each kind of product, in the page's ink and white.
const INK = 'fill="#101820"';
const WHITE = 'fill="#fff"';
const ART = {
  laptop: `<rect x="40" y="30" width="120" height="76" ${INK}/><rect x="47" y="37" width="106" height="62" ${WHITE}/><rect x="26" y="106" width="148" height="9" ${INK}/>`,
  phone: `<rect x="74" y="16" width="52" height="118" rx="7" ${INK}/><rect x="80" y="26" width="40" height="96" ${WHITE}/>`,
  headphones: `<path d="M55 92 A45 45 0 0 1 145 92" fill="none" stroke="#101820" stroke-width="9"/><rect x="42" y="84" width="22" height="40" rx="5" ${INK}/><rect x="136" y="84" width="22" height="40" rx="5" ${INK}/>`,
  speaker: `<rect x="58" y="20" width="84" height="110" rx="6" ${INK}/><circle cx="100" cy="88" r="27" ${WHITE}/><circle cx="100" cy="88" r="10" ${INK}/><circle cx="100" cy="42" r="9" ${WHITE}/>`,
  monitor: `<rect x="28" y="20" width="144" height="86" ${INK}/><rect x="35" y="27" width="130" height="72" ${WHITE}/><rect x="92" y="106" width="16" height="16" ${INK}/><rect x="68" y="122" width="64" height="7" ${INK}/>`,
  mouse: `<rect x="70" y="26" width="60" height="98" rx="30" ${INK}/><rect x="96" y="42" width="8" height="20" rx="4" ${WHITE}/>`,
};
const artSvg = (product) => `<svg viewBox="0 0 200 150" aria-hidden="true">${ART[product.art]}</svg>`;

const DEMO_USER = {
  name: "Demo Student",
  email: "student@example.com",
  password: "Test1234",
  phone: "12345678",
  address: "Tunis, Tunisia",
};

// ---------- storage helpers ----------
const read = (key, fallback) => JSON.parse(localStorage.getItem(key)) ?? fallback;
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const loadUsers = () => read("users", [DEMO_USER]);
const saveUsers = (users) => write("users", users);
const getCurrentEmail = () => read("currentUser", null);
const getCurrentUser = () => loadUsers().find((u) => u.email === getCurrentEmail()) ?? null;
const loadCart = () => read("cart", []);
const saveCart = (cart) => write("cart", cart);
const priceValue = (product) => parseInt(product.price, 10);

const $ = (id) => document.getElementById(id);
const param = (name) => new URLSearchParams(location.search).get(name);

function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
}

function showMessage(id, kind, text) {
  const old = $(id);
  if (old) old.remove();
  const message = el("p", { id, className: "message " + kind, textContent: text });
  document.querySelector(".product-info, .panel").prepend(message);
}

// ---------- header on every page ----------
function renderHeader() {
  const user = getCurrentUser();
  const cartCount = loadCart().reduce((sum, line) => sum + line.quantity, 0);
  const nav = $("nav");

  nav.append(el("a", { id: "nav-cart", href: "cart.html", textContent: "Cart (" }, el("span", { id: "cart-count", textContent: cartCount }), ")"));

  if (user) {
    nav.append(el("a", { id: "nav-account", href: "account.html", textContent: "Hello, " + user.name }));
    const logout = el("a", { id: "nav-logout", href: "index.html", textContent: "Logout" });
    logout.addEventListener("click", () => localStorage.removeItem("currentUser"));
    nav.append(logout);
  } else {
    nav.append(el("a", { id: "nav-login", href: "login.html", textContent: "Sign in" }));
    nav.append(el("a", { id: "nav-signup", href: "signup.html", textContent: "Sign up" }));
  }

  const query = param("q");
  if (query) $("search-input").value = query;
}

// ---------- pages ----------
function initHome() {
  const query = (param("q") ?? "").trim().toLowerCase();
  const matches = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query));

  $("page-heading").textContent = query ? `Results for "${param("q").trim()}"` : "All products";

  if (matches.length === 0) {
    $("product-list").replaceWith(el("p", { id: "no-results", className: "empty", textContent: "No products found." }));
    return;
  }

  for (const product of matches) {
    $("product-list").append(
      el("article", { className: "product-card" },
        el("div", { className: "product-icon art-" + product.art, innerHTML: artSvg(product) }),
        el("h3", {}, el("a", { className: "product-link", href: "product.html?id=" + product.id, textContent: product.name })),
        el("p", { className: "price", textContent: product.price })
      )
    );
  }
}

function initProduct() {
  const product = PRODUCTS.find((p) => p.id === Number(param("id")));
  if (!product) {
    $("product-details").replaceWith(el("p", { className: "empty", textContent: "Product not found." }));
    return;
  }

  document.title = product.name + " - TestMart";
  $("product-icon").className = "art-" + product.art;
  $("product-icon").innerHTML = artSvg(product);
  $("product-name").textContent = product.name;
  $("product-price").textContent = product.price;
  $("product-stock").textContent = product.stock;
  $("product-description").textContent = product.description;

  const button = $("add-to-cart");
  button.disabled = product.stock !== "In stock";
  button.addEventListener("click", () => {
    addToCart(product.id); // shop.js
    $("cart-count").textContent = loadCart().reduce((sum, l) => sum + l.quantity, 0);
    showMessage("cart-message", "success", "Added to your cart.");
  });
}

function initCart() {
  const cart = loadCart();
  const list = $("cart-items");

  if (cart.length === 0) {
    list.replaceWith(el("p", { id: "cart-empty", className: "empty", textContent: "Your cart is empty." }));
    $("cart-summary").remove();
    return;
  }

  let total = 0;
  for (const line of cart) {
    const product = PRODUCTS.find((p) => p.id === line.id);
    total += priceValue(product) * line.quantity;

    const remove = el("button", { className: "remove-item secondary", type: "button", textContent: "Remove" });
    remove.addEventListener("click", () => {
      removeFromCart(line.id); // shop.js
      location.reload();
    });

    list.append(
      el("li", { className: "cart-item" },
        el("span", { className: "cart-item-name", textContent: product.name }),
        el("span", { className: "cart-item-quantity", textContent: "Quantity: " + line.quantity }),
        el("span", { className: "price", textContent: product.price }),
        remove
      )
    );
  }
  $("cart-total").textContent = total + " TND";
}

function initLogin() {
  if (param("registered")) {
    showMessage("signup-success", "success", "Your account was created. You can now sign in.");
  }

  $("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = $("login-email").value.trim();
    const password = $("login-password").value;
    const user = findAccount(email, password); // shop.js

    if (!user) {
      showMessage("login-error", "error", "Incorrect email or password.");
      return;
    }
    write("currentUser", user.email);
    location.href = "account.html";
  });
}

function initSignup() {
  $("signup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("signup-name").value.trim();
    const email = $("signup-email").value.trim();
    const password = $("signup-password").value;
    const users = loadUsers();

    if (!isSignUpFormComplete(name, email, password)) { // shop.js
      showMessage("signup-error", "error", "All fields are required.");
      return;
    }
    if (users.some((u) => u.email === email)) {
      showMessage("signup-error", "error", "An account with this email already exists.");
      return;
    }
    createAccount(name, email, password); // shop.js
    location.href = "login.html?registered=1";
  });
}

function initAccount() {
  const user = getCurrentUser();
  if (!user) {
    location.href = "login.html";
    return;
  }

  $("account-name").value = user.name;
  $("account-email").value = user.email;
  $("account-phone").value = user.phone;
  $("account-address").value = user.address;

  $("account-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("account-name").value.trim();
    if (!name) {
      showMessage("account-error", "error", "Full name is required.");
      return;
    }
    saveAccount(user.email, name, $("account-phone").value.trim(), $("account-address").value.trim()); // shop.js
    $("account-error")?.remove();
    $("nav-account").textContent = "Hello, " + name;
    showMessage("account-success", "success", "Your information was saved.");
  });
}

// ---------- start ----------
renderHeader();
({ home: initHome, product: initProduct, cart: initCart, login: initLogin, signup: initSignup, account: initAccount })[document.body.dataset.page]();
