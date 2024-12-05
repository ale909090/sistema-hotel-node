import db from "../../db/database.js";

const getAllRooms = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM rooms", [], (err, rows) => {
            if (err) {
                console.error("Error al obtener habitaciones:", err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getRoomById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM rooms WHERE id = ?", [id], (err, row) => {
            if (err) {
                console.error(`Error al obtener la habitación con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const addRoom = (room) => {
    return new Promise((resolve, reject) => {
        const { name, type, capacity, price_per_night } = room;
        db.run(
            "INSERT INTO rooms (name, type, capacity, price_per_night) VALUES (?, ?, ?, ?)",
            [name, type, capacity, price_per_night],
            function (err) {
                if (err) {
                    console.error("Error al agregar la habitación:", err);
                    reject(err);
                } else {
                    resolve(this.lastID); // Devuelve el ID de la habitación recién creada
                }
            }
        );
    });
};

const updateRoom = (id, room) => {
    return new Promise((resolve, reject) => {
        const { name, type, capacity, price_per_night } = room;
        db.run(
            "UPDATE rooms SET name = ?, type = ?, capacity = ?, price_per_night = ? WHERE id = ?",
            [name, type, capacity, price_per_night, id],
            function (err) {
                if (err) {
                    console.error(`Error al actualizar la habitación con ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(this.changes); // Devuelve el número de filas actualizadas
                }
            }
        );
    });
};

const deleteRoom = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM rooms WHERE id = ?", [id], function (err) {
            if (err) {
                console.error(`Error al eliminar la habitación con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(this.changes); // Devuelve el número de filas eliminadas
            }
        });
    });
};

export default { getAllRooms, getRoomById, addRoom, updateRoom, deleteRoom };
