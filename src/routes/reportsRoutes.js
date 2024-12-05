import express from "express";
import reportsController from "../controllers/reportsController.js";

const router = express.Router();

router.get("/services", reportsController.getTopServicesReport);

export default router;
