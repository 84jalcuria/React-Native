import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Market from "./screens/market";
import { NetInfoProvider } from "./provider/network";

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<NetInfoProvider>
				<Market />
			</NetInfoProvider>
			<ExpoStatusBar style='dark' />
		</SafeAreaView>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginTop: StatusBar.currentHeight,
	},
});
