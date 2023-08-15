import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Button, Select, FormControl, InputLabel, MenuItem, FormHelperText, Box} from '@mui/material'

function ListPageSearchBar ({avail}) {
	const dispatch = useDispatch();

	const filterCity = () => {
		const cityFilter = [];
		for (let city of avail) {
			if (
				city &&
				city.provider_city &&
				!cityFilter.includes(city.provider_city)
			) {
				cityFilter.push(city.provider_city);
			}
		}
		console.log("results based on city are:", cityFilter);
		return cityFilter;
	};
	const filterByCity = filterCity();

	const filterDate = () => {
		const dateFilter = [];
		for (let date of avail) {
			if (date && date.on_date && !dateFilter.includes(date.on_date)) {
				dateFilter.push(date.on_date);
			}
		}
		// console.log("results based on date are:", dateFilter);
		return dateFilter;
	};
	const filterByDate = filterDate();

	const filterName = () => {
		const nameFilter = [];
		for (let name of avail) {
			if (name && name.biz_name && !nameFilter.includes(name.biz_name)) {
				nameFilter.push(name.biz_name);
			}
		}
		// console.log("results based on provider name are:", nameFilter);
		return nameFilter;
	};
	const filterByName = filterName();




	const [date, setDate] = useState([]);
	const [name, setName] = useState([]);
	const [city, setCity] = useState([]);
    const [age, setAge]= useState(['Infant', 'Toddler', 'Pre-K', 'School age']);

	const picked = {
		age: "",
		city: "",
		date: "",
		name: "",
	};
	const [userChoice, setUserChoice] = useState(picked);

	useEffect(() => {
		setCity(filterByCity);
		setDate(filterByDate);
		setName(filterByName);
	}, [avail]);

	const [results, setResults] = useState([]);

	// looping through avail store to extract entries matching drop down filters and puts them into new array newResults

	const findRelevantInfo = () => {
		const filteredSearch = [];
        let chosenAge = ''
        if(`${userChoice.age.toLowerCase()}` === 'school age'){
            chosenAge = 'schoolage'
        } else if (`${userChoice.age.toLowerCase()}` === "pre-k") {
            chosenAge = 'pre_k'
		} else {
			chosenAge = `${userChoice.age.toLowerCase()}`;
		}
        console.log('userchoice age', chosenAge);
		for (let entry of avail) {
			let cache = [];
			if (userChoice.date) cache.push(entry.on_date === userChoice.date);
			   if (userChoice.name) cache.push(entry.biz_name === userChoice.name);
			   if (userChoice.city) cache.push(entry.provider_city === userChoice.city);
			   if (chosenAge) cache.push(entry[`${chosenAge}`] > 0);

			   if (cache.every((condition) => condition)) {
				filteredSearch.push(entry);
			}
		}
			return filteredSearch;
	};

	const newResults = findRelevantInfo();


	const resultMessage = () => {
		let filteredMessage = `Openings`;
		let terms = userChoice;
		let age = "";
		let city = "";
		let date = "";
		let care = "";

		if (terms.age === "Toddler" || terms.age === "Infant") {
			age = `for ${terms.age.toLowerCase()}s`;
			filteredMessage = `${filteredMessage} ${age}`;
		} else if (terms.age === "Pre-K" || terms.age === "School age") {
			age = `for ${terms.age.toLowerCase()}`;
			filteredMessage = `${filteredMessage} ${age}`;
		}
		if (terms.city) {
			city = `in ${terms.city}`;
			filteredMessage = `${filteredMessage} ${city}`;
		}
		if (terms.name) {
			care = `at ${terms.name}`;
			filteredMessage = `${filteredMessage} ${care}`;
		}
		if (terms.date) {
			date = `on ${terms.date}`;
			filteredMessage = `${filteredMessage} ${date}`;
		}
		return `${filteredMessage}:`;
	};
	const message = resultMessage();

	console.log(message.replace(`Openings`, ''));




	const filterProviders = (event) => {
		event.preventDefault();
		dispatch({ type: "FETCH_FILTERED_RESULTS", payload: [{filterTerms: message}, {newResults: newResults}] });
		// dispatch({ type: "SET_FILTER" });
	};

	const resetFilter = (event) => {
		// event.preventDefault()
		dispatch({ type: "CLEAR_FILTERED_RESULTS" });
		dispatch({ type: "CLEAR_FILTER" });
		setUserChoice(picked);
	};
	const btn = { my: 1, mx: 1, height: "3.5rem", padding: 1 };
	const drop = { mx: 0.75, width: 159, my:1 };

	return (
		<Box
			component="form"
			onSubmit={filterProviders}
			sx={{
				display: "flex",
				flexDirection: "row",
				mb: 2,
				flexWrap: "wrap",
			}}
		>
			<FormControl sx={drop}>
				<InputLabel id="demo-simple-select-required-label">
					Age
				</InputLabel>
				<Select
					labelId="demo-simple-select-required-label"
					id="demo-simple-select-required"
					value={userChoice.age}
					label="Age *"
					onChange={(e) => {
						setUserChoice({ ...userChoice, age: e.target.value });
					}}
				>
					{age.map((option, i) => {
						return (
							<MenuItem key={i} value={option}>
								{option}
							</MenuItem>
						);
					})}
				</Select>
				{/* <FormHelperText>Filter by city</FormHelperText> */}
			</FormControl>
			<FormControl sx={drop}>
				<InputLabel id="demo-simple-select-required-label">
					City
				</InputLabel>
				<Select
					labelId="demo-simple-select-required-label"
					id="demo-simple-select-required"
					value={userChoice.city}
					label="Age *"
					onChange={(e) => {
						setUserChoice({ ...userChoice, city: e.target.value });
					}}
				>
					{city.map((option, i) => {
						return (
							<MenuItem key={i} value={option}>
								{option}
							</MenuItem>
						);
					})}
				</Select>
				{/* <FormHelperText>Filter by city</FormHelperText> */}
			</FormControl>

			<FormControl sx={drop}>
				<InputLabel id="demo-simple-select-required-label">
					Date
				</InputLabel>
				<Select
					labelId="demo-simple-select-required-label"
					id="demo-simple-select-required"
					value={userChoice.date}
					label="Age *"
					onChange={(e) =>
						setUserChoice({ ...userChoice, date: e.target.value })
					}
				>
					{date.map((option, i) => {
						return (
							<MenuItem key={i} value={option}>
								{option}
							</MenuItem>
						);
					})}
				</Select>
				{/* <FormHelperText>Filter by day</FormHelperText> */}
			</FormControl>

			<FormControl sx={drop}>
				<InputLabel id="demo-simple-select-required-label">
					Provider
				</InputLabel>
				<Select
					labelId="demo-simple-select-required-label"
					id="demo-simple-select-required"
					value={userChoice.name}
					label="Age *"
					onChange={(e) =>
						setUserChoice({ ...userChoice, name: e.target.value })
					}
				>
					{name.map((option, i) => {
						return (
							<MenuItem key={i} value={option}>
								{option}
							</MenuItem>
						);
					})}
				</Select>
				{/* <FormHelperText>Filter by provider</FormHelperText> */}
			</FormControl>
			<Button type="submit" sx={btn} variant="contained" color="secondary">
				Filter
			</Button>
			<Button sx={btn} onClick={resetFilter} variant="contained" color="secondary">
				Reset
			</Button>
		</Box>
		// <div className="container">
		//     <h2>Search Bar</h2>
		//     <p>This will be the search bar to sort the providers!</p>
		// </div>
	);
}

export default ListPageSearchBar;

{
	/* {
										...newAdult,
										first_name: event.target.value,
									} */
}

		//stores each toy that passes the filter function in the array of filtered toys
		// avail.map((obj) => {
		// 	if (!filteredSearch.includes(userChoice.name)){
        //         filteredSearch.push(obj);
        //         console.log("IS THIS THING ON?");
        //     }else if(obj?.provider_city.includes(userChoice.city)){
        //         // filteredSearch.push(obj);

        //     }else if(obj?.on_date.includes(userChoice.date)){
        //         // filteredSearch.push(obj);

        //     }else{
        //         console.log('KICK ROCKS');

        //     }
		// });


        // console.log('IS THIS THING ON?', filteredSearch);
		// for (let entry of avail) {
		// 	if (entry.biz_name === userChoice.name) {
		// 		filteredSearch.push(entry);
		// 	} else if (entry.on_date === userChoice.date) {
		// 		filteredSearch.push(entry);
		// 	} else if (entry.provider_city === userChoice.city) {
		// 		filteredSearch.push(entry);
		// 	} else if (entry[`${chosenAge}`] > 0) {
		// 		filteredSearch.push(entry);
		//     }
		// // console.log("filteredSearch", filteredSearch);
        // }