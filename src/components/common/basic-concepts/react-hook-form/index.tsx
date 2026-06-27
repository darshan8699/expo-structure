import React from 'react'
import { Text, View, Pressable, TextInput, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { FormInputs } from './react-hook-form.type'
import { styles } from './react-hook-form.style'

let rhfRenders = 0

export default function ReactHookFormExample() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>({
        defaultValues: {
            fullName: '',
            email: '',
        },
    })

    // eslint-disable-next-line react-hooks/globals
    rhfRenders += 1

    React.useEffect(() => {
        return () => {
            rhfRenders = 0
        }
    }, [])

    const onSubmit = (data: FormInputs) => {
        Alert.alert('Submit Success (React Hook Form)', JSON.stringify(data))
        reset()
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>React Hook Form</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Renders: {rhfRenders}</Text>
                </View>
            </View>
            <Text style={styles.subtitle}>
                Uses uncontrolled inputs via refs. Typing does not re-render the parent container.
            </Text>

            <View style={styles.card}>
                {/* 1. Full Name Field */}
                <Text style={styles.label}>Full Name</Text>
                <Controller
                    control={control}
                    name="fullName"
                    rules={{
                        required: 'Full name is required',
                        minLength: { value: 3, message: 'Minimum 3 characters required' },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.fullName && styles.inputError]}
                            placeholder="John Doe"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.fullName && <Text style={styles.errorText}>⚠️ {errors.fullName.message}</Text>}

                {/* 2. Email Field */}
                <Text style={[styles.label, { marginTop: styles.input.borderWidth * 16 }]}>Email Address</Text>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address format',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.input, errors.email && styles.inputError]}
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>⚠️ {errors.email.message}</Text>}

                <View style={styles.buttonRow}>
                    <Pressable style={styles.btnSecondary} onPress={() => reset()}>
                        <Text style={styles.btnText}>Reset</Text>
                    </Pressable>
                    <Pressable style={styles.btnPrimary} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.btnTextPrimary}>Submit Form</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
