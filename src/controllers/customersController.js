import customersModel from "../models/customersModel.js";

// Obtener todos los clientes
const getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        res.render("customers/index", { customers });
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).send("Error al obtener los clientes");
    }
};

// Mostrar formulario para crear cliente
const showCreateForm = (req, res) => {
    res.render("customers/form", { customer: null });
};

// Crear cliente
const createCustomer = async (req, res) => {
    try {
        await customersModel.addCustomer(req.body);
        res.redirect("/customers");
    } catch (error) {
        console.error("Error al agregar cliente:", error);
        res.status(500).send("Error al agregar cliente");
    }
};

// Mostrar formulario para editar cliente
const showEditForm = async (req, res) => {
    try {
        const customer = await customersModel.getCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).send("Cliente no encontrado");
        }
        res.render("customers/form", { customer });
    } catch (error) {
        console.error("Error al cargar el cliente para edición:", error);
        res.status(500).send("Error al cargar el cliente");
    }
};

// Actualizar cliente
const editCustomer = async (req, res) => {
    try {
        await customersModel.updateCustomer(req.params.id, req.body);
        res.redirect("/customers");
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        res.status(500).send("Error al actualizar cliente");
    }
};

// Eliminar cliente
const deleteCustomer = async (req, res) => {
    try {
        await customersModel.deleteCustomer(req.params.id);
        res.redirect("/customers");
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        res.status(500).send("Error al eliminar cliente");
    }
};

export default { getCustomers, showCreateForm, createCustomer, showEditForm, editCustomer, deleteCustomer };
