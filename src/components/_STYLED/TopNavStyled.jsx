<div className="nav">
	<img src={logo} alt="" style={{ maxHeight: "35px", marginLeft: "15px" }} />
	<Link to="/home">
		<h2 className="nav-title">Daycare Drop-in</h2>
	</Link>
	<div>
		{/* If no user is logged in, show these links */}
		{!user.id && (
			// If there's no user, show login/registration links
			<Link className="navLink" to="/login">
				Login / Register
			</Link>
		)}

		{/* If a user is logged in, show these links */}
		{user.id && (
			<>
				<Link className="navLink" to="/user">
					Home
				</Link>

				{/* <Link className="navLink" to="/info">
								Info Page
							</Link> */}

				{
					// only display if admin
					user.user_type === "admin" && (
						<Link className="navLink" to="/admin">
							Admin
						</Link>
					)
				}

				{/* <LogOutButton className="navLink" /> */}
			</>
		)}
	</div>
</div>;
