import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useQuery(queryUrl) {
	const [data, setData] = useState([]);
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const fetchData = async (url) => {
			try {
				const res = await axios.get(url);

				setData(res.data);
				setMessage(`Success! Payload:\n${res.data}`);
			} catch (err) {
				setData([]);
				setMessage(`Request failed:\n${err}`);
			} finally {
				setLoading(false);
			}
		};

		fetchData(queryUrl);
	}, [queryUrl]);

	return { data, message, loading };
}
