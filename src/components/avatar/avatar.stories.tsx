import React from "react";
import { Avatar } from "./index";
import {
	withKnobs,
	text,
	boolean,
	color,
	select,
} from "@storybook/addon-knobs";

export default {
	title: "Avatar",
	component: Avatar,
	decorators: [withKnobs],
};

export const knobsAvatar = () => (
	<div style={{ background: color("background", "#FFFFFF") }}></div>
);

;
