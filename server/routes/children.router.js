const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const multer = require("multer");
const { s3Upload } = require("../s3Service");

let awsCache = "";
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
		console.log(awsCache);
	} catch (err) {
		res.sendStatus(500);
		console.log("AWS S3 upload fail", err);
	}
});

/**
 * GET route template
 */
router.get('/:id', (req, res) => {
  // GET route code here
  if (req.isAuthenticated()) {
    pool.query()
      .then(() => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('ERROR IN children GET', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403)
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  if (req.isAuthenticated()) {
    const {
		// !!! ADD OBJECT PROPERTIES HERE WHEN THEY ARE READY AND ADD THEM TO THE ARRAY ON LINE 43 !!!
    family_id,
    first_name,
    last_name,
    birthdate,
    allergies,
    potty_trained,
    photo_url
	} = req.body;
    const queryText = `INSERT INTO children (
		family_id,
		first_name,
		last_name,
		birthdate,
		allergies,
		potty_trained,
		photo_url
	)
VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [
    family_id,
    first_name,
    last_name,
    birthdate,
    allergies,
    potty_trained,
    awsCache
    ])
      .then(() => {
        awsCache=''
        res.sendStatus(201);
      })
      .catch((error) => {
        awsCache = ''
        console.log('ERROR IN children POST', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403)
  }
});

// detail view GET route template
router.get('/details/:id', (req, res) => {
  // console.log("children details GET for req.params.id", req.params.id)
  if (req.isAuthenticated()) {
    const famId = req.params.id
    const queryText = `
    SELECT *
    FROM children
    WHERE family_id = $1;`;
    pool.query(queryText, [famId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR IN children details GET', error);
      res.sendStatus(500);
    });
} else {
  res.sendStatus(403)
}
});


// DELETE template
router.delete('/delete/:id', (req, res) => {
  console.log('IN children DELETE ROUTE, and req.params is:', req.params.id);
  if (req.isAuthenticated()) {
    const childId = req.params.id
    const queryText = `DELETE FROM children
    WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('ERROR IN children DELETE', error);
      res.sendStatus(500);
    });
} else {
  res.sendStatus(403)
}
});

// PUT template
router.put('/update/:id', (req, res) => {
  console.log('ARRIVED AT UPDATE');
  if (req.isAuthenticated()) {
    const childId = req.params.id
    console.log('this is params id', req.params.id);
      // !!! ADD OBJECT PROPERTIES HERE WHEN THEY ARE READY AND CHANGE THE BLINGS OUT ON LINE 93 !!!!
      const {
        // !!! ADD OBJECT PROPERTIES HERE WHEN THEY ARE READY AND ADD THEM TO THE ARRAY ON LINE 43 !!!
        first_name,
        last_name,
        allergies,
        potty_trained,


    } = req.body
    console.log('this is reqbody', req.body);
    const queryText = `
    UPDATE children SET first_name = $1, last_name = $2,  allergies = $3, potty_trained = $4
    WHERE id = $5;
    `;
      pool.query(queryText, [first_name, last_name, allergies, potty_trained, childId])
			.then((result) => {
        console.log('WE OUT HERE!');
				res.sendStatus(202);
			})
			.catch((error) => {
				console.log("ERROR IN children PUT", error);
				res.sendStatus(500);
			});
  } else {
    res.sendStatus(403)
  }
  });


module.exports = router;
