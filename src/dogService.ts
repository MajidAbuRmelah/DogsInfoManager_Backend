import express, { Express } from "express";
import http from "http";
import morgan from "morgan";
import routes from "./routes/router";

/*** Configure Router Settings ***/
const app: Express = express();

app.use(morgan("dev"));
// Parse the request.
app.use(express.urlencoded({ extended: false }));
// Takes care of JSON data.
app.use(express.json());

// Define API rules.
app.use((req, res, next) => {
  // Set the CORS policy
  res.header("Access-Control-Allow-Origin", "*");
  // Set the CORS headers
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  // Set the CORS method headers
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Set routes
app.use("/", routes);

// Handle errors.
app.use((request, response, next) => {
  const error = new Error("Not Found 404");
  return response.status(404).json({
    message: error.message,
  });
});

/*** Initalize Server ***/
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 8080;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}.`)
);
