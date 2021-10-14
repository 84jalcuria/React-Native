import moment from "moment";

export const currencyFormat = (num) => {
	return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const formatSparklineIn7d = (sparkline) => {
	const sevenDaysAgo = moment().subtract(7, "days").unix();
	return sparkline.map((item, index) => ({
		x: sevenDaysAgo + (index + 1) * 3600,
		y: item,
	}));
};
