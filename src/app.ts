import { server } from "./config/server.js";

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} (${new Date().toLocaleTimeString("fr-FR")})`);
});