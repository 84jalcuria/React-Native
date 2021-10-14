import { useState, useReducer, useEffect } from "react";
import { getMarketPrice } from "../services/marketPrice";

export const useMarketPrice = (per_page = 20, page = 1) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const response = await getMarketPrice(per_page, page);
				if (response.status !== 200) {
					throw new Error("Request Api Error");
				}
				const data = await response.json();
				setData([...data]);
			} catch (error) {
				setLoading(false);
				setError(true);
			}
		})();
	}, [per_page, page]);

	return { data, loading, error };
};
