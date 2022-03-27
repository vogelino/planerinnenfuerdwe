import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormTextInput } from "@components/FormTextInput";
import { createFormValidations } from "@lib/formValidationUtil";
import { Submit } from "@components/Button";
import { LetterSigningFormType } from "../../types/letterSigningFormType";
import { FormCheckbox } from "@components/FormCheckbox";
import { Feedback } from "@components/Feedback";
import { useTranslation } from "react-i18next";

interface SubmitSignatoryFormPropType {
  onSubmit?: (data: LetterSigningFormType) => void;
  error: string | Error | null;
  isSigningLetter?: boolean;
  isPendingConfirmation?: boolean;
  hasSubmissionCompleted?: boolean;
  hasNeverSigned?: boolean;
}

export const SubmitSignatoryForm: FC<SubmitSignatoryFormPropType> = ({
  onSubmit = console.log,
  error,
  isSigningLetter,
  isPendingConfirmation,
  hasSubmissionCompleted,
  hasNeverSigned,
}) => {
  const { t } = useTranslation("signatureForm");
  const formSchema = createFormValidations({
    invalidEmailError: t("invalidEmailError"),
    requiredEmailError: t("requiredEmailError"),
    requiredFirstNameError: t("requiredFirstNameError"),
    requiredLastNameError: t("requiredLastNameError"),
    requiredConditionsError: t("requiredConditionsError"),
    tooLongOrganisationNameError: t("tooLongOrganisationNameError"),
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
    <>
      <h2 className='pt-8 mb-4 font-bold text-2xl md:text-3xl'>
        {t("headline")}
      </h2>
      {error && <Feedback type='error'>{error}</Feedback>}
      {isSigningLetter && (
        <Feedback type='info'>{t("submissionInProgressText")}</Feedback>
      )}
      {isPendingConfirmation && (
        <Feedback type='success'>{t("pendingConfirmationText")}</Feedback>
      )}
      {hasSubmissionCompleted && (
        <Feedback type='success'>{t("submissionSuccessText")}</Feedback>
      )}
      {hasNeverSigned && (
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
                  optionalLabel={t("emailNotShownText")}
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
      )}
    </>
  );
};
