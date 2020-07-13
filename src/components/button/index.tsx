import React, {
	ButtonHTMLAttributes,
	PropsWithChildren,
	ReactNode,
	useMemo,
	AnchorHTMLAttributes,
} from "react";
import styled from "styled-components";
import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import { easing } from "../shared/animation";

export type AppearancesTypes = keyof typeof APPEARANCES;

type btnType =
	| "primary"
	| "primaryOutline"
	| "secondary"
	| "secondaryOutline"
	| "tertiary"
	| "outline"
	| "inversePrimary"
	| "inverseSecondary"
	| "inverseOutline";

type AppearancesObj = {
	[key in btnType]: btnType;
};

export const APPEARANCES: AppearancesObj = {
	primary: "primary",
	primaryOutline: "primaryOutline",
	secondary: "secondary",
	secondaryOutline: "secondaryOutline",
	tertiary: "tertiary",
	outline: "outline",
	inversePrimary: "inversePrimary",
	inverseSecondary: "inverseSecondary",
	inverseOutline: "inverseOutline",
};

export type SizesTypes = keyof typeof SIZES;
type sizeType = "small" | "medium";
type sizeObj = {
	[key in sizeType]: sizeType;
};
export const SIZES: sizeObj = {
	small: "small",
	medium: "medium",
};

const Text = styled.span`
	display: inline-block;
	vertical-align: top;
`;

const Loading = styled.span`
	position: absolute;
	top: 50%;
	left: 0;
	right: 0;
	opacity: 0;
`;

