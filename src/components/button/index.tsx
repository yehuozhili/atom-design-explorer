import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: PropsWithChildren<ButtonProps>) {
	const { children, ...rest } = props;
	return <button {...rest}>{children}</button>;
}
export default Button;
