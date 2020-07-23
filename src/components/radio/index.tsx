import React, { ReactNode, AllHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { color, typography } from "../shared/styles";
import { rgba } from "polished";

const Label = styled.label<RadioProps>`
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
	font-size: ${typography.size.s2}px;
	font-weight: ${typography.weight.bold};
	position: relative;
	height: 1em;
	display: flex;
	align-items: center;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const OptionalText = styled.span<RadioProps>`
	${(props) =>
		props.hideLabel &&
		css`
			border: 0px !important;
			clip: rect(0 0 0 0) !important;
			-webkit-clip-path: inset(100%) !important;
			clip-path: inset(100%) !important;
			height: 1px !important;
			overflow: hidden !important;
			padding: 0px !important;
			position: absolute !important;
			white-space: nowrap !important;
			width: 1px !important;
		`}
`;

const Description = styled.div`
	font-size: ${typography.size.s1}px;
	font-weight: ${typography.weight.regular};
	color: ${color.mediumdark};
	margin-top: 4px;
	margin-left: calc(${typography.size.s2}px + 0.4em);
	width: 100%;
`;

const RadioWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

const Input = styled.input<RadioProps>`
	margin: 0 0.4em 0 0;
	font-size: initial;
	opacity: 0;

	& + span {
		&:before,
		&:after {
			position: absolute;
			top: 0;
			left: 0;
			height: 1em;
			width: 1em;
			content: "";
			display: block;
			border-radius: 3em;
		}
	}

	& + span:before {
		box-shadow: ${color.mediumdark} 0 0 0 1px inset;
	}

	&:checked + span:before {
		box-shadow: ${(props) => color[props.appearance!]} 0 0 0 1px inset;
	}

	&:checked:focus + span:before {
		box-shadow: ${(props) => color[props.appearance!]} 0 0 0 1px inset,
			${(props) => rgba(color[props.appearance!], 0.3)} 0 0 5px 2px;
	}

	& + span:after {
		transition: all 150ms ease-out;
		transform: scale3d(0, 0, 1);

		height: 10px;
		margin-left: 2px;
		margin-top: 2px;
		width: 10px;

		opacity: 0;
	}

	&:checked + span:after {
		transform: scale3d(1, 1, 1);
		background: ${(props) => color[props.appearance!]};
		opacity: 1;
	}
`;

const Error = styled.span`
	font-weight: ${typography.weight.regular};
	font-size: ${typography.size.s2}px;
	color: ${color.negative};
	margin-left: 6px;
	height: 1em;
	display: flex;
	align-items: center;
`;

export interface RadioProps
	extends Omit<AllHTMLAttributes<HTMLInputElement>, "as" | "label"> {
	/** 主题色 */
	appearance?: keyof typeof color;
	/** label展示 */
	label?: ReactNode;
	/** 是否隐藏label*/
	hideLabel?: boolean;
	/** 错误文本 */
	error?: string;
	/** 描述文本 */
	description?: string;
	/** wrapper类名 */
	wrapperClass?: string;
}

export function Radio(props: RadioProps) {
	const {
		wrapperClass,
		error,
		description,
		label,
		hideLabel,
		style,
		...restProps
	} = props;
	const { disabled } = props;

	return (
		<RadioWrapper className={wrapperClass} style={style}>
			<Label disabled={disabled}>
				<Input
					{...restProps}
					role="radio"
					aria-invalid={!!error}
					type="radio"
				/>
				<span>
					<OptionalText hideLabel={hideLabel}>{label}</OptionalText>
				</span>
			</Label>
			{error && <Error>{error}</Error>}
			{description && <Description>{description}</Description>}
		</RadioWrapper>
	);
}

Radio.defaultProps = {
	appearance: "primary",
	hideLabel: false,
};

export default Radio;
