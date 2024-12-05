import express from "express";
import customersController from "../controllers/customersController.js";

const router = express.Router();

// Listar clientes
router.get("/", customersController.getCustomers);

// Mostrar formulario para crear cliente
router.get("/create", customersController.showCreateForm);

// Crear cliente
router.post("/create", customersController.createCustomer);

// Mostrar formulario para editar cliente
router.get("/edit/:id", customersController.showEditForm);

// Actualizar cliente
router.post("/edit/:id", customersController.editCustomer);

// Eliminar cliente
router.get("/delete/:id", customersController.deleteCustomer);

export default router;
