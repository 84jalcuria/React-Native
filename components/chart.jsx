import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { formatSparklineIn7d } from "../utils/utils";
import {
	ChartDot,
	ChartPath,
	ChartPathProvider,
	ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

const { width: SIZE } = Dimensions?.get("window");

const Chart = ({
	name,
	symbol,
	currentPrice,
	priceChangePercentage7d,
	logoUrl,
	sparklineIn7d,
}) => {
	const latestCurrentPrice = useSharedValue(currentPrice);

	useEffect(() => {
		latestCurrentPrice.value = currentPrice;
	}, [currentPrice]);

	const formatUSD = (value) => {
		"worklet";
		if (value === "") {
			return `${
				"$" +
				parseFloat(latestCurrentPrice.value)
					.toFixed(2)
					.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
			}`;
		}
		return `$${parseFloat(value)
			.toFixed(2)
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
	};

	return (
		<ChartPathProvider
			data={{
				points: formatSparklineIn7d(sparklineIn7d),
				smoothingStrategy: "bezier",
			}}>
			<View style={styles.chartContainer}>
				{/*----------Title Container--------------*/}
				<View style={styles.titleContainer}>
					{/*-------Firts Row---------*/}
					<View style={styles.firstRow}>
						<View style={styles.firstRowLeftContainer}>
							<Image
								source={{ uri: logoUrl }}
								style={styles.logo}
								resizeMode='center'
							/>
							<View style={styles.leftTextContainer}>
								<Text style={styles.name}>{name}</Text>
								<Text style={styles.symbol}>({symbol})</Text>
							</View>
						</View>
						<Text style={styles.sevenDay}>7d</Text>
					</View>
					{/*-------End Firts Row---------*/}
					{/*------Second Row-------*/}
					<View style={styles.secondRow}>
						<ChartYLabel
							format={formatUSD}
							style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}
						/>
						<Text
							style={[
								styles.changePricePercentage,
								{ color: priceChangePercentage7d < 0 ? "red" : "green" },
							]}>
							{priceChangePercentage7d.toFixed(2)}%
						</Text>
					</View>
				</View>
				{/*------End Second Row-------*/}
				{/*----------End Title Container--------------*/}
				{/*----------Chart Line-----------*/}
				<View style={styles.chartLineContainer}>
					<ChartPath height={SIZE / 2} stroke='black' width={SIZE} />
					<ChartDot style={{ backgroundColor: "black" }} />
				</View>
				{/*----------End Chart Line-----------*/}
			</View>
		</ChartPathProvider>
	);
};

export default Chart;

const styles = StyleSheet.create({
	chartContainer: {
		//paddingHorizontal: 15,
		paddingVertical: 2,
	},
	titleContainer: {
		paddingHorizontal: 15,
	},
	firstRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	firstRowLeftContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	logo: {
		width: 25,
		height: 25,
	},
	leftTextContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 8,
	},
	name: {
		textTransform: "capitalize",
		color: "#A9ABB1",
		fontSize: 12,
	},
	symbol: {
		textTransform: "uppercase",
		marginLeft: 2,
		color: "#A9ABB1",
		fontSize: 10,
	},
	sevenDay: {
		color: "#A9ABB1",
		fontSize: 12,
	},

	secondRow: {
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	currentPrice: {
		fontSize: 18,
		fontWeight: "bold",
	},
	changePricePercentage: {
		fontSize: 12,
	},
	chartLineContainer: {
		//paddingHorizontal: 10,
		marginTop: 15,
	},
});
