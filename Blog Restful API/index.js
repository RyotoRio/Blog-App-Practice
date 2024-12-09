const http = require('http');
const app = require('./app');
const {port} = require('./config/keys');


//create server
const server = http.createServer(app);

//listen server
app.listen(port, () => console.log(`Server is runnning on port ${port}`));
