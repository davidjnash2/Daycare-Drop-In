const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


router.get("/", (req, res) => {
  // console.log('in db providers GET');
  if (req.isAuthenticated()) {
    const queryText = `SELECT providers.*,
    TO_CHAR(TO_TIMESTAMP(providers.hours_open, 'HH24:MI'), 'FMHH12:MI AM') AS provider_open,
  TO_CHAR(TO_TIMESTAMP(providers.hours_close, 'HH24:MI'), 'FMHH12:MI AM') AS provider_close,
	"user".first_name AS prov_first_name,
	"user".last_name AS prov_last_name,
	"user".email AS prov_email,
	"user".phone_number AS prov_number,
	"user".photo_url AS prov_pic
FROM providers
	JOIN "user" ON providers.user_id = "user".id;`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("ERROR IN providers GET", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    pool
      .query()
      .then(() => {
        res.sendStatus(202);
      })
      .catch((error) => {
        console.log("ERROR IN providers POST", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// detail view GET route if the provider is not the user
router.get("/details/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const providerId = req.params.id;
    const queryText = `SELECT providers.*,
    TO_CHAR(TO_TIMESTAMP(providers.hours_open, 'HH24:MI'), 'FMHH12:MI AM') AS hours_start,
  TO_CHAR(TO_TIMESTAMP(providers.hours_close, 'HH24:MI'), 'FMHH12:MI AM') AS hours_end,
	"user".first_name,
	"user".last_name,
	"user".email,
	"user".phone_number,
	"user".photo_url AS provider_pic
FROM providers
	JOIN "user" ON providers.user_id = "user".id
WHERE providers.id = $1;`;
    pool
      .query(queryText, [providerId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("ERROR IN providers details GET", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//detail view get route if the provider IS the user
router.get("/user/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.params.id;
    console.log(
      "Inside server side of get request for provider details for user-provider of ID:",
      userId
    );
    const queryText = `SELECT providers.*,
    TO_CHAR(TO_TIMESTAMP(providers.hours_open, 'HH24:MI'), 'FMHH12:MI AM') AS hours_start,
  TO_CHAR(TO_TIMESTAMP(providers.hours_close, 'HH24:MI'), 'FMHH12:MI AM') AS hours_end,
	"user".first_name,
	"user".last_name,
	"user".email,
	"user".phone_number,
	"user".photo_url AS provider_pic
FROM providers
	JOIN "user" ON providers.user_id = "user".id
WHERE "user".id = $1;`;
    pool
      .query(queryText, [userId])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("ERROR IN provider-user details GET", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// DELETE template
router.delete("/delete/:id", (req, res) => {
  console.log("IN providers DELETE ROUTE, and req.params is:", req.params.id);
  if (req.isAuthenticated()) {
    const providerId = req.params.id;
    const queryText = `
    DELETE FROM providers
    WHERE id = $1;`;
    pool
      .query(queryText, [providerId])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("ERROR IN providers DELETE", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// PUT template
router.put("/update/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const providerId = req.params.id;
    const {
      // !!! ADD OBJECT PROPERTIES HERE WHEN READY AND CHANGE THEM OUT FOR THE BLINGS ON LINE 118 !!!
    } = req.body;
    const queryText = `UPDATE providers
SET license = $1,
	business_name = $2,
	street_address = $3,
	unit = $4,
	city = $5,
	state = $6,
	zip = $7,
	hours_open = $8,
	hours_close = $9,
	rates = $10,
	meals = $11,
	business_description = $12,
	personal_description = $13,
	contract_language = $14
WHERE id = $15;`;
    pool
      .query(queryText, [$1 - $14, providerId])
      .then(() => {
        res.sendStatus(202);
      })
      .catch((error) => {
        console.log("ERROR IN providers PUT", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
