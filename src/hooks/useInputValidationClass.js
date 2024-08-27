import { useMemo } from 'react';

export const useInputValidationClass = (formState, formSubmitted, fieldNames) => {
    const classes = useMemo(() => {
        return fieldNames.reduce((acc, fieldName) => {
            const fieldValue = formState[fieldName];
            acc[fieldName] = !formSubmitted ? '' : (fieldValue.length > 0 ? '' : 'is-invalid');
            return acc;
        }, {});
    }, [formState, formSubmitted, fieldNames]);

    const hasEmptyFields = useMemo(() => {
        return fieldNames.some(fieldName => {
            const fieldValue = formState[fieldName];
            return !fieldValue || fieldValue.length <= 0;
        });
    }, [formState, fieldNames]);

    return { classes, hasEmptyFields };
};
