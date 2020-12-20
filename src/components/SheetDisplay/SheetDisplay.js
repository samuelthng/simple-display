import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';
import { useContext, useEffect, useState } from 'react';
import { FileManagerContext } from '../../context/fileManager';
const SheetDisplay = ({ noDataText }) => {
	const { data } = useContext(FileManagerContext);

	const { SheetNames = [], Sheets = {} } = data ?? {};
	const [activeSheet, setActiveSheet] = useState(null);

	useEffect(() => {
		setActiveSheet(null); // if data mutates, remove active sheet.
	}, [data]);

	useEffect(() => {
		if (SheetNames.length === 1) setActiveSheet(SheetNames[0]); // if there's only 1 sheet, use that.
	}, [SheetNames])
	
	const [columns, setColumns] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [tableLoading, setTableLoading] = useState(false);

	/** Data to be rendered based on the active sheet. */
	useEffect(() => {
		setTableLoading(true);
		const newColumns = [];
		const sheetData = Sheets[activeSheet] || [];
		const newTableData = Object.entries(sheetData).reduce((acc, [key, value]) => {
			if (key.includes('!')) return acc;

			const splitAlphabetsAndNumbers = /[a-z]+|[^a-z]+/gi;
			const [column, rowString] = key.match(splitAlphabetsAndNumbers);
			const row = parseInt(rowString) - 1;
			
			if (row === 0) {
				newColumns.push({ 
					key: column, 
					dataIndex: column, 
					title: value.v,
					onFilter: (value, record) => record[column] && (record[column].indexOf(value) === 0 || record[column] === value),
				}); // push column header.
				return acc;
			}

			const newRows = [...acc];
			newRows.splice(row, 1, { ...acc[row], [column]: value.v });
			return newRows;
		}, []);
		setColumns(newColumns);
		setTableData(newTableData);
		setTableLoading(false);
	}, [Sheets, activeSheet]);

	return (
		<Row>
			{/* Render the table */}
			{tableData.length > 0 && (
				<Col span={24}>
					<Card>
						<Table columns={columns} dataSource={tableData} loading={tableLoading} bordered scroll={{ x: '100%' }} />
					</Card>
				</Col>
			)}
			{/* Show sheet selection options if there's more than 1 sheet on the workbook */}
			{SheetNames.length > 1 && (
				<Col span={24}>
					<Card>
						{SheetNames.map((sheetName) => (
							<Button onClick={() => setActiveSheet(sheetName)}>{sheetName}</Button>
						))}
					</Card>
				</Col>
			)}
			{/* Do this if there's no data. */}
			{data === null && (
				<Col span={24}>
					<Card>
						<Typography.Text>
							{noDataText}
						</Typography.Text>
					</Card>
				</Col>
			)}
		</Row>
	);
};

export default SheetDisplay;
