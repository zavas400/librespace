const express = require('express');
const path = require('path');




const app = express();

const port = 8888;

app.get('', (req, res) =>{
    //res.sendFile(__dirname +'\\publics\\index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/assets', express.static(path.join(__dirname, 'public')));




app.listen(port, ()=> {
    console.log('APP is running');
})