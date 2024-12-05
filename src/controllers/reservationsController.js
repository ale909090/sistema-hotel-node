import reservationsModel from "../models/reservationsModel.js";
import customersModel from "../models/customersModel.js";
import roomsModel from "../models/roomsModel.js";

// Obtener todas las reservas
const getReservations = async (req, res) => {
    try {
        const reservations = await reservationsModel.getAllReservations();
        res.render("reservations/index", { reservations });
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        res.status(500).send("Error al obtener las reservas");
    }
};

// Mostrar formulario para crear reserva
const showCreateForm = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        const rooms = await roomsModel.getAllRooms();
        res.render("reservations/form", { reservation: null, customers, rooms });
    } catch (error) {
        console.error("Error al cargar el formulario:", error);
        res.status(500).send("Error al cargar el formulario");
    }
};

// Crear reserva
const createReservation = async (req, res) => {
    try {
        await reservationsModel.addReservation(req.body);
        res.redirect("/reservations");
    } catch (error) {
        console.error("Error al agregar reserva:", error);
        res.status(500).send("Error al agregar reserva");
    }
};

// Mostrar formulario para editar reserva
const showEditForm = async (req, res) => {
    try {
        const reservation = await reservationsModel.getReservationById(req.params.id);
        const customers = await customersModel.getAllCustomers();
        const rooms = await roomsModel.getAllRooms();
        if (!reservation) {
            return res.status(404).send("Reserva no encontrada");
        }
        res.render("reservations/form", { reservation, customers, rooms });
    } catch (error) {
        console.error("Error al cargar la reserva para edición:", error);
        res.status(500).send("Error al cargar la reserva");
    }
};

// Actualizar reserva
const editReservation = async (req, res) => {
    try {
        await reservationsModel.updateReservation(req.params.id, req.body);
        res.redirect("/reservations");
    } catch (error) {
        console.error("Error al actualizar reserva:", error);
        res.status(500).send("Error al actualizar reserva");
    }
};

// Eliminar reserva
const deleteReservation = async (req, res) => {
    try {
        await reservationsModel.deleteReservation(req.params.id);
        res.redirect("/reservations");
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        res.status(500).send("Error al eliminar reserva");
    }
};

export default { getReservations, showCreateForm, createReservation, showEditForm, editReservation, deleteReservation };
