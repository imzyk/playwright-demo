Feature: As a customer I need shop functionality for purchasing

    Background: Browse to shop page
        Given I initially browse to "shop" page

    @Smoking
    Scenario: Verify cart information
        When I purchase the products
            | ProductName    | Number |
            | Stuffed Frog   | 2      |
            | Fluffy Bunny   | 5      |
            | Valentine Bear | 3      |
        And I browse to "cart" page subsquently
        Then I should be able to see correct products prices


