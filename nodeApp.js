const express = require('express')
const app = express()
var  cors = require( 'cors' );
const port = 8888;
const axios = require('axios');
const { Octokit } = require("@octokit/rest");
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


const clientID = 'Iv1.94a72acba60a8147';
const clientSecret = '4476e0059dcdc514675c658bf7ba16703ef25734';

app.use(cors());


app.get('/getAtoken/:code', async function (req, res) {
    var params = req.params;
    console.log("===params.code====",params.code)
    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${clientID}&` +
            `client_secret=${clientSecret}&` +
            `code=${params.code}`,
        headers: {
            accept: 'application/json'
        }
    }).then((dataResult)=>{
        res.send(dataResult.data.access_token);
    }).catch((error)=>{
        res.send(error);
    })
});

app.get('/getInfo/:accessToken', async function (req, res) {
    var params = req.params;

    const result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            accept: 'application/json',
            Authorization: `token ${params.accessToken}`
        }
    });
    console.log(result.data);

    res.send(result.data);
});


app.listen(port, () => {
    console.log(`Example app listening on http://127.0.0.1:8888`)
    })


