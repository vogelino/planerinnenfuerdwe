import * as yup from "yup";

export const createFormValidations = (strings: {
  invalidEmailError: string;
  requiredEmailError: string;
  requiredFirstNameError: string;
  requiredLastNameError: string;
  tooLongOrganisationNameError: string;
}): Record<
  string,
  yup.StringSchema<
    string | undefined,
    Record<string, unknown>,
    string | undefined
  >
> => ({
  requiredEmailValidation: yup
    .string()
    .email(strings.invalidEmailError)
    .required(strings.requiredEmailError),

  requiredFirstNameValidation: yup
    .string()
    .required(strings.requiredFirstNameError),

  requiredLastNameValidation: yup
    .string()
    .required(strings.requiredLastNameError),

  optionalOrganisationValidation: yup
    .string()
    .max(60, strings.tooLongOrganisationNameError),
});
