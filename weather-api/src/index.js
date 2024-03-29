const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { join } = require('path');
const axios = require('axios');
const cors = require('cors');

const { urls: weatherStations } = require('./weather-stations.js');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET"]
    }
});

app.use(cors());
app.get('/', (req, res) => {
    // res.sendFile(join(__dirname, 'index.html'));
    res.send('Hello snorre');
});

const data = {};

async function fetchData() {
    for (const [name, url] of Object.entries(weatherStations)) {
        try {
            const response = await axios.get(url);
            const newData = response.data;

            if (!data[name]) {
                // If there's no existing data, emit everything
                data[name] = newData;
                io.sockets.emit('file-content', { [name]: newData });
            } else {
                // Compare properties and emit only the changed values
                const changedValues = {};

                for (const key in newData) {
                    if (newData[key] !== data[name][key]) {
                        changedValues[key] = newData[key];
                    }
                }

                if (Object.keys(changedValues).length > 0) {
                    data[name] = newData;
                    io.sockets.emit('file-content', { [name]: changedValues });
                }
            }
        } catch (error) {
            console.error(`Error fetching data for ${name}: ${error.message}`);
        }
    }
}

fetchData();

io.on('connection', (socket) => {
    socket.emit('file-content', data);
});

// Periodically update the file content and broadcast changes to connected clients
setInterval(() => {
    fetchData();
}, 1000); // Update every 5 seconds

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

app.use('/confirm', function (req, res, next) {
    console.log(req);
    next();
});