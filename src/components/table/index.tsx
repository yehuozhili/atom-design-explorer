import React, { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import styled from "styled-components";
import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import { easing } from "../shared/animation";
import Pagination from "../pagination";
import { Icon } from "../icon";

const TableTable = styled.table`
	width: 100%;
	text-align: left;
	border-radius: 2px 2px 0 0;
	border-collapse: separate;
	border-spacing: 0;
	table-layout: auto;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	color: rgba(0, 0, 0, 0.65);
	font-variant: tabular-nums;
	line-height: 1.5715;
	list-style: none;
	font-feature-settings: "tnum";
	position: relative;
	z-index: 0;
	clear: both;
	font-size: 14px;
	background: #fff;
	border-radius: 2px;
	& > thead > tr > th {
		color: rgba(0, 0, 0, 0.85);
		font-weight: 500;
		text-align: left;
		background: #fafafa;
		border-bottom: 1px solid #f0f0f0;
		transition: background 0.3s ease;
		position: relative;
		padding: 16px;
		overflow-wrap: break-word;
	}
	& > tbody > tr {
		& > td {
			border-bottom: 1px solid #f0f0f0;
			transition: background 0.3s;
			position: relative;
			padding: 16px;
			overflow-wrap: break-word;
		}
		&:hover {
			& > td {
				background: #fafafa;
			}
		}
	}
`;

const TableHeadSpan = styled.span`
	display: inline-block;
	position: absolute;
	right: 0;
	top: 0;
	padding: 16px;
	cursor: pointer;
	& svg {
		height: 10px;
		width: 10px;
	}
`;

const MapData = (data: SourceDataType[], columnData: ColumnType[]) => {
	return data.map((v) => {
		return (
			<tr key={v.key}>
				{columnData.map((value, index) => {
					return (
						<td key={index}>
							<span>
								{value.render
									? value.render(v[value.dataIndex], v, value)
									: v[value.dataIndex]}
							</span>
						</td>
					);
				})}
			</tr>
		);
	});
};

export interface SourceDataType {
	key: string;
	[key: string]: any;
}
export interface ColumnType {
	title: ReactNode;
	/** 排序等操作用来代替这列的 */
	dataIndex: string;
	sorter?: {
		compare: (a: SourceDataType, b: SourceDataType) => number;
	};
	render?: (v: any, value: SourceDataType, rowData: ColumnType) => ReactNode;
}

export type TableProps = {
	/** 表内数据部分 */
	data: SourceDataType[];
	/** 表头部分*/
	columns: ColumnType[];
	/** 是否开启排序 */
	sorted?: boolean;
	/** 是否开启页码 */
	pagination?: boolean;
	/** 开启页码时才有效，设置每页显示几个*/
	pageSize?: number;
};

export function Table(props: TableProps) {
	const { data, columns, sorted, pageSize, pagination } = props;
	const [columnData, setColumnData] = useState<ColumnType[]>([]);
	const [sourceData, setSourceData] = useState<SourceDataType[]>([]);
	const [paginationData, setPaginationData] = useState<SourceDataType[][]>(
		[]
	);
	const [current, setCurrent] = useState(0); //这个是paginationData的索引
	const [sortedData, setSortedData] = useState<SourceDataType[]>([]);
	const [filterState, setFilterState] = useState<number[]>([]); //记录第几列开启筛选
	const originPagination = useMemo(() => {
		return (data: SourceDataType[]) => {
			let tmp: SourceDataType[][] = [];
			let len = data.length;
			let pagenumber = Math.ceil(len / pageSize!); //页数
			for (let i = 0; i < pagenumber; i++) {
				//每页该显示多少内容做好。
				tmp[i] = data.slice(
					0 + i * pageSize!,
					pageSize! + i * pageSize!
				);
			}
			setPaginationData(tmp);
		};
	}, [pageSize]);
	const totalColumn = useMemo(() => {
		//表头总长
		setColumnData(columns); //表头拿来渲染
		setFilterState(new Array(columns.length).fill(0)); //初始化排序数据
		return columns.length;
	}, [columns]);
	const totalLen = useMemo(() => {
		//内容部分总长
		setSourceData(data); //数据
		if (pagination) {
			//分页走paginationData
			originPagination(data);
		}
		return data.length;
	}, [data, originPagination, pagination]);
	const renderData = useMemo(() => {
		//内容部分渲染
		let render;
		if (pagination && paginationData.length !== 0) {
			//如果分页，渲染分页
			render = MapData(paginationData[current], columnData);
		} else {
			//否则直接渲染
			if (sortedData.length === 0) {
				render = MapData(sourceData, columnData);
			} else {
				//如果排序有数据，就按排序渲染
				render = MapData(sortedData, columnData);
			}
		}
		return render;
	}, [
		columnData,
		current,
		pagination,
		paginationData,
		sortedData,
		sourceData,
	]);

	return (
		<div>
			<TableTable>
				<thead>
					<tr>
						{columnData.map((v, i) => {
							return (
								<th key={i}>
									<span>{v.title}</span>
									{v.sorter && sorted && v.sorter.compare && (
										<TableHeadSpan
											onClick={() => {
												if (filterState[i]) {
													//如果已经开启了排序
													//查看是不是1，如果为1，进行逆序排序，否则清空
													if (filterState[i] === 1) {
														let res = sourceData
															.slice()
															.sort(
																(a, b) =>
																	-v.sorter!.compare(
																		a,
																		b
																	)
															); //数据传给compare
														let newfilter = new Array(
															totalColumn
														).fill(0);
														newfilter[i] = 2;
														setSortedData(res);
														setFilterState(
															newfilter
														);
													} else {
														setSortedData([]); //清空排序数据
														if (pagination) {
															originPagination(
																data
															);
														}
														filterState[i] = 0;
														setFilterState([
															...filterState,
														]);
													}
												} else {
													//没有开启就开启排序
													let res = sourceData
														.slice()
														.sort(
															v.sorter!.compare
														); //数据传给compare
													let newfilter = new Array(
														totalColumn
													).fill(0);
													newfilter[i] = 1;
													setSortedData(res);
													setFilterState(newfilter);
												}
											}}
										>
											<Icon
												icon="arrowup"
												block
												color={
													filterState[i] === 1
														? color.primary
														: color.dark
												}
											></Icon>
											<Icon
												icon="arrowdown"
												block
												color={
													filterState[i] === 2
														? color.primary
														: color.dark
												}
											></Icon>
										</TableHeadSpan>
									)}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>{renderData}</tbody>
			</TableTable>
			{pagination && (
				<Pagination
					style={{ justifyContent: "flex-end" }}
					total={totalLen}
					pageSize={pageSize}
					callback={(v) => setCurrent(v - 1)}
					defaultCurrent={1}
				></Pagination>
			)}
		</div>
	);
}

Table.defaultProps = {
	sorted: false,
	pagination: false,
	pageSize: 10,
};
