import * as yup from "yup";
import { createSupabaseBackendClient } from "@auth/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import password from "secure-random-password";
import { createFormValidations } from "@lib/formValidationUtil";
import { SignatoryType } from "src/types/supabase";
import { LetterSigningFormType } from "../../src/types/letterSigningFormType";
import enTexts from "../../public/locales/en/signatureForm.json";
import deTexts from "../../public/locales/de/signatureForm.json";

type Data =
  | LetterSigningFormType
  | {
      message: string;
    };

interface ReqBodyType extends LetterSigningFormType {
  locale: "de" | "en";
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getValidationSchema = (texts: Record<string, string>) => {
  const {
    requiredEmailValidation,
    requiredFirstNameValidation,
    requiredLastNameValidation,
    requiredConditionsValidation,
    optionalOrganisationValidation,
  } = createFormValidations({
    invalidEmailError: texts.invalidEmailError,
    requiredEmailError: texts.requiredEmailError,
    requiredFirstNameError: texts.requiredFirstNameError,
    requiredLastNameError: texts.requiredLastNameError,
    tooLongOrganisationNameError: texts.tooLongOrganisationNameError,
    requiredConditionsError: texts.requiredConditionsError,
  });
  return yup.object().shape({
    firstName: requiredFirstNameValidation,
    lastName: requiredLastNameValidation,
    email: requiredEmailValidation,
    organisation: optionalOrganisationValidation,
    conditionsAccepted: requiredConditionsValidation,
  });
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  try {
    if (req.method !== "POST")
      throw "This route is only to be called with the POST method";

    const body = req.body as ReqBodyType;
    const reqBodySchema = getValidationSchema(
      body.locale === "de" ? deTexts : enTexts
    );
    await reqBodySchema.validate(body);

    const supabaseClient = createSupabaseBackendClient();
    const { data, error } = await supabaseClient.auth.signUp({
      email: body.email,
      password: password.randomString(),
    });

    if (error) {
      if (error.message.includes("already been registered"))
        throw "Ein Benutzer mit dieser E-Mail-Adresse hat den offenen Brief bereits unterzeichnet.";
      throw error.message;
    }
    if (!data) throw "No data was returned from signUp";
    if ("id" in data) {
      const { error } = await supabaseClient
        .from<SignatoryType>("signatories")
        .upsert({
          userId: data.id,
          firstName: body.firstName,
          lastName: body.lastName,
          organisation: body.organisation,
        });

      if (error) throw error;

      res.status(200).json(body);
    } else {
      throw "No userId was returned from signUp";
    }
  } catch (err) {
    res.status(401).json({ message: new Error(err).message });
  }
};
