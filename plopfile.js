module.exports = function(plop) {
	// controller generator
	plop.addHelper("headCaps", function(p) {
		p = p.trim();
		return p.slice(0, 1).toUpperCase() + p.slice(1);
	});
	plop.setGenerator("component", {
		description: "create component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "component name please",
			},
		],
		actions: [
			{
				type: "add",
				path: "src/components/{{name}}/index.tsx",
				templateFile: "plop-template/componentIndex.hbs",
			},
			{
				type: "add",
				path: "src/components/{{name}}/__test__/{{name}}.test.tsx",
				templateFile: "plop-template/componentTest.hbs",
			},
			{
				type: "add",
				path: "src/components/{{name}}/{{name}}.stories.tsx",
				templateFile: "plop-template/componentStories.hbs",
			},
		],
	});
};
