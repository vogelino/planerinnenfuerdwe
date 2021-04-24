import * as yup from "yup";

export const requiredEmailValidation = yup
  .string()
  .email("Die angegebene E-Mail Adresse ist ungültig")
  .required("Sie müssen eine E-Mail Adresse angeben");

export const requiredFirstNameValidation = yup
  .string()
  .required("Sie müssen Ihren Vornamen angeben");

export const requiredLastNameValidation = yup
  .string()
  .required("Sie müssen Ihren Nachnamen angeben");

export const optionalOrganisationValidation = yup
  .string()
  .max(
    60,
    "Der Name Ihrer Organisation darf nicht länger als 60 Zeichen sein."
  );
