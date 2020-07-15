import React from "react";
import { GlobalStyle } from "../src/components/shared/global";
import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { color } from "../src/components/shared/styles";

const bgArr = Object.keys(color).map((key) => {
	return {
		name: key,
		value: color[key],
		default: key === "light" ? true : false,
	};
});

addParameters({
	options: {
		showRoots: true,
	},
	dependencies: {
		withStoriesOnly: true,
		hideEmpty: true,
	},
	backgrounds: [...bgArr],
});
addDecorator(withA11y);
addDecorator((story) => (
	<>
		<GlobalStyle />
		{story()}
	</>
));
