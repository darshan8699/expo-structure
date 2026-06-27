import * as Yup from 'yup'

export interface FormikInputs {
    age: string
    acceptTerms: boolean
}

export const SignUpSchema = Yup.object().shape({
    age: Yup.number()
        .typeError('Age must be a number')
        .required('Age is required')
        .min(18, 'You must be at least 18 years old')
        .max(99, 'Age is out of limits'),
    acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms & conditions'),
})