const StyledButton = styled.button<ButtonProps>`
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: ${(props) =>
		props.size === SIZES.small ? "8px 16px" : "13px 20px"};
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  transform: translate3d(0,0,0);
  vertical-align: top;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0;
  background: transparent;


  font-size: ${(props) =>
		props.size === SIZES.small ? typography.size.s1 : typography.size.s2}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 1;

  ${(props) =>
		!props.isLoading &&
		`
      &:hover {
        transform: translate3d(0, -2px, 0);
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
      }

      &:active {
        transform: translate3d(0, 0, 0);
      }

      &:focus {
        box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
      }

      &:focus:hover {
        box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
      }
    `}

  ${Text} {
    transform: scale3d(1,1,1) translate3d(0,0,0);
    transition: transform 700ms ${easing.rubber};
    opacity: 1;
  }

  ${Loading} {
    transform: translate3d(0, 100%, 0);
  }

  ${(props) =>
		props.disabled &&
		`
      cursor: not-allowed !important;
      opacity: 0.5;
      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
		props.isUnclickable &&
		`
      cursor: default !important;
      pointer-events: none;
      &:hover {
        transform: none;
      }
    `}

  ${(props) =>
		props.isLoading &&
		`
      cursor: progress !important;
      opacity: 0.7;

      ${Loading} {
        transition: transform 700ms ${easing.rubber};
        transform: translate3d(0, -50%, 0);
        opacity: 1;
      }

      ${Text} {
        transform: scale3d(0, 0, 1) translate3d(0, -100%, 0);
        opacity: 0;
      }

      &:hover {
        transform: none;
      }
    `}



  ${(props) =>
		props.appearance === APPEARANCES.primary &&
		`
      background: ${color.primary};
      color: ${color.lightest};

      ${!props.isLoading &&
			`
          &:hover {
            background: ${darken(0.05, color.primary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
          }
        `}
    `}

  ${(props) =>
		props.appearance === APPEARANCES.secondary &&
		`
      background: ${color.secondary};
      color: ${color.lightest};

      ${!props.isLoading &&
			`
          &:hover {
            background: ${darken(0.05, color.secondary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.secondary, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.secondary, 0.2)} 0 8px 18px 0px;
          }
        `}
    `}

  ${(props) =>
		props.appearance === APPEARANCES.tertiary &&
		`
      background: ${color.tertiary};
      color: ${color.darkest};

      ${!props.isLoading &&
			`
          &:hover {
            background: ${darken(0.05, color.tertiary)};
          }
          &:active {
            box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
          }
          &:focus {
            box-shadow: ${rgba(color.darkest, 0.15)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${rgba(color.darkest, 0.05)} 0 8px 18px 0px;
          }
        `}
    `}

  ${(props) =>
		props.appearance === APPEARANCES.outline &&
		`
      box-shadow: ${opacify(0.05, color.border)} 0 0 0 1px inset;
      color: ${color.dark};
      background: transparent;

      ${!props.isLoading &&
			`
          &:hover {
            box-shadow: ${opacify(0.3, color.border)} 0 0 0 1px inset;
          }

          &:active {
            background: ${opacify(0.05, color.border)};
            box-shadow: transparent 0 0 0 1px inset;
            color: ${color.darkest};
          }

          &:active:focus:hover {
            ${
				/* This prevents the semi-transparent border from appearing atop the background */ ""
			}
            background: ${opacify(0.05, color.border)};
            box-shadow:  ${rgba(color.darkest, 0.15)} 0 1px 9px 2px;
          }

          &:focus {
            box-shadow: ${opacify(0.05, color.border)} 0 0 0 1px inset, 
            ${rgba(color.darkest, 0.15)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${opacify(0.05, color.border)} 0 0 0 1px inset, 
            ${rgba(color.darkest, 0.05)} 0 8px 18px 0px;
          }
        `};
    `};

    ${(props) =>
		props.appearance === APPEARANCES.primaryOutline &&
		`
        box-shadow: ${color.primary} 0 0 0 1px inset;
        color: ${color.primary};

        &:hover {
          box-shadow: ${color.primary} 0 0 0 1px inset;
          background: transparent;
        }

        &:active {
          background: ${color.primary};
          box-shadow: ${color.primary} 0 0 0 1px inset;
          color: ${color.lightest};
        }
        &:focus {
          box-shadow: ${color.primary} 0 0 0 1px inset, ${rgba(
			color.primary,
			0.4
		)} 0 1px 9px 2px;
        }
        &:focus:hover {
          box-shadow: ${color.primary} 0 0 0 1px inset, ${rgba(
			color.primary,
			0.2
		)} 0 8px 18px 0px;
        }
      `};

    ${(props) =>
		props.appearance === APPEARANCES.secondaryOutline &&
		`
        box-shadow: ${color.secondary} 0 0 0 1px inset;
        color: ${color.secondary};

        &:hover {
          box-shadow: ${color.secondary} 0 0 0 1px inset;
          background: transparent;
        }

        &:active {
          background: ${color.secondary};
          box-shadow: ${color.secondary} 0 0 0 1px inset;
          color: ${color.lightest};
        }
        &:focus {
          box-shadow: ${color.secondary} 0 0 0 1px inset,
            ${rgba(color.secondary, 0.4)} 0 1px 9px 2px;
        }
        &:focus:hover {
          box-shadow: ${color.secondary} 0 0 0 1px inset,
            ${rgba(color.secondary, 0.2)} 0 8px 18px 0px;
        }
      `};

      ${(props) =>
			props.appearance === APPEARANCES.inversePrimary &&
			`
          background: ${color.lightest};
          color: ${color.primary};

          ${!props.isLoading &&
				`
              &:hover {
                background: ${color.lightest};
              }
              &:active {
                box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
              }
              &:focus {
                box-shadow: ${rgba(color.primary, 0.4)} 0 1px 9px 2px;
              }
              &:focus:hover {
                box-shadow: ${rgba(color.primary, 0.2)} 0 8px 18px 0px;
              }
          `}
      `}

      ${(props) =>
			props.appearance === APPEARANCES.inverseSecondary &&
			`
          background: ${color.lightest};
          color: ${color.secondary};

          ${!props.isLoading &&
				`
              &:hover {
                background: ${color.lightest};
              }
              &:active {
                box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 3em inset;
              }
              &:focus {
                box-shadow: ${rgba(color.secondary, 0.4)} 0 1px 9px 2px;
              }
              &:focus:hover {
                box-shadow: ${rgba(color.secondary, 0.2)} 0 8px 18px 0px;
              }
          `}
      `}

      ${(props) =>
			props.appearance === APPEARANCES.inverseOutline &&
			`
          box-shadow: ${color.lightest} 0 0 0 1px inset;
          color: ${color.lightest};

          &:hover {
            box-shadow: ${color.lightest} 0 0 0 1px inset;
            background: transparent;
          }

          &:active {
            background: ${color.lightest};
            box-shadow: ${color.lightest} 0 0 0 1px inset;
            color: ${color.darkest};
          }
          &:focus {
            box-shadow: ${color.lightest} 0 0 0 1px inset,
              ${rgba(color.darkest, 0.4)} 0 1px 9px 2px;
          }
          &:focus:hover {
            box-shadow: ${color.lightest} 0 0 0 1px inset,
              ${rgba(color.darkest, 0.2)} 0 8px 18px 0px;
          }
      `};

`;

export interface CustormButtonProps {
	/** 是否禁用 */
	disabled?: boolean;
	/** 是否加载中 */
	isLoading?: boolean;
	/** 是否是a标签 */
	isLink?: boolean;
	/** 是否替换加载中文本 */
	loadingText?: ReactNode;
	/** 按钮大小 */
	size?: SizesTypes;
	/** 按钮类型 */
	appearance?: AppearancesTypes;
	/** 无效点击 */
	isUnclickable?: boolean;
}

export type ButtonProps = CustormButtonProps &
	AnchorHTMLAttributes<HTMLAnchorElement> &
	ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: PropsWithChildren<ButtonProps>) {
	const { isLoading, loadingText, isLink, children } = props;
	const buttonInner = (
		<>
			<Text>{children}</Text>
			{isLoading && <Loading>{loadingText || "Loading..."}</Loading>}
		</>
	);
	const btnType = useMemo(() => {
		if (isLink) {
			return "a";
		}
	}, [isLink]);

	return (
		<StyledButton as={btnType} data-testid={"button"} {...props}>
			{buttonInner}
		</StyledButton>
	);
}

Button.defaultProps = {
	isLoading: false,
	loadingText: null,
	isLink: false,
	appearance: APPEARANCES.tertiary,
	disabled: false,
	isUnclickable: false,
	containsIcon: false,
	size: SIZES.medium,
	ButtonWrapper: undefined,
};

export default Button;
