package seleniumScripts;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class TestGenerator {

	public WorkingWithChrome connection;

	// Runs before each test: every test starts in a new browser with fresh website data.
	@Before
	public void setUp() {
		connection = new WorkingWithChrome();
		connection.invokeBrowser();
	}

	// Runs after each test.
	@After
	public void tearDown() {
		connection.closeDriver();
	}

	@Test
	public void TestingWebsiteTitle() {
		assertEquals("TestMart - Online Store", connection.getTitleforTest());
	}

	@Test
	public void TestingLoginSuccess() {
		connection.login("student@example.com", "Test1234");

		assertTrue(connection.isLoggedIn());
	}

	@Test
	public void TestingLoginFalsePassword() {
		connection.login("student@example.com", "WrongPassword");

		assertTrue(connection.isLoginErrorDisplayed());
		assertFalse(connection.isLoggedIn());
	}

	@Test
	public void TestingSignUpSuccess() {
		connection.signUp("New Student", "new.student@example.com", "Pass1234");

		assertTrue(connection.isSignUpSuccessful());
	}

	@Test
	public void TestingAddAndRemoveFromCart() {
		connection.addProductToCart("Nova Laptop 14");
		assertTrue(connection.isProductInCart("Nova Laptop 14"));

		connection.removeProductFromCart("Nova Laptop 14");
	}

	@Test
	public void TestingEditAccountInformation() {
		connection.login("student@example.com", "Test1234");
		connection.editAccountInformation("Edited Name", "98765432");

		assertTrue(connection.isAccountSaved());
		assertEquals("Edited Name", connection.getAccountName());
	}
}
