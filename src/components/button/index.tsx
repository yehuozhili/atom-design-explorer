import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

const Mybutton = styled.button({
	color: "red",
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button(props: PropsWithChildren<ButtonProps>) {
	const { children, ...rest } = props;
	return <Mybutton {...rest}>{children}</Mybutton>;
}
export default Button;
