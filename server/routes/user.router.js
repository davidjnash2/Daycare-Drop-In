const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

const multer = require("multer");
const {s3Upload} = require('../s3Service')

let awsCache = ''
const familyProfile = 'https://i.postimg.cc/3J3cc6cN/home-5456376-1280.png'

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	if (file.mimetype.split("/")[0] === "image") {
		cb(null, true);
	} else {
		cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
	}
};

const upload = multer({ storage, fileFilter });

router.put("/aws", upload.single("file"), async (req, res) => {
	console.log("req.file", req.file);
	try {
		const results = await s3Upload(req.file);
		console.log("AWS S3 upload success");
		console.log("Location", results.Location);
		awsCache = results.Location;
		console.log('THIS IS AWSCACHE',awsCache);
	} catch (err) {
		res.sendStatus(500);
		console.log("AWS S3 upload fail", err);
	}
})

// Handles Axios request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// ---------------------------_DEFAULT PROVIDED REGISTRATION LOGIC_---------------------------
// // Handles POST request with new user data
// // The only thing different from this and every other post we've seen
// // is that the password gets encrypted before being inserted
// router.post('/register', (req, res, next) => {
//   const username = req.body.username;
//   const password = encryptLib.encryptPassword(req.body.password);

//   const queryText = `INSERT INTO "user" (username, password)
//     VALUES ($1, $2) RETURNING id`;
//   pool
//     .query(queryText, [username, password])
//     .then(() => res.sendStatus(201))
//     .catch((err) => {
//       console.log('User registration failed: ', err);
//       res.sendStatus(500);
//     });
// });

//-------------------------------_ FAMILY USER REGISTRATION _-------------------------------------------
router.post("/register/family", async (req, res, next) => {
  const {
    family_name,
    first_name,
    last_name,
    address,
    unit,
    city,
    state,
    zip,
    photo_url,
    phone_number,
    accessCode
  } = req.body;
  const family = "family";

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const firstQuery = `
  INSERT INTO families ("family_name", "street_address", "unit", "city", "state", "zip", "photo_url", "access_code")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING id;`;

  const secondQuery = `
  INSERT INTO "user" (username,
  password,
  user_type,
  family_id,
  first_name,
  last_name,
  email,
  phone_number,
  photo_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id;
  `;

  const thirdQuery = `INSERT INTO "responsible_adults" (family_id,
	first_name,
	last_name,
	phone_number,
	email,
	relationship_to_child,
	photo_url)
	VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const firstStep = await client.query(firstQuery, [
		family_name,
		address,
		unit,
		city,
		state,
		zip,
		familyProfile,
		accessCode
	]);
    console.log("FIRST STEP COMPLETE HERES THE ID", firstStep.rows[0].id);
    const familyId = firstStep.rows[0].id;
    const secondStep = await client.query(secondQuery, [
      username,
      password,
      family,
      familyId,
      first_name,
      last_name,
      username,
      phone_number,
      awsCache
    ]);
    // AWS CACHE IS THE RETURNED URL FROM THE S3 BUCKET
    console.log(secondStep);
    const thirdStep = await client.query(thirdQuery, [
      familyId,
      first_name,
      last_name,
      phone_number,
      username,
      "parent",
      awsCache,
    ]);
    console.log(thirdStep);
    await client.query("COMMIT");
    awsCache=''
    res.sendStatus(201);
  } catch (error) {
    awsCache = ''
    await client.query("ROLLBACK");
    console.log("Family registration error", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.get(`/join/family`, (req, res) => {
  sqlText = `SELECT families.access_code, "user".family_id FROM families
	JOIN "user" ON families.id = "user".family_id
	`;
  pool
    .query(sqlText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// ----------------------------_ NEW FAMILY USER REGISTRATION _------------------------------------
router.post("/register/new_family_user", async (req, res, next) => {
  const {
    first_name,
    last_name,
    relationship,
    phone_number,
    accessCode,
    family_id,
  } = req.body;
  const family = "family";

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const firstQuery = `
	INSERT INTO "user" (username, password, user_type, family_id, first_name, last_name, email, phone_number, photo_url)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`;
  const secondQuery = `INSERT INTO "responsible_adults" (
    family_id,
	  first_name,
	  last_name,
	  phone_number,
	  email,
	  relationship_to_child,
	  photo_url)
	  VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

     await client.query(firstQuery, [
			username,
			password,
			family,
			family_id,
			first_name,
			last_name,
			username,
			phone_number,
			awsCache,
		]);

    await client.query(secondQuery, [
        family_id,
        first_name,
        last_name,
        phone_number,
        username,
        relationship,
        awsCache
      ]);

    await client.query("COMMIT");
		awsCache = "";
		res.sendStatus(201);
    } catch (error) {
    awsCache = ''
    await client.query("ROLLBACK");
    console.log("Family registration error", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// -----------------------------_ PROVIDER REGISTRATION _-----------------------------------
router.post("/register/provider", async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    photo_url,
    license,
    business_name,
    street_address,
    unit,
    city,
    state,
    zip,
    hours_open,
    hours_close,
    rates,
    meals,
    business_description,
    personal_description,
    contract_language,
  } = req.body;
  const provider = "provider";

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const firstQuery = `
  INSERT INTO "user" (username,
  password,
  user_type,
  family_id,
  first_name,
  last_name,
  email,
  phone_number,
  photo_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id;`;

  const secondQuery = `
  INSERT INTO providers (
		"user_id",
		"license",
		"business_name",
		"street_address",
		"unit",
		"city",
		"state",
		"zip",
		"hours_open",
		"hours_close",
		"rates",
		"meals",
		"business_description",
		"personal_description",
		"contract_language"
	)

VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
RETURNING user_id;
  `;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const firstStep = await client.query(firstQuery, [
		username,
		password,
		provider,
		null,
		first_name,
		last_name,
		username,
		phone_number,
		awsCache
	]);
    const providerUserId = firstStep.rows[0].id;
    const secondStep = await client.query(secondQuery, [
      providerUserId,
      license,
      business_name,
      street_address,
      unit,
      city,
      state,
      zip,
      hours_open,
      hours_close,
      rates,
      meals,
      business_description,
      personal_description,
      contract_language,
    ]);
    console.log(secondStep);
    await client.query("COMMIT");
    awsCache = ''
    res.sendStatus(201);
  } catch (error) {
    awsCache = ''
    await client.query("ROLLBACK");
    console.log("Provider registration error", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
