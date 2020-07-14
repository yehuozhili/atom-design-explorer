import React, {
	PropsWithChildren,
	ReactNode,
	useMemo,
} from "react";
import styled from "styled-components";
import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import { easing } from "../shared/animation";


type AvatarProps = {}

export function Avatar(props: PropsWithChildren< AvatarProps>) {
	const { children } = props;
	return <div ></div>

}