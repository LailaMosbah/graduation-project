import { createContext, useState } from "react";

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {

    // Initialize with some fake data
    const [databases, setDatabases] = useState([
        {
            dbId: 1,
            dbName: "Database1",
            tables: [
                { tableName: "Users", columns: ["id", "name", "email"] },
                { tableName: "Orders", columns: ["id", "userId", "amount"] },
            ],
        },
        {
            dbId: 2,
            dbName: "Database2",
            tables: [
                { tableName: "Products", columns: ["id", "title", "price"] },
                { tableName: "Categories", columns: ["id", "categoryName"] },
            ],
        },
    ]);

    // ======== CRUD operations for databases ========
    // ===== Add a new database =====
    const addDatabase = (newDatabase) => {
        setDatabases((prev) => [...prev, { id: Date.now(), ...newDatabase }]);
    };

    // ===== Update an existing database =====
    const updateDatabase = (id, updatedData) => {
        setDatabases((prev) =>
            prev.map((db) => (db.id === id ? { ...db, ...updatedData } : db))
        );
    };

    // ===== Delete a database =====
    const deleteDatabase = (id) => {
        setDatabases((prev) => prev.filter((db) => db.id !== id));
    };



    /* const selectSchema = (id) => {
         const found = schemas.find((schema) => schema.id === id);
         if (found) setSelectedSchema(found);
     };*/

    return (
        <DatabaseContext.Provider
            value={{
                databases,
                addDatabase,
                updateDatabase,
                deleteDatabase,
            }}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

export default DatabaseContext;
