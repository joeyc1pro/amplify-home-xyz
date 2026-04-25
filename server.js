const http = require("node:http");
const express = require("express");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();
const bare = createBareServer("/bare/");
const server = http.createServer();

app.use(express.static("."));

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) return bare.routeRequest(req, res);
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) return bare.routeUpgrade(req, socket, head);
  socket.end();
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Bare endpoint: http://localhost:${PORT}/bare/`);
});
