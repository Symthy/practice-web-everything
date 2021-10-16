const express = require('express');
const multipart = require('connect-multiparty');
const app = express();

app.use(multipart());

app.post('/test', (req, res) => {
    console.log('/test');
    console.log(req.body);
    const obj = {
        message: 'Hello from CORS Authorized Server'
    };
    // CORS 許可
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(obj);
});

app.listen(3002, () => console.log('Sub Server2: Listeninig on port 3002...'));
