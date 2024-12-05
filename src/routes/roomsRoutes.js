import express from "express";
import roomsController from "../controllers/roomsController.js";

const router = express.Router();

// Listar todas las habitaciones
router.get("/", roomsController.getRooms);

// Mostrar formulario para crear una habitación
router.get("/create", roomsController.showCreateForm);

// Crear una nueva habitación
router.post("/create", roomsController.createRoom);

// Mostrar formulario para editar una habitación
router.get("/edit/:id", roomsController.showEditForm);

// Editar una habitación existente
router.post("/edit/:id", roomsController.editRoom);

// Eliminar una habitación
router.get("/delete/:id", roomsController.deleteRoom);

export default router;
