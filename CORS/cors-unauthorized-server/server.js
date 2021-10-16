const express = require('express');
const multipart = require('connect-multiparty');
const app = express();

app.use(multipart());

app.post('/test', (req, res) => {
    console.log('/test');
    console.log(req.body);
    const obj = {
        message: 'Hello from CORS Unauthorized Server'
    };
    // CORS 無許可
    res.status(200).json(obj);
});

app.listen(3001, () => console.log('Sub Server1: Listeninig on port 3001...'));
