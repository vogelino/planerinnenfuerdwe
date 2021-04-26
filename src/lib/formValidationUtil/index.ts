import * as yup from "yup";

interface SchemaTexts {
  invalidEmailError: string;
  requiredEmailError: string;
  requiredFirstNameError: string;
  requiredLastNameError: string;
  tooLongOrganisationNameError: string;
  requiredConditionsError: string;
}

export const createFormValidations = (
  strings: SchemaTexts
): yup.AnyObjectSchema =>
  yup.object().shape({
    email: yup
      .string()
      .email(strings.invalidEmailError)
      .required(strings.requiredEmailError),

    firstName: yup.string().required(strings.requiredFirstNameError),

    lastName: yup.string().required(strings.requiredLastNameError),

    organisation: yup.string().max(60, strings.tooLongOrganisationNameError),

    conditionsAccepted: yup
      .mixed()
      .required(strings.requiredConditionsError)
      .oneOf([true], strings.requiredConditionsError),
  });
