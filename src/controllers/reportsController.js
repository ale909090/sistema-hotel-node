import reportsModel from "../models/reportsModel.js";

const getTopServicesReport = async (req, res) => {
    try {
        const topServices = await reportsModel.getTopServices();
        res.render("reports/services", { topServices });
    } catch (error) {
        console.error("Error al generar el reporte:", error);
        res.status(500).send("Error al generar el reporte");
    }
};

export default { getTopServicesReport };
