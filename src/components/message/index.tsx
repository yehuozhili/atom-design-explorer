import React, { ReactNode, useMemo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { color, typography, messageBoxShadow } from "../shared/styles";
import {
	messageCloseAnimate,
	messageOpenAnimate,
	iconSpin,
} from "../shared/animation";
import ReactDom, { unmountComponentAtNode } from "react-dom";
import { Icon } from "../icon";

export type MessageType =
	| "info"
	| "success"
	| "error"
	| "warning"
	| "loading"
	| "default";

export interface MessageConfig {
	/** 挂载点*/
	mount: HTMLElement;
	/** 动画延迟时间 */
	delay: number;
	/** 结束后回调 */
	callback: any;
	/** 动画持续时间 */
	animationDuring: number;
	/** 底色*/
	background: string;
	/** 文字颜色*/
	color: string;
}

const defaultConfig: MessageConfig = {
	mount: document.body,
	delay: 2000,
	callback: null,
	animationDuring: 300,
	background: color.lightest,
	color: color.dark,
};

let wrap: HTMLElement;
export const createMessage = (type: MessageType) => {
	return (content: ReactNode, config: Partial<MessageConfig> = {}) => {
		const fconfig = { ...defaultConfig, ...config };
		if (!wrap) {
			//如果有的话，说明已经调用过这个函数了，这个空div就可以一直复用
			wrap = document.createElement("div");
			wrap.style.cssText = `line-height:
		1.5;text-align:
		center;color: #333;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		position: fixed;
		z-index: 100000;
		width: 100%;
		top: 16px;
		left: 0;
		pointer-events: none;`;
			if (wrap) {
				fconfig.mount.appendChild(wrap); //挂body上
			}
		}

		const divs = document.createElement("div");
		wrap.appendChild(divs);
		ReactDom.render(
			<Message
				rootDom={wrap}
				parentDom={divs}
				content={content}
				fconfig={fconfig}
				iconType={type}
			/>,
			divs
		);
	};
};

const MessageText = styled.span<{ bg: string; fc: string }>`
	display: inline-block;
	padding: 10px 16px;
	background: ${(props) => props.bg};
	color: ${(props) => props.fc};
	font-size: ${typography.size.s2}px;
	font-weight: ${typography.weight.bold};
	margin: 10px;
	${messageBoxShadow};
	border-radius: 2px;
`;

const IconWrapper = styled.span<{ spin?: boolean }>`
	margin-right: 10px;
	& > svg {
		font-size: ${typography.size.s2}px;
		${(props) =>
			props.spin &&
			css`
				animation: ${iconSpin} 2s linear infinite;
			`}
	}
`;

const MessageTextWrapper = styled.div<{
	openState: boolean;
	closeState: boolean;
	ani: number;
}>`
	${(props) =>
		props.openState &&
		css`
			animation: ${messageOpenAnimate} ${props.ani / 1000}s ease-in;
		`}
	${(props) =>
		props.closeState &&
		css`
			animation: ${messageCloseAnimate} ${props.ani / 1000}s ease-in;
		`}
`;

export type MessageProps = {
	rootDom: HTMLElement; //这个用来干掉parentDom 这个可以常驻
	parentDom: Element | DocumentFragment; //这个是挂载点 要unmount卸载 完毕后卸载挂载点 注意！一共2步卸载，别漏了
	content: ReactNode;
	fconfig: MessageConfig;
	iconType: MessageType;
};
export function Message(props: MessageProps) {
	const { rootDom, parentDom, content, fconfig, iconType } = props;
	const [close, setClose] = useState(false);

	const renderIcon = useMemo(() => {
		switch (iconType) {
			case "default":
				return null;
			case "info":
				return (
					<IconWrapper>
						<Icon icon="info" color={color.primary}></Icon>
					</IconWrapper>
				);
			case "success":
				return (
					<IconWrapper>
						<Icon icon="check" color={color.positive}></Icon>
					</IconWrapper>
				);
			case "error":
				return (
					<IconWrapper>
						<Icon icon="closeAlt" color={color.negative}></Icon>
					</IconWrapper>
				);
			case "warning":
				return (
					<IconWrapper>
						<Icon icon="info" color={color.warning}></Icon>
					</IconWrapper>
				);
			case "loading":
				return (
					<IconWrapper spin={true}>
						<Icon icon="sync"></Icon>
					</IconWrapper>
				);
			default:
				return null;
		}
	}, [iconType]);

	const unmount = useMemo(() => {
		return () => {
			if (parentDom && rootDom) {
				unmountComponentAtNode(parentDom);
				rootDom.removeChild(parentDom);
			}
		};
	}, [parentDom, rootDom]);

	useEffect(() => {
		//结束操作
		let closeStart = fconfig.delay - fconfig.animationDuring;
		let timer1 = window.setTimeout(
			() => {
				setClose(true);
			},
			closeStart > 0 ? closeStart : 0
		);
		let timer2 = window.setTimeout(() => {
			setClose(false);
			unmount();
			if (fconfig.callback) {
				fconfig.callback();
			}
		}, fconfig.delay);
		return () => {
			window.clearTimeout(timer1);
			window.clearTimeout(timer2);
		};
	}, [unmount, fconfig]);
	return (
		<MessageTextWrapper
			openState={true}
			closeState={close}
			ani={fconfig.animationDuring}
		>
			<MessageText bg={fconfig.background} fc={fconfig.color}>
				{renderIcon}
				{content}
			</MessageText>
		</MessageTextWrapper>
	);
}
export const message = {
	info: createMessage("info"),
	success: createMessage("success"),
	error: createMessage("error"),
	warning: createMessage("warning"),
	loading: createMessage("loading"),
	default: createMessage("default"),
};

export default Message;
