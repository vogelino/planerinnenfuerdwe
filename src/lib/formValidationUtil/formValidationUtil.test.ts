import { createFormValidations } from ".";

const validObject = {
  email: "contact@example.com",
  firstName: "Angelina",
  lastName: "Mc Donalds",
  organisation: "The anti burger faction",
  conditionsAccepted: true,
};

const schema = createFormValidations({
  invalidEmailError: "Error: invalidEmailError",
  requiredEmailError: "Error: requiredEmailError",
  requiredFirstNameError: "Error: requiredFirstNameError",
  requiredLastNameError: "Error: requiredLastNameError",
  tooLongOrganisationNameError: "Error: tooLongOrganisationNameError",
  requiredConditionsError: "Error: requiredConditionsError",
});

describe("requiredEmailValidation validation", () => {
  it("should not be valid if empty", async () => {
    const obj = { ...validObject, email: "" };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should not be valid if not an email", async () => {
    const obj = { ...validObject, email: "wqfqwfqwf" };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should be valid if an email", async () => {
    const obj = { ...validObject, email: "wqfqwfqwf@fwef.fw" };
    expect(await schema.validate(obj)).toBeDefined();
  });
});

describe("requiredFirstNameValidation validation", () => {
  it("should not be valid if empty", async () => {
    const obj = { ...validObject, firstName: "" };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should be valid if there", async () => {
    const obj = { ...validObject, firstName: "wqfqwfqwf" };
    expect(await schema.validate(obj)).toBeDefined();
  });
});

describe("requiredLastNameValidation validation", () => {
  it("should not be valid if empty", async () => {
    const obj = { ...validObject, lastName: "" };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should be valid if there", async () => {
    const obj = { ...validObject, lastName: "wqfqwfqwf" };
    expect(await schema.validate(obj)).toBeDefined();
  });
});

describe("requiredConditionsError validation", () => {
  it("should not be valid if empty", async () => {
    const obj = { ...validObject, conditionsAccepted: "" };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should not be valid if false", async () => {
    const obj = { ...validObject, conditionsAccepted: false };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should be valid if there", async () => {
    const obj = { ...validObject, conditionsAccepted: true };
    expect(await schema.validate(obj)).toBeDefined();
  });
});

describe("optionalOrganisationValidation validation", () => {
  it("should not be valid if longer than 60 chars", async () => {
    const obj = {
      ...validObject,
      organisation:
        "wegquiygqpwoieuquwpioyqpiwueqiwpueqiwpueqwipugqipwugqipuwyqwipueqwuipeqpiwgyqpiueguqpiygiqwg",
    };
    await expect(schema.validate(obj)).rejects.toThrow();
  });
  it("should be valid if empty", async () => {
    const obj = { ...validObject, organisation: "" };
    expect(await schema.validate(obj)).toBeDefined();
  });
  it("should be valid if there", async () => {
    const obj = { ...validObject, organisation: "wqfqwfqwf" };
    expect(await schema.validate(obj)).toBeDefined();
  });
});
