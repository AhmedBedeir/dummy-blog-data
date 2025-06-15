const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Bind the router DB to the app
server.db = router.db; // ✅ REQUIRED by json-server-auth

// Middlewares
server.use(middlewares);

// CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Auth middleware must come before the router
server.use(auth);
server.use(router);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server with auth is running on port ${PORT}`);
});
