// https://docs.cypress.io/api/introduction/api.html
import { selectors } from "../fixtures/seletors.js";
import { PATHS, LITERALS } from "../fixtures/constants.js";

const screenshotOptions = { overwrite: true };

describe("My ToDo App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("user can see the home page", () => {
    cy.contains("h1", "You did it!");

    // Screenshot a full page
    cy.argosScreenshot("home-page", screenshotOptions);

    // Screenshot a component
    cy.get("main").argosScreenshot("home-list", screenshotOptions);
  });

  it("user can goes to the conter page", () => {
    cy.get(selectors.COUNTER.NAV_BUTTON).click();

    cy.location("pathname").should("include", PATHS.COUNTER);
    //cy.contains("h1", "This is the counter page");
    cy.contains(`${LITERALS.CURRENT_COUNTER} 0`);
  });

  describe("Counter Page", () => {
    beforeEach(() => {
      cy.visit("/counter");
      cy.get("button").contains("+1").as("buttonIncrement");
      cy.get("button").contains("Reset").as("buttonReset");
    });

    it("user can ingrement once the counter", () => {
      cy.get("@buttonIncrement").click();
      cy.contains(`${LITERALS.CURRENT_COUNTER} 1`);
    });

    it("user can ingrement +2 the counter", () => {
      cy.get("@buttonIncrement").click().click();
      cy.contains(`${LITERALS.CURRENT_COUNTER} 2`);
      cy.screenshot(screenshotOptions);
    });

    it("user can reset the counter", () => {
      cy.get("@buttonReset").click();
      cy.contains(`${LITERALS.CURRENT_COUNTER} 0`);
      cy.screenshot(screenshotOptions);
    });
  });
});
