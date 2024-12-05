import roomsModel from "../models/roomsModel.js";

// Obtener todas las habitaciones
const getRooms = async (req, res) => {
    try {
        // Obtener todas las habitaciones desde el modelo
        const rooms = await roomsModel.getAllRooms();
        
        // Renderizar la vista "rooms/index" y pasar los datos
        res.render("rooms/index", { rooms });
    } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
        res.status(500).send("Error al obtener las habitaciones");
    }
};

// Mostrar formulario para agregar una nueva habitación
const showCreateForm = (req, res) => {
    res.render("rooms/form", { room: null }); // Renderiza un formulario vacío
};

// Crear una nueva habitación
const createRoom = async (req, res) => {
    try {
        await roomsModel.addRoom(req.body);
        res.redirect("/rooms"); // Redirige a la lista de habitaciones
    } catch (error) {
        console.error("Error al agregar la habitación:", error);
        res.status(500).send("Error al agregar la habitación");
    }
};

// Mostrar formulario para editar una habitación existente
const showEditForm = async (req, res) => {
    try {
        const room = await roomsModel.getRoomById(req.params.id);
        if (!room) {
            return res.status(404).send("Habitación no encontrada");
        }
        res.render("rooms/form", { room }); // Renderiza el formulario con los datos de la habitación
    } catch (error) {
        console.error("Error al cargar la habitación para edición:", error);
        res.status(500).send("Error al cargar la habitación");
    }
};

// Editar una habitación existente
const editRoom = async (req, res) => {
    try {
        await roomsModel.updateRoom(req.params.id, req.body);
        res.redirect("/rooms"); // Redirige a la lista de habitaciones
    } catch (error) {
        console.error("Error al actualizar la habitación:", error);
        res.status(500).send("Error al actualizar la habitación");
    }
};

// Eliminar una habitación
const deleteRoom = async (req, res) => {
    try {
        await roomsModel.deleteRoom(req.params.id);
        res.redirect("/rooms"); // Redirige a la lista de habitaciones
    } catch (error) {
        console.error("Error al eliminar la habitación:", error);
        res.status(500).send("Error al eliminar la habitación");
    }
};

export default {
    getRooms,
    showCreateForm,
    createRoom,
    showEditForm,
    editRoom,
    deleteRoom,
};
