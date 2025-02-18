import express from "express";
import { serveStatic, setupVite, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  if (app.get("env") === "development") {
    await setupVite(app);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  const server = app.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  }).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      log(`Port ${PORT} is already in use. Please try again after stopping other processes.`);
      process.exit(1);
    } else {
      log(`Error starting server: ${err.message}`);
    }
  });
})();