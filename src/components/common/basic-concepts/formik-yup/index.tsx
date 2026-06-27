import React from 'react'
import { Text, View, Pressable, TextInput, Alert, Switch } from 'react-native'
import { Formik } from 'formik'
import { FormikInputs, SignUpSchema } from './formik-yup.type'
import { styles } from './formik-yup.style'

let formikRenders = 0

export default function FormikYupExample() {
    // eslint-disable-next-line react-hooks/globals
    formikRenders += 1

    React.useEffect(() => {
        return () => {
            formikRenders = 0
        }
    }, [])

    const handleFormSubmit = (values: FormikInputs, { resetForm }: any) => {
        Alert.alert('Submit Success (Formik + Yup)', JSON.stringify(values))
        resetForm()
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Formik + Yup Schema</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Renders: {formikRenders}</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>
                Uses controlled components. Typing will trigger parent re-renders on each keystroke.
            </Text>

            <Formik
                initialValues={{ age: '', acceptTerms: false }}
                validationSchema={SignUpSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, handleReset }) => (
                    <View style={styles.card}>
                        {/* 1. Age Input */}
                        <Text style={styles.label}>Enter Age (Must be 18+)</Text>
                        <TextInput
                            style={[styles.input, touched.age && errors.age && styles.inputError]}
                            placeholder="e.g. 21"
                            keyboardType="numeric"
                            onChangeText={handleChange('age')}
                            onBlur={handleBlur('age')}
                            value={values.age}
                        />
                        {touched.age && errors.age && <Text style={styles.errorText}>⚠️ {errors.age}</Text>}

                        {/* 2. Switch Terms field */}
                        <View style={styles.switchRow}>
                            <Text style={styles.switchLabel}>Accept Terms & Conditions</Text>
                            <Switch
                                value={values.acceptTerms}
                                onValueChange={(val) => setFieldValue('acceptTerms', val)}
                                trackColor={{ false: styles.btnSecondary.backgroundColor, true: '#22C55E' }}
                                thumbColor={values.acceptTerms ? '#FFFFFF' : styles.btnSecondary.backgroundColor}
                            />
                        </View>
                        {touched.acceptTerms && errors.acceptTerms && (
                            <Text style={styles.errorText}>⚠️ {errors.acceptTerms}</Text>
                        )}

                        <View style={styles.buttonRow}>
                            <Pressable style={styles.btnSecondary} onPress={() => handleReset()}>
                                <Text style={styles.btnText}>Reset</Text>
                            </Pressable>
                            <Pressable style={styles.btnPrimary} onPress={() => handleSubmit()}>
                                <Text style={styles.btnTextPrimary}>Submit Form</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
