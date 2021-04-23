module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	moduleNameMapper: {
		'^@components(.*)$': '<rootDir>/src/components$1',
		'^@lib(.*)$': '<rootDir>/src/lib$1',
		'^@state(.*)$': '<rootDir>/src/state$1',
		'^@types(.*)$': '<rootDir>/src/common$1',
		'^@mocks(.*)$': '<rootDir>/src/mocks$1',
		'^@auth(.*)$': '<rootDir>/src/auth$1',
		'\\.css$': '<rootDir>/src/mocks/cssMock.ts',
		'\\/mocks/index$': '<rootDir>/src/mocks/mswMock.ts',
	}
}
