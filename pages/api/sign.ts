import * as yup from "yup";
import { createSupabaseBackendClient } from "@auth/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import password from "secure-random-password";
import {
  requiredEmailValidation,
  requiredFirstNameValidation,
  requiredLastNameValidation,
} from "@lib/formValidationUtil";
import { SignatoryType } from "src/types/supabase";
import { LetterSigningFormType } from "../../src/types/letterSigningFormType";

type Data =
  | LetterSigningFormType
  | {
      message: string;
    };

const reqBodySchema = yup.object().shape({
  firstName: requiredFirstNameValidation,
  lastName: requiredLastNameValidation,
  email: requiredEmailValidation,
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  try {
    if (req.method !== "POST")
      throw "This route is only to be called with the POST method";

    const body = req.body as LetterSigningFormType;
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
