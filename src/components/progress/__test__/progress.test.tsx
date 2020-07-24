import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Progress } from "../index";
import { color } from "../../shared/styles";

describe("test Progress component", () => {
	it(" should render bycount", () => {
		let wrapper = render(<Progress count={11}></Progress>);
		let text = wrapper.getByText("11%");
		expect(text).toBeTruthy();
		expect(wrapper).toMatchSnapshot();
		cleanup();
		wrapper = render(<Progress count={122}></Progress>);
		expect(wrapper).toMatchSnapshot();
		text = wrapper.getByText("100%");
		expect(text).toBeTruthy();
		cleanup();
		wrapper = render(<Progress count={-12}></Progress>);
		expect(wrapper).toMatchSnapshot();
		text = wrapper.getByText("0%");
		expect(text).toBeTruthy();
		cleanup();
		wrapper = render(<Progress circle={true} count={11}></Progress>);
		text = wrapper.getByText("11%");
		expect(text).toBeTruthy();
		expect(wrapper).toMatchSnapshot();
		cleanup();
		wrapper = render(<Progress circle={true} count={122}></Progress>);
		expect(wrapper).toMatchSnapshot();
		text = wrapper.getByText("100%");
		expect(text).toBeTruthy();
		cleanup();
		wrapper = render(<Progress circle={true} count={-12}></Progress>);
		expect(wrapper).toMatchSnapshot();
		text = wrapper.getByText("0%");
		expect(text).toBeTruthy();
	});
	it("should change color", () => {
		let wrapper = render(
			<Progress
				count={11}
				primary={color.orange}
				secondary={color.purple}
				bottomColor={color.ultraviolet}
				flashColor={color.seafoam}
			></Progress>
		);
		expect(wrapper).toMatchSnapshot();
		cleanup();
		wrapper = render(
			<Progress
				count={11}
				primary={color.negative}
				secondary={color.seafoam}
				bottomColor={color.gold}
				flashColor={color.mediumdark}
			></Progress>
		);
		expect(wrapper).toMatchSnapshot();
		cleanup();
		wrapper = render(
			<Progress
				circle={true}
				count={11}
				primary={color.orange}
				secondary={color.purple}
				bottomColor={color.ultraviolet}
				flashColor={color.seafoam}
			></Progress>
		);
		expect(wrapper).toMatchSnapshot();
		cleanup();
		wrapper = render(
			<Progress
				circle={true}
				count={11}
				primary={color.negative}
				secondary={color.seafoam}
				bottomColor={color.gold}
				flashColor={color.mediumdark}
			></Progress>
		);
		expect(wrapper).toMatchSnapshot();
	});
	it("should change text ", () => {
		let wrapper = render(
			<Progress count={11} progressText={"yehuozhili"}></Progress>
		);
		let text = wrapper.getByText("yehuozhili");
		expect(text).toBeTruthy();
		cleanup();
		wrapper = render(
			<Progress
				circle={true}
				count={11}
				progressText={"yehuozhili"}
			></Progress>
		);
		text = wrapper.getByText("yehuozhili");
		expect(text).toBeTruthy();
	});
	it("should change size", () => {
		let wrapper = render(<Progress count={11} height={500}></Progress>);
		expect(wrapper).toMatchSnapshot();
		cleanup();
		wrapper = render(
			<Progress circle={true} count={11} size={400}></Progress>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
