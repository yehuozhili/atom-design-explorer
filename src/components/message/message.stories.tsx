import React from "react";
import { Message, message, MessageType } from "./index";
import { withKnobs, text, color, select, number } from "@storybook/addon-knobs";
import Button from "../button";
import { Icon } from "../icon";

export default {
	title: "Message",
	component: Message,
	decorators: [withKnobs],
};
const Options: MessageType[] = [
	"info",
	"success",
	"error",
	"warning",
	"loading",
	"default",
];

export const knobsMessage = () => {
	const se = select<MessageType>("iconType", Options, "default");
	const op = {
		delay: number("delay", 2000),
		animationDuring: number("animationDuring", 300),
		background: color("background", "#fff"),
		color: color("color", "#333"),
	};
	const tx = text("content", "hello message");
	const onClick = () => message[se](tx, op);

	return (
		<div>
			<Button onClick={onClick}>turn to canvas to control param</Button>
		</div>
	);
};

export const callbackTest = () => (
	<div>
		<Button
			onClick={() =>
				message.loading("加载中", {
					callback: () => message.success("加载完成"),
				})
			}
		>
			callback
		</Button>
	</div>
);

export const withIcon = () => (
	<div>
		<Button
			onClick={() =>
				message.default(
					<span>
						<Icon icon="admin"></Icon>111
					</span>
				)
			}
		>
			callback
		</Button>
	</div>
);
