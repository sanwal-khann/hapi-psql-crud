const Hapi = require("@hapi/hapi");
const client = require("./src/db");
const userRoutes = require("./routers/router");
const init = async () => {
  await client.connect();
  await client.query(`
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            age VARCHAR(255) NOT NULL
        )
    `);
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  server.route(userRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
