import React from "react";
import { Carousel } from "./index";
import {
	withKnobs,
	text,
	boolean,
	color,
	select,
} from "@storybook/addon-knobs";

export default {
	title: "Carousel",
	component: Carousel,
	decorators: [withKnobs],
};

export const knobsCarousel = () => (
	<div>
		<Carousel delay={300} height={300} radioAppear="darker">
			<div style={{ height: "100%", width: "100%", background: "red" }}>
				1
			</div>
			<div style={{ height: "100%", width: "100%", background: "blue" }}>
				2
			</div>
			<div
				style={{ height: "100%", width: "100%", background: "yellow" }}
			>
				3
			</div>
			<div style={{ height: "100%", width: "100%" }}>4</div>
		</Carousel>
	</div>
);
