import React from "react";
import { Table, SourceDataType } from "./index";

import { withKnobs, boolean, number } from "@storybook/addon-knobs";

export default {
	title: "Table",
	component: Table,
	decorators: [withKnobs],
};

const columns = [
	{
		title: "Name",
		dataIndex: "name",
	},
	{
		title: "Chinese Score",
		dataIndex: "chinese",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) =>
				b.chinese - a.chinese,
		},
	},
	{
		title: "Math Score",
		dataIndex: "math",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) => b.math - a.math,
		},
	},
	{
		title: "English Score",
		dataIndex: "english",
		sorter: {
			compare: (a: SourceDataType, b: SourceDataType) =>
				b.english - a.english,
		},
	},
];
const data = [
	{
		key: "1",
		name: "John Brown",
		chinese: 55,
		math: 60,
		english: 70,
	},
	{
		key: "2",
		name: "Jim Green",
		chinese: 98,
		math: 66,
		english: 89,
	},
	{
		key: "3",
		name: "Joe Black",
		chinese: 78,
		math: 90,
		english: 70,
	},
	{
		key: "4",
		name: "Jim Red",
		chinese: 88,
		math: 99,
		english: 89,
	},
];

export const knobsTable = () => (
	<Table
		columns={columns}
		data={data}
		sorted={boolean("sorted", true)}
		pagination={boolean("pagination", false)}
		pageSize={number("pageSize", 2)}
	></Table>
);

export const withPagination = () => (
	<Table columns={columns} data={data} pagination={true} pageSize={2}></Table>
);
