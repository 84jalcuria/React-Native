import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { currencyFormat } from "../utils/utils";

const ListItems = ({
	name,
	symbol,
	currentPrice,
	priceChangePercentage7d,
	logoUrl,
	sparklineIn7dPrice,
	onPress,
}) => {
	return (
		<TouchableOpacity
			onPress={() =>
				onPress({
					name,
					symbol,
					currentPrice,
					priceChangePercentage7d,
					logoUrl,
					sparklineIn7dPrice,
				})
			}>
			<View style={styles.container}>
				{/*Left Side*/}
				<View style={styles.leftContainer}>
					<Image
						source={{ uri: logoUrl }}
						style={styles.logo}
						resizeMode='center'
					/>
					<View style={styles.leftContainerTitleSubTitle}>
						<Text style={styles.title}>{name}</Text>
						<Text style={styles.subTitle}>{symbol}</Text>
					</View>
				</View>
				{/*Righ Side*/}
				<View style={styles.rightContainerPrices}>
					<Text style={styles.price}>{currencyFormat(currentPrice)}</Text>
					<Text
						style={[
							styles.priceAmount,
							{ color: priceChangePercentage7d < 0 ? "red" : "green" },
						]}>
						{priceChangePercentage7d.toFixed(2)}%
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default memo(ListItems);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		paddingRight: 8,
	},
	leftContainer: {
		flexDirection: "row",
	},
	logo: {
		width: 42,
		height: 42,
	},
	leftContainerTitleSubTitle: {
		marginLeft: 10,
		justifyContent: "center",
	},
	title: {
		fontSize: 14,
		textTransform: "uppercase",
	},
	subTitle: {
		marginTop: 4,
		fontSize: 12,
		textTransform: "uppercase",
		color: "#A9ABB1",
		fontWeight: "bold",
	},
	rightContainerPrices: {
		justifyContent: "center",
		alignItems: "flex-end",
	},
	price: {
		fontSize: 14,
	},
	priceAmount: {
		marginTop: 4,
		fontSize: 12,
	},
});
