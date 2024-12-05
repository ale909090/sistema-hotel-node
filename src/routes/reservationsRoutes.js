import express from "express";
import reservationsController from "../controllers/reservationsController.js";

const router = express.Router();

// Listar reservas
router.get("/", reservationsController.getReservations);

// Mostrar formulario para crear reserva
router.get("/create", reservationsController.showCreateForm);

// Crear reserva
router.post("/create", reservationsController.createReservation);

// Mostrar formulario para editar reserva
router.get("/edit/:id", reservationsController.showEditForm);

// Actualizar reserva
router.post("/edit/:id", reservationsController.editReservation);

// Eliminar reserva
router.get("/delete/:id", reservationsController.deleteReservation);

export default router;
