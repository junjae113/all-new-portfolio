import { useState } from 'react';

export default function useFormValidation(initialValues = {}, validations = []) {
  // validations: [{ key, value, message }] 형태로 받음
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validateAllFields = (formData) => {
    const errors = {};

    validations.forEach(({ key, message }) => {
      const value = formData[key];

      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        errors[key] = message;
      }
    });

    setValidationErrors(errors);
    return errors;
  };

  const onSubmitAttempt = (formData) => {
    setHasSubmitted(true);
    return validateAllFields(formData);
  };

  return {
    validationErrors,
    hasSubmitted,
    validateAllFields,
    onSubmitAttempt,
    setValidationErrors,
    setHasSubmitted,
  };
}
