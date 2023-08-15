import React, { useEffect, useState } from "react";
import StaticListProviderCards from "../StaticListProviderCards/StaticListProviderCards";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Typography, Container} from "@mui/material";

function StaticListPage() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: "GET_ALL_PROVIDERS" });
	}, [])
	const provider = useSelector((store) => store.provider);

	return provider.length > 0 ? (

		<Container maxWidth='xs'>
			<Typography align="center" sx={{my:4}} variant="h6">Daycare Drop-in's Provider Network</Typography>



			{/* This component will get mapped over in order to generate the list */}

			{provider?.map((choice) => (
				<StaticListProviderCards key={choice.id} choice={choice} />
			))}
		</Container>
	) : (<Typography>Thank you for your patience as we build our network of providers.</Typography>)
}

export default StaticListPage;
