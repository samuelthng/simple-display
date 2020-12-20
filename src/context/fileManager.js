import { createContext, useState, useEffect } from 'react';
import xlsx from 'xlsx';

export const FileManagerContext = createContext();

export const FileManagerProvider = ({ children }) => {
	const [file, setFile] = useState(null);
	const [data, setData] = useState(null);
	useEffect(() => {
		const parseFile = async file => {
			if (file) {
				console.info({ file });
				try {
					// Here we attempt to read the file as text, and parse the text as a workbook to our friendly neighbourhood xlsx. That dude gon convert text to something we can use later.
					const buffer = await file.arrayBuffer();
					const data = new Uint8Array(buffer);
					const workbook = xlsx.read(data, { type: "array" });
					setData(workbook);
				} catch (error) {
					console.error(error);
				}
			} else setData(null);
		}
		parseFile(file);
	}, [JSON.stringify(file)]); // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => data && console.log({ data }), [data]);
	return (
		<FileManagerContext.Provider value={{ file, setFile, data }}>
			{children}
		</FileManagerContext.Provider>
	);
};
