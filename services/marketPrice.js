const headers = {
	accept: "application/json",
};

export const getMarketPrice = async (per_page, page) => {
	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=true&price_change_percentage=7d`;
	const response = await fetch(url, {
		method: "GET",
		headers,
	});
	return response;
};
