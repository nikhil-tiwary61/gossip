//Node server for handelling socket io connections
const io = require("socket.io")(3001);

const users = {};
