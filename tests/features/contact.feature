Feature: As a customer I need to sumbit contact info to be contacted later

    Background: Browse to contact page
        Given I initially browse to "contact" page

    Scenario: Verify mandatory fields
        When I submit info without providing mandatory info
        Then I should be prompted with error messages
        And error messsages will go away if info populated

    @Smoking
    Scenario: Verify successful submit
       When I submit info with providing mandatory info
       Then I should be able to see contact submit confirmation