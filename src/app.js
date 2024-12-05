import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";

import roomsRoutes from "./routes/roomsRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
import reservationsRoutes from "./routes/reservationsRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import purchasedServicesRoutes from "./routes/purchasedServicesRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";





const app = express();

// Resuelve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de EJS y Layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));


// Rutas
app.use("/rooms", roomsRoutes);
app.use("/customers", customersRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/services", servicesRoutes);
app.use("/purchased_services", purchasedServicesRoutes);
app.use("/reports", reportsRoutes);


export default app;
