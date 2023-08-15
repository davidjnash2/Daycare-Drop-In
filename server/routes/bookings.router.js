const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
	// GET route code here
	if (req.isAuthenticated()) {
		const queryText = `SELECT bookings.id AS booking_id,
	bookings.service_date AS booked_day,
	bookings.time_submitted AS time_booked,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provide_close,
	providers.meals AS provider_meal,
	children.id AS child_id,
	children.family_id AS child_fam_id,
	children.first_name AS child_first_name,
	children.last_name AS child_last_name,
	children.birthdate AS child_age,
	children.allergies AS child_allergies,
	children.potty_trained AS child_potty,
	children.photo_url AS child_pic,
	responsible_adults.id AS adult_id,
	responsible_adults.first_name AS adult_first_name,
	responsible_adults.last_name AS adult_last_name,
	responsible_adults.phone_number AS adult_number,
	responsible_adults.email AS adult_email,
	responsible_adults.relationship_to_child AS adult_relationship,
	responsible_adults.photo_url AS adult_pic,
	responsible_adults.family_id AS adult_fam_id,
	"user"."first_name" AS parent_first_name,
	"user"."last_name" AS parent_last_name,
	"user"."email" AS parent_email,
	"user"."phone_number" AS parent_number,
	"user"."photo_url" AS parent_pic,
	"user"."family_id" AS parent_fam_id,
	families.family_name AS fam_account_name,
	families.street_address AS fam_street_address,
	families.unit AS fam_unit,
	families.city AS fam_city,
	families.state AS fam_state,
	families.zip AS fam_zip,
	families.photo_url AS fam_pic
FROM bookings
	JOIN providers ON bookings.provider_id = providers.id
	JOIN children ON bookings.child_id = children.id
	JOIN responsible_adults ON bookings.responsible_adult_id = responsible_adults.id
	JOIN "user" ON bookings.user_id = "user".id
	JOIN families ON bookings.famiily_id = families.id
ORDER BY bookings.service_date ASC;`;
		pool.query(queryText)
			.then(() => {
				res.send(result.rows);
			})
			.catch((error) => {
				console.log("ERROR IN bookings GET", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

router.post("/", (req, res) => {
	if (req.isAuthenticated()) {
		console.log("POST for new booking and req.body is:", req.body);
		const newBooking = [
			req.body.provider_id,
			req.body.family_id,
			req.body.child_id,
			req.body.responsible_adult_id,
			req.body.user_id,
			req.body.service_date,
		];
		console.log("in booking POST and newBooking is:", newBooking);
		const postBookingQueryText = `INSERT INTO bookings (
			provider_id,
			family_id,
			child_id,
			responsible_adult_id,
			user_id,
			service_date)
			VALUES ($1, $2, $3, $4, $5, $6);`;
		pool.query(postBookingQueryText, newBooking)
			.then((response) => {
				res.sendStatus(201);
			})
			.catch((error) => {
				console.log("ERROR IN SERVER POST", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(400);
	}
});

// GET for family bookings table
router.get("/details/:id", (req, res) => {
	if (req.isAuthenticated()) {
		const familyId = req.params.id;
		console.log("FAMILY ID IS:",familyId);
		const queryText = `SELECT bookings.id AS booking_id,
	to_char(bookings.service_date, 'Mon DD, YYYY') AS booked_day,
	bookings.time_submitted AS time_booked,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provide_close,
	providers.meals AS provider_meal,
	children.id AS child_id,
	children.family_id AS child_fam_id,
	children.first_name AS child_first_name,
	children.last_name AS child_last_name,
	children.birthdate AS child_age,
	children.allergies AS child_allergies,
	children.potty_trained AS child_potty,
	children.photo_url AS child_pic,
	responsible_adults.id AS adult_id,
	responsible_adults.first_name AS adult_first_name,
	responsible_adults.last_name AS adult_last_name,
	responsible_adults.phone_number AS adult_number,
	responsible_adults.email AS adult_email,
	responsible_adults.relationship_to_child AS adult_relationship,
	responsible_adults.photo_url AS adult_pic,
	responsible_adults.family_id AS adult_fam_id,
	"user"."first_name" AS parent_first_name,
	"user"."last_name" AS parent_last_name,
	"user"."email" AS parent_email,
	"user"."phone_number" AS parent_number,
	"user"."photo_url" AS parent_pic,
	"user"."family_id" AS parent_fam_id,
	families.family_name AS fam_account_name,
	families.street_address AS fam_street_address,
	families.unit AS fam_unit,
	families.city AS fam_city,
	families.state AS fam_state,
	families.zip AS fam_zip,
	families.photo_url AS fam_pic
FROM bookings
	JOIN providers ON bookings.provider_id = providers.id
	JOIN children ON bookings.child_id = children.id
	JOIN responsible_adults ON bookings.responsible_adult_id = responsible_adults.id
	JOIN "user" ON bookings.user_id = "user".id
	JOIN families ON bookings.family_id = families.id
WHERE families.id = $1
ORDER BY bookings.service_date ASC;`;
		pool.query(queryText, [familyId])
			.then((result) => {
				res.send(result.rows);
			})
			.catch((error) => {
				console.log("ERROR IN bookings details GET", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

// GET for provider bookings table
router.get("/provider/:id", (req, res) => {
	if (req.isAuthenticated()) {
		const providerId = req.params.id;
		console.log(
			"Inside router side of bookings request for provider of id:",
			providerId
		);
		const queryText = `SELECT bookings.id AS booking_id,
		to_char(bookings.service_date, 'Mon DD')AS booked_day,
	bookings.time_submitted AS time_booked,
	providers.id AS provider_id,
	providers.business_name AS biz_name,
	providers.street_address AS provider_street,
	providers.unit AS provider_unit,
	providers.city AS provider_city,
	providers.state AS provider_state,
	providers.zip AS provider_zip,
	providers.hours_open AS provider_open,
	providers.hours_close AS provide_close,
	providers.meals AS provider_meal,
	children.id AS child_id,
	children.family_id AS child_fam_id,
	children.first_name AS child_first_name,
	children.last_name AS child_last_name,
	children.birthdate AS child_age,
	children.allergies AS child_allergies,
	children.potty_trained AS child_potty,
	children.photo_url AS child_pic,
	responsible_adults.id AS adult_id,
	responsible_adults.first_name AS adult_first_name,
	responsible_adults.last_name AS adult_last_name,
	responsible_adults.phone_number AS adult_number,
	responsible_adults.email AS adult_email,
	responsible_adults.relationship_to_child AS adult_relationship,
	responsible_adults.photo_url AS adult_pic,
	responsible_adults.family_id AS adult_fam_id,
	"user"."first_name" AS parent_first_name,
	"user"."last_name" AS parent_last_name,
	"user"."email" AS parent_email,
	"user"."phone_number" AS parent_number,
	"user"."photo_url" AS parent_pic,
	"user"."family_id" AS parent_fam_id,
	families.family_name AS fam_account_name,
	families.street_address AS fam_street_address,
	families.unit AS fam_unit,
	families.city AS fam_city,
	families.state AS fam_state,
	families.zip AS fam_zip,
	families.photo_url AS fam_pic
FROM bookings
	JOIN providers ON bookings.provider_id = providers.id
	JOIN children ON bookings.child_id = children.id
	JOIN responsible_adults ON bookings.responsible_adult_id = responsible_adults.id
	JOIN "user" ON bookings.user_id = "user".id
	JOIN families ON bookings.family_id = families.id
WHERE providers.id = $1
ORDER BY bookings.service_date ASC;`;
		pool.query(queryText, [providerId])
			.then((result) => {
				res.send(result.rows);
			})
			.catch((error) => {
				console.log("ERROR IN bookings details GET", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

// DELETE template
router.delete("/delete/:id", (req, res) => {
	console.log("IN bookings DELETE ROUTE, and req.params is:", req.params.id);
	if (req.isAuthenticated()) {
		const bookingId = req.params.id;
		const queryText = `DELETE FROM bookings
WHERE id = $1;`;
		pool.query(queryText, [bookingId])
			.then(() => {
				res.sendStatus(200);
			})
			.catch((error) => {
				console.log("ERROR IN bookings DELETE", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

//GET for family data needed in bookings process
router.get("/booking_process/family/:id", (req, res) => {
	if (req.isAuthenticated()) {
		const userId = req.params.id;
		console.log(
			"Inside router side of get request for FAMILY booking process data, id:",
			req.params.id
		);
		const queryText = `SELECT
    "user".id AS user_id,
    "user".first_name AS user_first_name,
    "user".last_name AS user_last_name,
    "user".family_id,
	ARRAY_AGG(ROW(children.id, children.first_name, children.last_name)) AS children,
    responsible_adults.id,
    responsible_adults.first_name,
    responsible_adults.last_name
FROM "user"
JOIN families ON "user".family_id = families.id
JOIN children ON children.family_id = families.id
JOIN responsible_adults ON responsible_adults.family_id = families.id
WHERE "user".id = $1
GROUP BY "user".id, "user".first_name, "user".last_name, "user".family_id;
`;
		pool.query(queryText, [userId])
			.then((result) => {
				res.send(result.rows);
				console.log(
					"in family booking process GET and result.rows are:",
					result.rows
				);
			})
			.catch((error) => {
				console.log("ERROR IN family bookings details GET", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

//GET for provider data needed in bookings process
router.get("/booking_process/provider/:id", (req, res) => {
	if (req.isAuthenticated()) {
		const providerId = req.params.id;
		console.log(
			"Inside router side of get request for PROVIDER booking process data, id:",
			req.params.id
		);
		const queryText = `SELECT providers.business_name,
	providers.contract_language
	FROM providers
	WHERE providers.id = $1;`;
		pool.query(queryText, [providerId])
			.then((result) => {
				res.send(result.rows);
				console.log(
					"in provider booking process GET and result.rows are:",
					result.rows
				);
			})
			.catch((error) => {
				console.log("ERROR IN provider bookings details GET", error);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

// // PUT template
// router.put("/update/:id", (req, res) => {
//   if (req.isAuthenticated()) {
//     pool
//       .query()
//       .then(() => {
//         res.sendStatus(202);
//       })
//       .catch((error) => {
//         console.log("ERROR IN bookings PUT", error);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });

module.exports = router;
