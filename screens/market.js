import React, {
	useMemo,
	useCallback,
	useRef,
	useState,
	useEffect,
} from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	FlatList,
	ActivityIndicator,
	ToastAndroid,
} from "react-native";
import ListItems from "../components/listitems";
import Chart from "../components/chart";
import { useMarketPrice } from "../hooks/userMarketPrice";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useNetInfo } from "../provider/network";

const Market = () => {
	const { isOffLine } = useNetInfo();
	const [page, setPage] = useState(1);
	const {
		data: responseData,
		loading: loadingData,
		responseError,
	} = useMarketPrice(10, page);
	const [data, setData] = useState([]);
	const [loadMore, setLoadMore] = useState(false);
	const [selectedCoin, setSelectedCoin] = useState(null);
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ["50%"], []);

	useEffect(() => {
		if (isOffLine)
			ToastAndroid.show("Check yout netwok connection!", ToastAndroid.LONG);
	}, [isOffLine]);

	useEffect(() => {
		if (responseError)
			ToastAndroid.show("Ups something wet wrong!", ToastAndroid.LONG);
	}, [responseError]);

	useEffect(() => {
		if (!!responseData.length) {
			setLoadMore(false);
			setData(data.concat(responseData));
		}
	}, [responseData]);

	const showModal = useCallback((item) => {
		setSelectedCoin(item);
		bottomSheetModalRef.current?.present();
	}, []);

	const handleLoadMore = () => {
		setLoadMore(true);
		if (page <= 3) {
			//Only three pages
			setPage(page + 1);
		} else {
			setLoadMore(false);
		}
	};

	const Header = () => {
		return (
			<View style={styles.titleWrapper}>
				<Text style={styles.largeTitle}>Market</Text>
				<View style={styles.divider} />
			</View>
		);
	};

	const Footer = () => {
		return loadMore ? (
			<View style={{ alignItems: "center", padding: 10 }}>
				<ActivityIndicator size='large' color='gray' />
			</View>
		) : null;
	};

	return (
		!!data.length && (
			<>
				<FlatList
					style={{ paddingHorizontal: 20 }}
					ListHeaderComponent={Header}
					ListFooterComponent={Footer}
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => {
						return (
							<ListItems
								onPress={showModal}
								name={item.name}
								symbol={item.symbol}
								currentPrice={item.current_price}
								logoUrl={item.image}
								priceChangePercentage7d={
									item.price_change_percentage_7d_in_currency
								}
								sparklineIn7dPrice={item.sparkline_in_7d.price}
							/>
						);
					}}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.1}
					scrollEnabled={!loadMore}
				/>
				<BottomSheetModalProvider>
					<BottomSheetModal
						style={styles.buttonSheetWraper}
						ref={bottomSheetModalRef}
						index={0}
						snapPoints={snapPoints}>
						<Chart
							name={selectedCoin?.name}
							symbol={selectedCoin?.symbol}
							currentPrice={selectedCoin?.currentPrice}
							priceChangePercentage7d={selectedCoin?.priceChangePercentage7d}
							logoUrl={selectedCoin?.logoUrl}
							sparklineIn7d={selectedCoin?.sparklineIn7dPrice}
						/>
					</BottomSheetModal>
				</BottomSheetModalProvider>
			</>
		)
	);
};

export default Market;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginTop: StatusBar.currentHeight,
		paddingHorizontal: 20,
	},
	titleWrapper: {
		marginTop: 25,
	},
	largeTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: "#A9ABB1",
		marginTop: 10,
	},
	buttonSheetWraper: {
		backgroundColor: "white",
		borderTopStartRadius: 24,
		borderTopEndRadius: 24,
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.75,
		shadowRadius: 16.0,
		shadowColor: "#000",
		elevation: 24,
	},
	activityIndicatorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
