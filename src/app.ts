import { server } from "./config/server.js";
const PORT = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT} (${new Date().toLocaleTimeString("fr-FR")})`);
});