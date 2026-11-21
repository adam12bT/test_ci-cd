package seleniumScripts;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class WorkingWithChrome {

	ChromeDriver driver;

	// The website must be running with Live Server (Go Live) before you run the tests.
	String baseUrl = "http://127.0.0.1:5500/";

	/** Opens Chrome on the home page. Selenium finds the right driver by itself. */
	public void invokeBrowser() {
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--headless=new", "--no-sandbox", "--disable-dev-shm-usage");
		driver = new ChromeDriver(options);
		// When an element is not found right away, keep looking for up to 2 seconds.
		driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
		driver.get(baseUrl + "index.html");
	}

	public void closeDriver() {
		if (driver != null) {
			driver.quit();
		}
	}

	public String getTitleforTest() {
		return driver.getTitle();
	}

	/** Returns true if an element with this id exists on the current page. */
	public boolean isElementPresent(String id) {
		return !driver.findElements(By.id(id)).isEmpty();
	}

	// ==================== PART 1: already implemented, use these in your tests ====================

	/** Opens the sign in page, fills in the form and submits it. */
	public void login(String email, String password) {
		driver.get(baseUrl + "login.html");
		driver.findElement(By.id("login-email")).sendKeys(email);
		driver.findElement(By.id("login-password")).sendKeys(password);
		driver.findElement(By.id("login-button")).click();
	}

	/** Returns true if a user is signed in (the Logout link is displayed). */
	public boolean isLoggedIn() {
		return isElementPresent("nav-logout");
	}

	/** Returns true if the sign in page shows an error message. */
	public boolean isLoginErrorDisplayed() {
		return isElementPresent("login-error");
	}

	/** Opens the sign up page, fills in the form and submits it. Pass "" to leave a field empty. */
	public void signUp(String name, String email, String password) {
		driver.get(baseUrl + "signup.html");
		driver.findElement(By.id("signup-name")).sendKeys(name);
		driver.findElement(By.id("signup-email")).sendKeys(email);
		driver.findElement(By.id("signup-password")).sendKeys(password);
		driver.findElement(By.id("signup-button")).click();
	}

	/** Returns true if the message confirming the new account is displayed. */
	public boolean isSignUpSuccessful() {
		return isElementPresent("signup-success");
	}

	/** Returns true if the sign up page shows an error message. */
	public boolean isSignUpErrorDisplayed() {
		return isElementPresent("signup-error");
	}

	/** Opens the account page. A user must be signed in. */
	public void openAccountPage() {
		driver.get(baseUrl + "account.html");
	}

	/** Opens the account page, replaces the name and phone number and saves. A user must be signed in. */
	public void editAccountInformation(String newName, String newPhone) {
		openAccountPage();
		WebElement name = driver.findElement(By.id("account-name"));
		name.clear();
		name.sendKeys(newName);
		WebElement phone = driver.findElement(By.id("account-phone"));
		phone.clear();
		phone.sendKeys(newPhone);
		driver.findElement(By.id("account-save")).click();
	}

	/** Returns true if the message confirming the changes were saved is displayed. */
	public boolean isAccountSaved() {
		return isElementPresent("account-success");
	}

	/** Returns the name currently shown in the account form. */
	public String getAccountName() {
		return driver.findElement(By.id("account-name")).getDomProperty("value");
	}

	/** Returns the phone number currently shown in the account form. */
	public String getAccountPhone() {
		return driver.findElement(By.id("account-phone")).getDomProperty("value");
	}

	/** Opens the page of a product from the home page and clicks Add to cart. */
	public void addProductToCart(String productName) {
		driver.get(baseUrl + "index.html");
		driver.findElement(By.linkText(productName)).click();
		driver.findElement(By.id("add-to-cart")).click();
	}

	/** Opens the cart page and clicks the Remove button of this product. */
	public void removeProductFromCart(String productName) {
		driver.get(baseUrl + "cart.html");
		driver.findElement(By.xpath("//li[span[text()='" + productName + "']]//button")).click();
	}

	/** Opens the cart page and returns true if this product is in the cart. */
	public boolean isProductInCart(String productName) {
		driver.get(baseUrl + "cart.html");
		return !driver.findElements(By.xpath("//li[span[text()='" + productName + "']]")).isEmpty();
	}

	// ==================== PART 2: complete these functions, then use them in your tests ====================
	// Tip: look at the Part 1 functions above for examples. To find the id of an element,
	// right-click it on the website in Chrome and choose Inspect.

	/** Types a keyword in the search bar and clicks the Search button. */
	public void searchForProduct(String keyword) {
		// Hint 1: go to the home page
		// Hint 2: find the search bar by its id and type the keyword with sendKeys(...)
		// Hint 3: find the button by its id and click() it
	}

	/** Returns how many products are displayed on the page. */
	public int getSearchResultCount() {
		// Hint 1: inspect the html and find the class name that displayed products share. 
		// Hint 2: findElements(...) returns a List of all matching elements: By.className("...")
		// Hint 3: return the size() of the list
		return 0; // replace this line with it
	}

	/** Clicks on a product by its exact name to open its page. */
	public void openProductPage(String productName) {
		// Hint: product names are links, so you can find one with By.linkText(productName) and click() it
	}

	/** Returns the name displayed on the product page. */
	public String getProductName() {
		// Hint: find the element with the id given to the product name and return its getText()
		return ""; // replace this line
	}

	/** Returns the price displayed on the product page. */
	public String getProductPrice() {
		// Hint: same idea as getProductName(), but with the id given to product price.
		return ""; // replace this line
	}

	/** Returns the description displayed on the product page. */
	public String getProductDescription() {
		// Hint: same idea as getProductName(), but with the id given to product desc.
		return ""; // replace this line
	}
}
