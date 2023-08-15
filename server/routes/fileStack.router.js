const express = require("express");
const router = express.Router();
const FormData = require("form-data");
const axios = require("axios");

router.post("/", async (req, res) => {

    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send("No files were uploaded.");
    // }

    // const uploadedFile = req.files?.image;
    // console.log("outthewazoo",uploadedFile)\
    // console.log("This is reqqqqqq =>>>>>>>>>>>>>>", req.files.data)
    console.log('another one, req.file', req.files);
    // console.log('another one, req.file', req.files.data.config.data);

    const client = await pool.connect()
    firstQuery = `INSERT into children SET photo_url = $1
    
    `
try {
    await client.query("BEGIN")
    const result = await
    axios({
        method: "POST",
        url: `https://www.filestackapi.com/api/store/S3?key=AS8BHuUEcS1qQWGt7HToYz`,
        data: req.files.image.data,
        headers: {
            "Content-Type": "image/*"
        }

    }) 
    client.query(result )
} catch (error) {

} finally {
    
    (result => {
        console.log("This is fileStack response =>...>>>>>>>>>>>>>>>>>>>>>>>>", result);
        axios.post(result  )
    }).catch(error => {
        console.log("Error in POST /filestack", error)
    })
}
})




module.exports = router;