module.exports = {
    extends: ['@commitlint/config-conventional'],
    ignores: [(message: string) => message.includes('[skip ci]')],
}
