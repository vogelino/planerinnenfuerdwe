import * as yup from "yup";
import { MixedSchema } from "yup/lib/mixed";

export const createFormValidations = (strings: {
  invalidEmailError: string;
  requiredEmailError: string;
  requiredFirstNameError: string;
  requiredLastNameError: string;
  tooLongOrganisationNameError: string;
  requiredConditionsError: string;
}): Record<
  string,
  | yup.StringSchema<
      string | undefined,
      Record<string, unknown>,
      string | undefined
    >
  | MixedSchema<boolean | undefined, Record<string, unknown>>
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

  requiredConditionsValidation: yup
    .mixed()
    .required(strings.requiredConditionsError)
    .oneOf([true], strings.requiredConditionsError),
});
