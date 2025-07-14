import express from "express";
import ViteExpress from "vite-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const manifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../dist/.vite/manifest.json"),
    "utf-8"
  )
);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
  const jspath = "src/client/hello/hello.js";
  res.render("hello", {
    title: "Hello Page",
    jspath: isProd ? manifest[jspath].file : jspath,
    csspath: isProd ? manifest[jspath].css : [],
  });
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
