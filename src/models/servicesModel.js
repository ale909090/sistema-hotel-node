import db from "../../db/database.js";

const getAllServices = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM services", [], (err, rows) => {
            if (err) {
                console.error("Error al obtener servicios:", err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getServiceById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM services WHERE id = ?", [id], (err, row) => {
            if (err) {
                console.error(`Error al obtener el servicio con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const addService = (service) => {
    return new Promise((resolve, reject) => {
        const { name, price } = service;
        db.run(
            "INSERT INTO services (name, price) VALUES (?, ?)",
            [name, price],
            function (err) {
                if (err) {
                    console.error("Error al agregar servicio:", err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};

const updateService = (id, service) => {
    return new Promise((resolve, reject) => {
        const { name, price } = service;
        db.run(
            "UPDATE services SET name = ?, price = ? WHERE id = ?",
            [name, price, id],
            function (err) {
                if (err) {
                    console.error(`Error al actualizar el servicio con ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
};

const deleteService = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM services WHERE id = ?", [id], function (err) {
            if (err) {
                console.error(`Error al eliminar el servicio con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export default { getAllServices, getServiceById, addService, updateService, deleteService };
