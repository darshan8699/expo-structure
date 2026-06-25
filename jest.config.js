module.exports = {
    preset: 'jest-expo',
    testMatch: ['**/*.test.(ts|tsx)'],
    collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.{svg}', '!**/node_modules/**', '!**/src/app/**'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__tests__/mocks/styleMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
