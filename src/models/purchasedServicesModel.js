import db from "../../db/database.js";

const getAllPurchasedServices = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                purchased_services.id,
                customers.name AS customer_name,
                services.name AS service_name,
                purchased_services.quantity,
                purchased_services.total_price
            FROM purchased_services
            JOIN customers ON purchased_services.customer_id = customers.id
            JOIN services ON purchased_services.service_id = services.id
            ORDER BY purchased_services.id
            `,
            [],
            (err, rows) => {
                if (err) {
                    console.error("Error al obtener servicios comprados:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

const addPurchasedService = (purchase) => {
    return new Promise((resolve, reject) => {
        const { customer_id, service_id, quantity, total_price } = purchase;
        db.run(
            `
            INSERT INTO purchased_services (customer_id, service_id, quantity, total_price)
            VALUES (?, ?, ?, ?)
            `,
            [customer_id, service_id, quantity, total_price],
            function (err) {
                if (err) {
                    console.error("Error al agregar servicio comprado:", err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};

const deletePurchasedService = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM purchased_services WHERE id = ?", [id], function (err) {
            if (err) {
                console.error(`Error al eliminar el servicio comprado con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export default { getAllPurchasedServices, addPurchasedService, deletePurchasedService };
