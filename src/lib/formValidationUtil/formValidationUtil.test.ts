import {
  requiredEmailValidation,
  requiredFirstNameValidation,
  requiredLastNameValidation,
  optionalOrganisationValidation,
} from ".";

describe("requiredEmailValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredEmailValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should not be valid if not an email", async () => {
    const isValid = await requiredEmailValidation.isValid("wfefwf[at]fwe.cew");
    expect(isValid).toBe(false);
  });
  it("should be valid if an email", async () => {
    const isValid = await requiredEmailValidation.isValid("wfefwf@fwe.cew");
    expect(isValid).toBe(true);
  });
});

describe("requiredFirstNameValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredFirstNameValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should be valid if not empty", async () => {
    const isValid = await requiredFirstNameValidation.isValid("Hans");
    expect(isValid).toBe(true);
  });
});

describe("requiredLastNameValidation validation", () => {
  it("should not be valid if empty", async () => {
    const isValid = await requiredLastNameValidation.isValid("");
    expect(isValid).toBe(false);
  });
  it("should be valid if not empty", async () => {
    const isValid = await requiredLastNameValidation.isValid("Hans");
    expect(isValid).toBe(true);
  });
});

describe("optionalOrganisationValidation validation", () => {
  it("should be valid if empty", async () => {
    const isValid = await optionalOrganisationValidation.isValid("");
    expect(isValid).toBe(true);
  });
  it("should not be valid if longer than 60 chars", async () => {
    const isValid = await optionalOrganisationValidation.isValid(
      "wehfwiqouhgfeoiqfjoiwefjoiqwfjhqowfhqwofiejqwoifejqwiofjqwoifjeoqiwjfwqe"
    );
    expect(isValid).toBe(false);
  });
});
