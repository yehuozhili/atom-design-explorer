import React from "react";
import { DatePicker } from "./index";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
	title: "DatePicker",
	component: DatePicker,
	decorators: [withKnobs],
};

export const knobsDatePicker = () => (
	<div style={{ height: "500px" }}>
		<DatePicker
			callback={action("callback")}
			delay={number("delay", 200)}
			initDate={text("initDate", "")}
		></DatePicker>
	</div>
);
