import React from 'react'
import renderer from 'react-test-renderer'
import HomeScreen from '../src/app/index'

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
    Stack: {
        Screen: () => null,
    },
}))

describe('<HomeScreen />', () => {
    it('renders correctly', async () => {
        let tree
        await renderer.act(() => {
            tree = renderer.create(<HomeScreen />)
        })
        expect(tree).toBeDefined()
    })
})
