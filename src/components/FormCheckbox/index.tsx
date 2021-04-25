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
    <section className='flex gap-1'>
      <input
        type='checkbox'
        name={name}
        {...checkboxProps}
        ref={ref}
        className={`${errors.length > 0 ? "error" : ""}`}
      />
      {(label || errors.length > 0) && (
        <div className='leading-tight text-base'>
          {label && (
            <label htmlFor='areConditionsAccepted'>
              {label}
              {optional && (
                <span className='text-gray-500 float-right text-sm ml-2 transform translate-y-1'>
                  (Optional)
                </span>
              )}
            </label>
          )}
          {errors.map(error => (
            <div className='text-red-500 text-sm mt-2' key={error}>
              {error}
            </div>
          ))}
        </div>
      )}
    </section>
  )
);
