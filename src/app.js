const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Setup paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setip static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
   res.render("index", {
      title: "Weather",
      name: "Mu9tafa",
   });
});

app.get("/about", (req, res) => {
   res.render("about", {
      title: "About",
      name: "Mu9tafa",
   });
});

app.get("/help", (req, res) => {
   res.render("help", {
      title: "Help",
      name: "Mu9tafa",
      helpText: "This is some helpfull text",
   });
});

app.get("/help/*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Mu9tafa",
      error: "Help article not found",
   });
});

app.get("/products", (req, res) => {
   console.log(req.query);
   res.send({
      products: [],
   });
});

app.get("/weather", (req, res) => {
   if (!req.query.address) {
      return res.send({
         error: "Please provide an address",
      });
   }

   geocode(req.query.address, (error, { long, lat, location } = {}) => {
      if (error) {
         return res.send({ error });
      }
      forecast(lat, long, (error, forecast) => {
         if (error) {
            return res.send({ error });
         }

         res.send({ forecast, location, address: req.query.address });
      });
   });
});

app.get("*", (req, res) => {
   res.render("404", {
      error: "Page not found",
      title: "404",
      name: "Mu9tafa",
   });
});

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
