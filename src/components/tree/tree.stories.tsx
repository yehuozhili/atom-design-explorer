import React from "react";
import { Tree } from "./index";
import { withKnobs, boolean, color } from "@storybook/addon-knobs";

export default {
	title: "Tree",
	component: Tree,
	decorators: [withKnobs],
};

const source = [
	{
		value: "北京分行",
		children: [
			{
				value: "朝阳支行办事处",
				children: [
					{ value: "朝阳支行办事处-1" },
					{ value: "朝阳支行办事处-2" },
				],
			},
			{ value: "海淀支行办事处" },
			{ value: "石景山支行办事处" },
		],
	},
	{
		value: "天津分行",
		children: [
			{ value: "和平支行办事处" },
			{ value: "河东支行办事处" },
			{ value: "南开支行办事处" },
		],
	},
];

export const knobsTree = () => (
	<Tree
		backColor={color("backColor", "#00000030")}
		borderColor={color("borderColor", "#53c94fa8")}
		drag={boolean("drag", true)}
		source={source}
	></Tree>
);
