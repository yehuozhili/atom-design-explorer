import React, { useMemo, HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { color, typography } from "../shared/styles";
import { glow } from "../shared/animation";
import { Icon } from "../icon";

export const AvatarSize = {
	large: 40,
	medium: 28,
	small: 20,
	tiny: 16,
};

const Image = styled.div<AvatarProps>`
  background: ${(props) => (!props.isLoading ? "transparent" : color.light)};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  height: ${AvatarSize.medium}px;
  width: ${AvatarSize.medium}px;
  line-height: ${AvatarSize.medium}px;

  ${(props) =>
		props.size === "tiny" &&
		css`
			height: ${AvatarSize.tiny}px;
			width: ${AvatarSize.tiny}px;
			line-height: ${AvatarSize.tiny}px;
		`}

  ${(props) =>
		props.size === "small" &&
		css`
			height: ${AvatarSize.small}px;
			width: ${AvatarSize.small}px;
			line-height: ${AvatarSize.small}px;
		`}

  ${(props) =>
		props.size === "large" &&
		css`
			height: ${AvatarSize.large}px;
			width: ${AvatarSize.large}px;
			line-height: ${AvatarSize.large}px;
		`}

  ${(props) =>
		!props.src &&
		css`
			background: ${!props.isLoading && "#37D5D3"};
		`}

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  svg {
    position: relative;
    bottom: -2px;
    height: 100%;
    width: 100%;
    vertical-align: top;
  }

  path {
    fill: ${color.medium};
    animation: ${glow} 1.5s ease-in-out infinite;
  }
`;

const Initial = styled.div<AvatarProps>`
  color: ${color.lightest};
  text-align: center;

  font-size: ${typography.size.s2}px;
  line-height: ${AvatarSize.medium}px;

  ${(props) =>
		props.size === "tiny" &&
		css`
			font-size: ${parseFloat(typography.size.s1) - 2}px;
			line-height: ${AvatarSize.tiny}px;
		`}

  ${(props) =>
		props.size === "small" &&
		css`
			font-size: ${typography.size.s1}px;
			line-height: ${AvatarSize.small}px;
		`}

  ${(props) =>
		props.size === "large" &&
		css`
			font-size: ${typography.size.s3}px;
			line-height: ${AvatarSize.large}px;
		`}
`;

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
	/** 是否加载中*/
	isLoading?: boolean;
	/** 用户名*/
	username?: string;
	/** 图片地址 */
	src?: null | string;
	/** 头像大小 */
	size?: keyof typeof AvatarSize;
}
interface a11yProps {
	[key: string]: boolean | string;
}

export function Avatar(props: AvatarProps) {
	const { isLoading, src, username, size } = props;
	const avatarFigure = useMemo(() => {
		let avatarFigure = <Icon icon="useralt" />;
		const a11yProps: a11yProps = {};
		if (isLoading) {
			a11yProps["aria-busy"] = true;
			a11yProps["aria-label"] = "Loading avatar ...";
		} else if (src) {
			avatarFigure = (
				<img src={src} alt={username} data-testid="avatar-img" />
			);
		} else {
			a11yProps["aria-label"] = username!;
			avatarFigure = (
				<Initial
					size={size}
					aria-hidden="true"
					data-testid="avatar-username"
				>
					{username!.substring(0, 1)}
				</Initial>
			);
		}
		return avatarFigure;
	}, [isLoading, src, username, size]);

	return (
		<Image
			size={size}
			isLoading={isLoading}
			src={src}
			{...props}
			data-testid="avatar-div"
		>
			{avatarFigure}
		</Image>
	);
}

Avatar.defaultProps = {
	isLoading: false,
	username: "loading",
	src: null,
	size: "medium",
};
