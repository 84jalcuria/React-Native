import React, { useState, useEffect, createContext, useContext } from "react";
import NetInfo from "@react-native-community/netinfo";

const NetInfoContext = createContext(null);

export const NetInfoProvider = (props) => {
	const [isOffLine, setIsOffLine] = useState(false);

	useEffect(() => {
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offLine = !(state.isConnected && state.isInternetReachable);
			setIsOffLine(offLine);
		});
		return () => {
			removeNetInfoSubscription();
		};
	}, []);

	const value = { isOffLine };
	return <NetInfoContext.Provider value={value} {...props} />;
};

export const useNetInfo = () => {
	const context = useContext(NetInfoContext);
	if (!context)
		throw new Error("useNetInfo must be used within a context provider ");
	return context;
};
