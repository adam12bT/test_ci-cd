package seleniumScripts;

import java.nio.file.*;
import org.openqa.selenium.OutputType;

/** Independent browser observations of the deployed site, not part of the graded suite. */
public class PublishedSiteProbe {
    static WorkingWithChrome page;
    static Path output;
    static void check(String label, boolean condition) {
        System.out.println(label + ": " + condition);
        if (!condition) throw new AssertionError(label);
    }
    static void capture(String name) throws Exception {
        Files.write(output.resolve(name + ".png"), page.driver.getScreenshotAs(OutputType.BYTES));
    }
    public static void main(String[] args) throws Exception {
        String mode = args[0];
        output = Path.of(args[1]);
        Files.createDirectories(output);
        page = new WorkingWithChrome();
        page.baseUrl = "https://adam12bt.github.io/test_ci-cd/";
        try {
            page.invokeBrowser();
            page.driver.manage().window().setSize(new org.openqa.selenium.Dimension(1280, 1000));
            if (mode.equals("51a-wrong-password-bug")) {
                page.login("student@example.com", "WrongPassword");
                check("Published site refuses wrong password", page.isLoginErrorDisplayed() && !page.isLoggedIn());
                capture("published-wrong-password-refused");
            } else if (mode.equals("52a-title-bug")) {
                check("Published home title remains correct", page.getTitleforTest().equals("TestMart - Online Store"));
                capture("published-original-title");
            } else if (mode.equals("53a-empty-password-missed")) {
                page.signUp("Empty Password", "published.empty@example.com", "");
                check("Published site incorrectly accepts empty password", page.isSignUpSuccessful());
                capture("published-empty-password-created");
                page.login("published.empty@example.com", "");
                check("Empty-password account can sign in", page.isLoggedIn());
                capture("published-empty-password-login");
            } else if (mode.equals("54a-three-bugs-missed")) {
                page.signUp("Unsaved User", "published.unsaved@example.com", "Pass1234");
                check("Signup displays success", page.isSignUpSuccessful());
                page.login("published.unsaved@example.com", "Pass1234");
                check("New account was not persisted", page.isLoginErrorDisplayed() && !page.isLoggedIn());
                capture("published-account-not-created");
                page.addProductToCart("Nova Laptop 14");
                page.removeProductFromCart("Nova Laptop 14");
                check("Removed product is still in cart", page.isProductInCart("Nova Laptop 14"));
                capture("published-cart-removal-broken");
                page.login("student@example.com", "Test1234");
                page.editAccountInformation("Edited Name", "98765432");
                check("Save displays success", page.isAccountSaved());
                page.openAccountPage();
                check("Name reverts after reopening", page.getAccountName().equals("Demo Student"));
                check("Phone reverts after reopening", page.getAccountPhone().equals("12345678"));
                capture("published-account-edits-not-saved");
            } else if (mode.equals("final")) {
                page.signUp("Final User", "published.final@example.com", "Pass1234");
                check("Final signup succeeds",page.isSignUpSuccessful());
                page.login("published.final@example.com", "Pass1234");
                check("Final new account persists",page.isLoggedIn());
                page.editAccountInformation("Saved Name", "98765432");
                page.openAccountPage();
                check("Final account edits persist",page.getAccountName().equals("Saved Name") && page.getAccountPhone().equals("98765432"));
                page.addProductToCart("Nova Laptop 14");
                page.removeProductFromCart("Nova Laptop 14");
                check("Final cart removal persists",!page.isProductInCart("Nova Laptop 14"));
                capture("published-final-cart-empty");
            }
            System.out.println("BROWSER_CHECK_PASSED " + mode);
        } finally { page.closeDriver(); }
    }
}
