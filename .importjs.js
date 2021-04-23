module.exports = {
	moduleNameFormatter({ pathToImportedModule }) {
		return pathToImportedModule
			.replace('./src/components/', '@components/')
			.replace('./src/common/', '@types/')
			.replace('./src/state/', '@state/')
			.replace('./src/lib/', '@lib/')
			.replace('./src/mocks/', '@mocks/')
			.replace('./src/auth/', '@auth/')
			.replace(/\.ts$/gs, '')
	},
}
