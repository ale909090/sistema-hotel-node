import db from "../../db/database.js";

const getAllReservations = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                reservations.id,
                customers.name AS customer_name,
                rooms.name AS room_name,
                reservations.check_in_date,
                reservations.check_out_date,
                reservations.total_price
            FROM reservations
            JOIN customers ON reservations.customer_id = customers.id
            JOIN rooms ON reservations.room_id = rooms.id
            ORDER BY reservations.check_in_date
            `,
            [],
            (err, rows) => {
                if (err) {
                    console.error("Error al obtener reservas:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

const getReservationById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM reservations WHERE id = ?",
            [id],
            (err, row) => {
                if (err) {
                    console.error(`Error al obtener la reserva con ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

const addReservation = (reservation) => {
    return new Promise((resolve, reject) => {
        const { customer_id, room_id, check_in_date, check_out_date, total_price } = reservation;
        db.run(
            `
            INSERT INTO reservations (customer_id, room_id, check_in_date, check_out_date, total_price)
            VALUES (?, ?, ?, ?, ?)
            `,
            [customer_id, room_id, check_in_date, check_out_date, total_price],
            function (err) {
                if (err) {
                    console.error("Error al agregar reserva:", err);
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
};

const updateReservation = (id, reservation) => {
    return new Promise((resolve, reject) => {
        const { customer_id, room_id, check_in_date, check_out_date, total_price } = reservation;
        db.run(
            `
            UPDATE reservations
            SET customer_id = ?, room_id = ?, check_in_date = ?, check_out_date = ?, total_price = ?
            WHERE id = ?
            `,
            [customer_id, room_id, check_in_date, check_out_date, total_price, id],
            function (err) {
                if (err) {
                    console.error(`Error al actualizar la reserva con ID ${id}:`, err);
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            }
        );
    });
};

const deleteReservation = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM reservations WHERE id = ?", [id], function (err) {
            if (err) {
                console.error(`Error al eliminar la reserva con ID ${id}:`, err);
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

export default { getAllReservations, getReservationById, addReservation, updateReservation, deleteReservation };
