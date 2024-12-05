import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta absoluta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del path de la base de datos
const dbPath = path.join(__dirname, 'hotel.db');

// Crear la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear tablas si no existen
db.serialize(() => {
    // Tabla de habitaciones
    db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            capacity INTEGER NOT NULL,
            price_per_night REAL NOT NULL
        )
    `, (err) => {
        if (err) console.error('Error al crear la tabla rooms:', err.message);
    });

    // Tabla de clientes
    db.run(`
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL
        )
    `, (err) => {
        if (err) console.error('Error al crear la tabla customers:', err.message);
    });

    // Tabla de reservas
    db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            check_in_date TEXT NOT NULL,
            check_out_date TEXT NOT NULL,
            total_price REAL NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        )
    `, (err) => {
        if (err) console.error('Error al crear la tabla reservations:', err.message);
    });

    // Tabla de servicios
    db.run(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL
        )
    `, (err) => {
        if (err) console.error('Error al crear la tabla services:', err.message);
    });

    // Tabla de servicios por reserva
    db.run(`
        CREATE TABLE IF NOT EXISTS reservation_services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reservation_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (reservation_id) REFERENCES reservations(id),
            FOREIGN KEY (service_id) REFERENCES services(id)
        )
    `, (err) => {
        if (err) console.error('Error al crear la tabla reservation_services:', err.message);
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS purchased_services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            total_price REAL NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES customers(id),
            FOREIGN KEY (service_id) REFERENCES services(id)
        );

    `, (err) => {
        if (err) console.error('Error al crear la tabla purchased_services:', err.message);
    });
});

// Exportar el objeto `db` para usarlo en otros módulos
export default db;
