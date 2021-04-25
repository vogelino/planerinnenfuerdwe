import { FC } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormTextInput } from "@components/FormTextInput";
import { createFormValidations } from "@lib/formValidationUtil";
import { Submit } from "@components/Button";
import { LetterSigningFormType } from "../../types/letterSigningFormType";
import { useTranslation } from "react-i18next";
import { FormCheckbox } from "@components/FormCheckbox";

export const SubmitSignatoryForm: FC<{
  onSubmit?: (data: LetterSigningFormType) => void;
}> = ({ onSubmit = console.log }) => {
  const { t } = useTranslation("signatureForm");
  const {
    requiredEmailValidation,
    requiredFirstNameValidation,
    requiredLastNameValidation,
    optionalOrganisationValidation,
    requiredConditionsValidation,
  } = createFormValidations({
    invalidEmailError: t("invalidEmailError"),
    requiredEmailError: t("requiredEmailError"),
    requiredFirstNameError: t("requiredFirstNameError"),
    requiredLastNameError: t("requiredLastNameError"),
    requiredConditionsError: t("requiredConditionsError"),
    tooLongOrganisationNameError: t("tooLongOrganisationNameError"),
  });
  const formSchema = yup.object().shape({
    firstName: requiredFirstNameValidation,
    lastName: requiredLastNameValidation,
    organisation: optionalOrganisationValidation,
    email: requiredEmailValidation,
    conditionsAccepted: requiredConditionsValidation,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LetterSigningFormType>({
    resolver: yupResolver(formSchema),
  });
  const onInternalSubmit = handleSubmit(data =>
    onSubmit({
      ...data,
      conditionsAccepted: !!data.conditionsAccepted,
    })
  );

  return (
    <form onSubmit={onInternalSubmit} noValidate>
      <fieldset className='grid sm:gap-4 grid-cols-1 sm:grid-cols-2'>
        <Controller
          name='firstName'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <FormTextInput
              {...field}
              label={t("firstNameLabel")}
              placeholder={t("firstNamePlaceholder")}
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
              label={t("lastNameLabel")}
              placeholder={t("lastNamePlaceholder")}
              type='text'
              errors={
                errors.lastName?.message ? [errors.lastName?.message] : []
              }
            />
          )}
        />
      </fieldset>
      <fieldset className='grid grid-cols-1'>
        <Controller
          name='organisation'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <FormTextInput
              {...field}
              label={t("organisationLabel")}
              placeholder={t("organisationPlaceholder")}
              type='text'
              optional
              errors={
                errors.organisation?.message
                  ? [errors.organisation?.message]
                  : []
              }
            />
          )}
        />
      </fieldset>

      <fieldset className='grid grid-cols-1 mb-2'>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <FormTextInput
              {...field}
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              type='email'
              errors={errors.email?.message ? [errors.email?.message] : []}
            />
          )}
        />
      </fieldset>
      <fieldset className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 items-start'>
        <Controller
          name='conditionsAccepted'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <FormCheckbox
              {...field}
              label={t("conditionsLabel")}
              errors={
                errors.conditionsAccepted?.message
                  ? [errors.conditionsAccepted?.message]
                  : []
              }
            />
          )}
        />
        <Submit variant='primary' className='float-right'>
          {t("submitButtonText")}
        </Submit>
      </fieldset>
    </form>
  );
};
