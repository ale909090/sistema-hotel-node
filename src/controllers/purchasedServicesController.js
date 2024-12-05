import purchasedServicesModel from "../models/purchasedServicesModel.js";
import customersModel from "../models/customersModel.js";
import servicesModel from "../models/servicesModel.js";

// Obtener todos los servicios comprados
const getPurchasedServices = async (req, res) => {
    try {
        const purchasedServices = await purchasedServicesModel.getAllPurchasedServices();
        const customers = await customersModel.getAllCustomers();
        const services = await servicesModel.getAllServices();
        res.render("purchased_services/index", { purchasedServices, customers, services }); // Solo pasa `purchasedServices`
    } catch (error) {
        console.error("Error al obtener servicios comprados:", error);
        res.status(500).send("Error al obtener servicios comprados");
    }
};


// Mostrar formulario para agregar servicio comprado
const showPurchaseForm = async (req, res) => {
    try {
        const customers = await customersModel.getAllCustomers();
        const services = await servicesModel.getAllServices();
        res.render("purchased_services/form", { customers, services }); // Pasa `customers` y `services`
    } catch (error) {
        console.error("Error al cargar el formulario:", error);
        res.status(500).send("Error al cargar el formulario");
    }
};


// Agregar un servicio comprado
const addPurchasedService = async (req, res) => {
    try {
        const { customer_id, service_id, quantity } = req.body;

        // Obtener el precio del servicio
        const service = await servicesModel.getServiceById(service_id);
        const total_price = service.price * quantity;

        await purchasedServicesModel.addPurchasedService({
            customer_id,
            service_id,
            quantity,
            total_price,
        });
        res.redirect("/purchased_services");
    } catch (error) {
        console.error("Error al agregar servicio comprado:", error);
        res.status(500).send("Error al agregar servicio comprado");
    }
};

// Eliminar un servicio comprado
const deletePurchasedService = async (req, res) => {
    try {
        await purchasedServicesModel.deletePurchasedService(req.params.id);
        res.redirect("/purchased_services");
    } catch (error) {
        console.error("Error al eliminar servicio comprado:", error);
        res.status(500).send("Error al eliminar servicio comprado");
    }
};

export default { getPurchasedServices, showPurchaseForm, addPurchasedService, deletePurchasedService };
