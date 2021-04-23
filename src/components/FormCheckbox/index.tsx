import { HTMLProps, forwardRef, ReactNode } from "react";

interface FormCheckboxPropType
  extends Omit<HTMLProps<HTMLInputElement>, "label" | "value"> {
  name: string;
  label?: ReactNode;
  errors?: string[];
  optional?: boolean;
}

// eslint-disable-next-line react/display-name
export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxPropType>(
  ({ name, label, optional = false, errors = [], ...checkboxProps }, ref) => (
    <section className='flex'>
      <input
        type='checkbox'
        name={name}
        {...checkboxProps}
        ref={ref}
        className={`transform translate-y-1 ${
          errors.length > 0 ? "error" : ""
        }`}
      />
      {(label || errors.length > 0) && (
        <div>
          {label && (
            <label htmlFor='areConditionsAccepted' className='leading-5'>
              {label}
              {optional && (
                <span className='text-gray-500 float-right text-sm ml-2 transform translate-y-1'>
                  (Optional)
                </span>
              )}
            </label>
          )}
          {errors.map(error => (
            <p className='text-red-500 text-sm' key={error}>
              {error}
            </p>
          ))}
        </div>
      )}
    </section>
  )
);
