import { HTMLProps, forwardRef } from "react";
import { useTranslation } from "react-i18next";

interface FormTextInputPropType extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  optionalLabel?: string;
  containerClassName?: string;
  errors?: string[];
  optional?: boolean;
}

// eslint-disable-next-line react/display-name
export const FormTextInput = forwardRef<
  HTMLInputElement,
  FormTextInputPropType
>(
  (
    {
      name,
      label,
      optional = false,
      errors = [],
      containerClassName = "mb-2",
      className = "mb-2",
      optionalLabel,
      ...inputProps
    },
    ref
  ) => {
    const { t } = useTranslation("signatureForm");
    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={name}
            className='block mb-2 cursor-pointer transition hover:opacity-60'
          >
            {label}{" "}
            {(optional || optionalLabel) && (
              <span className='text-gray-500 text-sm transform translate-y-1'>
                ({optionalLabel || t("optionalFieldText")})
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          className={`${errors.length ? "error" : ""} ${className}`}
          {...inputProps}
        />
        {errors.map(error => (
          <div className='text-red-500 text-sm mt-2' key={error}>
            {error}
          </div>
        ))}
      </div>
    );
  }
);
