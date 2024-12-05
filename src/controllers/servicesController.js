import servicesModel from "../models/servicesModel.js";

// Obtener todos los servicios
const getServices = async (req, res) => {
    try {
        const services = await servicesModel.getAllServices();
        res.render("services/index", { services });
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
        res.status(500).send("Error al obtener los servicios");
    }
};

// Mostrar formulario para crear servicio
const showCreateForm = (req, res) => {
    res.render("services/form", { service: null });
};

// Crear servicio
const createService = async (req, res) => {
    try {
        await servicesModel.addService(req.body);
        res.redirect("/services");
    } catch (error) {
        console.error("Error al agregar servicio:", error);
        res.status(500).send("Error al agregar servicio");
    }
};

// Mostrar formulario para editar servicio
const showEditForm = async (req, res) => {
    try {
        const service = await servicesModel.getServiceById(req.params.id);
        if (!service) {
            return res.status(404).send("Servicio no encontrado");
        }
        res.render("services/form", { service });
    } catch (error) {
        console.error("Error al cargar el servicio para edición:", error);
        res.status(500).send("Error al cargar el servicio");
    }
};

// Actualizar servicio
const editService = async (req, res) => {
    try {
        await servicesModel.updateService(req.params.id, req.body);
        res.redirect("/services");
    } catch (error) {
        console.error("Error al actualizar servicio:", error);
        res.status(500).send("Error al actualizar servicio");
    }
};

// Eliminar servicio
const deleteService = async (req, res) => {
    try {
        await servicesModel.deleteService(req.params.id);
        res.redirect("/services");
    } catch (error) {
        console.error("Error al eliminar servicio:", error);
        res.status(500).send("Error al eliminar servicio");
    }
};

export default { getServices, showCreateForm, createService, showEditForm, editService, deleteService };
