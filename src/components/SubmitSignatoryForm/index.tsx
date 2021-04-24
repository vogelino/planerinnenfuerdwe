import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormTextInput } from "@components/FormTextInput";
import {
  requiredEmailValidation,
  requiredFirstNameValidation,
  requiredLastNameValidation,
} from "@lib/formValidationUtil";
import { Submit } from "@components/Button";
import { LetterSigningFormType } from "../../types/letterSigningFormType";

const formSchema = yup.object().shape({
  firstName: requiredFirstNameValidation,
  lastName: requiredLastNameValidation,
  email: requiredEmailValidation,
});

export const SubmitSignatoryForm: FC<{
  onSubmit?: (data: LetterSigningFormType) => void;
}> = ({ onSubmit = console.log }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LetterSigningFormType>({
    resolver: yupResolver(formSchema),
  });
  const onInternalSubmit = handleSubmit(data => onSubmit(data));

  return (
    <form onSubmit={onInternalSubmit} noValidate>
      <Controller
        name='firstName'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='Vorname'
            placeholder='Deine Vorname'
            type='text'
            errors={
              errors.firstName?.message ? [errors.firstName?.message] : []
            }
          />
        )}
      />
      <Controller
        name='lastName'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='Nachname'
            placeholder='Deine Nachname'
            type='text'
            errors={errors.lastName?.message ? [errors.lastName?.message] : []}
          />
        )}
      />
      <Controller
        name='email'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <FormTextInput
            {...field}
            label='E-Mail'
            placeholder='Deine E-Mail-Adresse...'
            type='email'
            errors={errors.email?.message ? [errors.email?.message] : []}
          />
        )}
      />
      <Submit>Unterschreiben</Submit>
    </form>
  );
};
