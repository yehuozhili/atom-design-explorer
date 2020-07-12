import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "../index";

const defaultProps = {
	onClick: jest.fn(),
	className: "testprops",
};
const testProps: ButtonProps = {
	appearance: "primary",
	size: "small",
	className: "testprops",
};
const disabledProps: ButtonProps = {
	disabled: true,
	onClick: jest.fn(),
};

describe("test Button component", () => {
	it("should render the correct default button", () => {
		const wrapper = render(<Button {...defaultProps}>hello</Button>);
		expect(wrapper).toMatchSnapshot();
		const ele = wrapper.getByTestId("button");
		expect(ele).toBeInTheDocument();
		//正确渲染文本
		const text = wrapper.getByText("hello");
		expect(text).toBeTruthy();
		//button标签
		expect(ele.tagName).toEqual("BUTTON");
		expect(ele).not.toHaveAttribute("isdisabled");
		expect(ele).not.toHaveAttribute("isLinked");
		//正常添加classname
		expect(
			ele
				.getAttribute("class")
				?.split(" ")
				.includes("testprops")
		).toEqual(true);
		//正常click
		fireEvent.click(ele);
		expect(defaultProps.onClick).toHaveBeenCalled();
		//span正常显示
		expect(ele.getElementsByTagName("span")).toBeTruthy();
		//正常默认属性
		expect(ele).toHaveStyle("background:#DDDDDD");
		expect(ele).toHaveStyle("color:#333333");
		//正常大小
		expect(ele).toHaveStyle("padding: 13px 20px");
		expect(ele).toHaveStyle("font-size:14px");
	});
	it("should render correct appearance ", () => {
		let wrapper = render(<Button {...testProps}>hello</Button>);
		expect(wrapper).toMatchSnapshot();
		const ele = wrapper.getByTestId("button");
		expect(ele).toHaveStyle("background:#FF4785");
		expect(ele).toHaveStyle("color:#FFFFFF");
	});
	it("should render correct size ", () => {
		let wrapper = render(<Button {...testProps}>hello</Button>);
		expect(wrapper).toMatchSnapshot();
		const ele = wrapper.getByTestId("button");
		expect(ele).toHaveStyle("padding:8px 16px");
		expect(ele).toHaveStyle("font-size:12px");
	});
	it("should render a link", () => {
		const wrapper = render(
			<Button isLink href="/">
				linkbutton
			</Button>
		);
		expect(wrapper).toMatchSnapshot();
		const ele = wrapper.getByTestId("button");
		expect(ele).toBeInTheDocument();
		expect(ele.tagName).toEqual("A");
		expect(ele).toHaveAttribute("href", "/");
	});
	it("should render disabled ", () => {
		const wrapper = render(<Button {...disabledProps}>hello</Button>);
		expect(wrapper).toMatchSnapshot();
		const ele = wrapper.getByTestId("button");
		expect(ele).toBeInTheDocument();
		expect(ele).toHaveStyle("cursor: not-allowed");
		fireEvent.click(ele);
		expect(disabledProps.onClick).not.toHaveBeenCalled();
	});
	it("should render loading ", () => {
		const wrapper = render(<Button isLoading>hello</Button>);
		expect(wrapper).toMatchSnapshot();
		const ele = wrapper.getByTestId("button");
		expect(ele).toBeInTheDocument();
		expect(ele).toHaveStyle("cursor: progress");
		const text = wrapper.getByText("hello");
		expect(text).toHaveStyle("opacity: 0");
		const wrapper2 = render(
			<Button isLoading loadingText="yehuozhili">
				hello
			</Button>
		);
		const text2 = wrapper2.getByText("yehuozhili");
		expect(text2).toBeTruthy();
	});
});
