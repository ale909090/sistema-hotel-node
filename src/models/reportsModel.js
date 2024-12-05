import db from "../../db/database.js";

const getTopServices = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `
            SELECT 
                services.name AS service_name,
                SUM(purchased_services.quantity) AS total_quantity,
                SUM(purchased_services.total_price) AS total_revenue
            FROM purchased_services
            JOIN services ON purchased_services.service_id = services.id
            GROUP BY purchased_services.service_id
            ORDER BY total_quantity DESC
            LIMIT 5
            `,
            [],
            (err, rows) => {
                if (err) {
                    console.error("Error al obtener los servicios más vendidos:", err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
};

export default { getTopServices };
