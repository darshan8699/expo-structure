import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { Colors } from '@/common/theme'

// Import all the basic concept components
import SimpleReduxExample from '@/components/common/basic-concepts/simple-redux'
import ReduxToolkitExample from '@/components/common/basic-concepts/redux-toolkit'
import ReduxThunkExample from '@/components/common/basic-concepts/redux-thunk'
import ReduxSagaExample from '@/components/common/basic-concepts/redux-saga'
import MobXUI from '@/components/common/basic-concepts/mobx'
import ZustandExample from '@/components/common/basic-concepts/zustand'
import ReactQueryExample from '@/components/common/basic-concepts/react-query'
import MMKVExample from '@/components/common/basic-concepts/mmkv'
import SecureStorageExample from '@/components/common/basic-concepts/secure-storage'
import ReactHookFormExample from '@/components/common/basic-concepts/react-hook-form'
import FormikYupExample from '@/components/common/basic-concepts/formik-yup'
import DebuggingExample from '@/components/common/basic-concepts/debugging'
import FastlaneExample from '@/components/common/basic-concepts/fastlane'

type ConceptId =
    | 'simple-redux'
    | 'redux-toolkit'
    | 'redux-thunk'
    | 'redux-saga'
    | 'mobx'
    | 'zustand'
    | 'react-query'
    | 'mmkv'
    | 'secure-storage'
    | 'react-hook-form'
    | 'formik-yup'
    | 'debugging'
    | 'fastlane'

const CONCEPT_MAP: Record<ConceptId, { component: React.ComponentType; title: string }> = {
    'simple-redux': { component: SimpleReduxExample, title: 'Simple Redux' },
    'redux-toolkit': { component: ReduxToolkitExample, title: 'Redux Toolkit (RTK)' },
    'redux-thunk': { component: ReduxThunkExample, title: 'Redux Thunk' },
    'redux-saga': { component: ReduxSagaExample, title: 'Redux Saga' },
    mobx: { component: MobXUI, title: 'MobX state' },
    zustand: { component: ZustandExample, title: 'Zustand' },
    'react-query': { component: ReactQueryExample, title: 'React Query' },
    mmkv: { component: MMKVExample, title: 'MMKV storage' },
    'secure-storage': { component: SecureStorageExample, title: 'Secure Storage' },
    'react-hook-form': { component: ReactHookFormExample, title: 'React Hook Form' },
    'formik-yup': { component: FormikYupExample, title: 'Formik & Yup' },
    debugging: { component: DebuggingExample, title: 'React DevTools / Flipper' },
    fastlane: { component: FastlaneExample, title: 'Fastlane Automation' },
}

export default function ConceptScreen() {
    const { id } = useLocalSearchParams<{ id: ConceptId }>()

    const mapped = id ? CONCEPT_MAP[id] : null
    const ActiveComponent = mapped ? mapped.component : null
    const title = mapped ? mapped.title : 'Concept View'

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: title,
                    headerTintColor: '#fff',
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            {ActiveComponent ? <ActiveComponent /> : <View />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
})
