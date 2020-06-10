module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts,vue}', '!src/**/*.component.ts', '!src/main.ts', '!src/routes.ts', '!**/*.d.ts'],
  coverageReporters: ['html', 'json-summary', 'text-summary', 'lcov', 'clover'],
  transformIgnorePatterns: ['node_modules/(?!(ol)/)'],
  setupFiles: ['jest-canvas-mock'],
};
