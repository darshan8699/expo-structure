module.exports = {
    preset: 'jest-expo',
    testMatch: ['**/*.test.(ts|tsx)'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!src/**/*.d.ts'],
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__tests__/mocks/styleMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
