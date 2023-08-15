import React, { useEffect, useState } from "react";
import ListPageSearchBar from "../ListPageSearchBar/ListPageSearchBar";
import ProviderListCards from "../ListPageProviderCards/ListPageProviderCards";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from '@mui/material';

function ListPage() {
	const dispatch = useDispatch()
	const avail = useSelector((store) => store.availability);
	const filter = useSelector((store) => store.filter);
	const filteredAvail = useSelector((store) => store.filteredAvail);
	const user = useSelector((store) => store.user);
	const provider = useSelector((store) => store.provider);






	useEffect(() => {
		dispatch({ type: "GET_ALL_AVAILABILITY" });

		// dispatch({ type: "FETCH_FILTERED_RESULTS" });
		// if(!filter){
		//   dispatch({ type: "GET_ALL_AVAILABILITY" });

		// }else{

		// }
	}, [])



	// const [filtered, setFiltered]= useState(false);
	// console.log(filter);
	console.log(filter);

	return (
		<Container maxWidth="xs">
			<Typography variant="h6" align="center">Filtered Search</Typography>

			{/* Here's the import for the search bar component */}

			<ListPageSearchBar avail={avail} />

			{/* This component will get mapped over to display the list of providers */}
			{!filter ? (
				<>
					<Typography sx={{ my: 2, fontSize:'1.25em', fontWeight:'bold'}}  >All availabilities</Typography>
					{avail?.map((choice) => (
						<ProviderListCards key={choice.id} choice={choice} />
					))}
				</>
			) : (
				<>
					{filteredAvail[1].newResults.length > 0 ? (
						<Typography sx={{ mt: 4, mb:3, fontStyle: "italic" }}>
							{filteredAvail[0].filterTerms}
						</Typography>
					) : (
						<>
							<Typography
								align="center"
								sx={{ mt: 4, fontStyle: "italic" }}
								paragraph
								variant="h7"
							>
								{`Sorry, no availabilities found ${filteredAvail[0].filterTerms
									.replace(`Openings`, "")
									.replace(`:`, "")}.`}
							</Typography>
							<Typography
								align="center"
								sx={{ fontWeight: "bold", fontSize: ".95em" }}
							>
								Please reset the filters to start a new search.
							</Typography>
						</>
					)}
					{filteredAvail[1]?.newResults.map((choice) => (
						<ProviderListCards key={choice.id} choice={choice} />
					))}
				</>
			)}
		</Container>
	);
}

export default ListPage;
