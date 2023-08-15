<div className="container">
	<div className="provider-header">
		<div className="provider-business-name">
			<h1>{provider.business_name}</h1>
		</div>
		<div className="provider-name"></div>
	</div>

	<div className="provider-profile-photo">
		<img src={provider.provider_pic} height="200" />
	</div>

	<div className="provider-contact-info">
		<p>
			<b>Provider Name:</b> {provider.first_name} {provider.last_name}
		</p>
		<p>
			<b>License:</b> {provider.license}{" "}
		</p>
		<p>
			<b>Address:</b> {provider.street_address} {provider.unit}{" "}
			{provider.city} {provider.state}
			{provider.zip}
		</p>
		<p>
			<b>Email:</b> {provider.email}
		</p>
	</div>

	<div className="provider-bio">
		<h2>About Me:</h2>
		<p>{provider.personal_description}</p>
	</div>

	<div className="daycare-details">
		<h2>About {provider.business_name}:</h2>
		<p>
			<b>Hours:</b> {provider.hours_open}
			{" AM - "}
			{provider.hours_close}
			{"PM"}
		</p>
		<p>
			<b>Meals provided? </b>
			{provider.meals ? "Yes" : "No"}{" "}
		</p>
		<p>{provider.business_description}</p>
	</div>

	<div className="booking-button">
		<button onClick={goToBooking}>Book a spot!</button>
	</div>

	<ProviderAvailabilityTable provider_id={provider_id} />

	<ProviderPhotoGallery />

	{/* <ProviderBookingsTable /> */}

	<LogOutButton className="btn" />
</div>;
