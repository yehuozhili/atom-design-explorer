import React from "react";
import { Badge, BadgeProps, badgeColor } from "./index";
import { Icon } from "../icon";
import { withKnobs, text, select } from "@storybook/addon-knobs";

export default {
	title: "Badge",
	component: Badge,
	decorators: [withKnobs],
};

type selectType = "positive" | "negative" | "neutral" | "warning" | "error";

export const knobsBadge = () => (
	<Badge
		status={select<BadgeProps["status"]>(
			"status",
			Object.keys(badgeColor) as selectType[],
			"neutral"
		)}
	>
		{text("children", "i am badge")}
	</Badge>
);

export const all = () => (
	<div>
		<Badge status="positive">Positive</Badge>
		<Badge status="negative">Negative</Badge>
		<Badge status="neutral">Neutral</Badge>
		<Badge status="error">Error</Badge>
		<Badge status="warning">Warning</Badge>
	</div>
);

export const withIcon = () => (
	<Badge status="warning">
		<Icon icon="check" />
		with icon
	</Badge>
);
