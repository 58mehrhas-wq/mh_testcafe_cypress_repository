Feature: Fashion Nova Sale Feature

@sale_dresses
Scenario Outline: User Sale Dresses Scenario
    Given I am in Fashion Nova page
    And I wait for "10" seconds  
    And I hover on Sale tab
    And I wait for "10" seconds
    And I select the "Sale Dresses"
    And I wait for "8" seconds
    Then I land on Sale Dresses page
    # When I find the "One of The Boys Dress - Sage" in the collection
    # And I click on the "One of The Boys Dress - Sage"
    # And I wait for "10" seconds
    # Then I land on the "One of The Boys Dress - Sage" page
    # And I select the "XS" to be available
    # Then I presented with "Notify Me When Available In XS" sidebar



