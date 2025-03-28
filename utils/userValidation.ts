export const rules = {
    required: (value: string) => !!value || 'Required.',

    email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',

    passwordLength: (value: string) => value.length >= 8 || 'Password must be 8 characters.',

    passwordStrength: (value: string) => {const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongRegex.test(value) || 'Password must contain uppercase, lowercase, and a number.';},

    passwordMatch: (getPassword: () => string) => {
        return (value: string) =>
            value === getPassword() || 'Passwords do not match';
    }
};
