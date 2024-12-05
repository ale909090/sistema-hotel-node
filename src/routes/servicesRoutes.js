import express from "express";
import servicesController from "../controllers/servicesController.js";

const router = express.Router();

// Listar servicios
router.get("/", servicesController.getServices);

// Mostrar formulario para crear servicio
router.get("/create", servicesController.showCreateForm);

// Crear servicio
router.post("/create", servicesController.createService);

// Mostrar formulario para editar servicio
router.get("/edit/:id", servicesController.showEditForm);

// Actualizar servicio
router.post("/edit/:id", servicesController.editService);

// Eliminar servicio
router.get("/delete/:id", servicesController.deleteService);

export default router;
