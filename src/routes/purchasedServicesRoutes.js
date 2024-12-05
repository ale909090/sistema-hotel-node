import express from "express";
import purchasedServicesController from "../controllers/purchasedServicesController.js";

const router = express.Router();

// Listar servicios comprados
router.get("/", purchasedServicesController.getPurchasedServices);

// Mostrar formulario para agregar servicio comprado
router.get("/create", purchasedServicesController.showPurchaseForm);

// Agregar servicio comprado
router.post("/create", purchasedServicesController.addPurchasedService);

// Eliminar servicio comprado
router.get("/delete/:id", purchasedServicesController.deletePurchasedService);

export default router;
