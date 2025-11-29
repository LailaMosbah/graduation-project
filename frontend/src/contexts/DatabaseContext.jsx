import { createContext, useState } from "react";
// import { uploadFileRequest, fetchDatabasesRequest } from "../services/databaseService";


const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {

    // ============= CRUD =============

    // #region CREATE database ===============
    // Add a new database (no API)
    const addDatabase = (newDatabase) => {
        setDatabases((prev) => [...prev, { id: Date.now(), ...newDatabase }]);
    };
    // Add a new database (wit API)
    /* const addDatabase = async (newDatabse)=>{
         try{
             const res = await uploadFileRequest(newDatabse)
             // res.data => {id , fileName}
             setDatabases(prev => setDatabases([...prev , res.data]))
         }
         catch(err){
             console.log("Error uploading file: ", err)
         }
     } */
    // #endregion

    // #region  READ database ================== 
    // Initialize with some fake data
    // Get just name of databases 
    const [databases, setDatabases] = useState([
        {
            dbId: 1,
            dbName: "Database1",
        },
        {
            dbId: 2,
            dbName: "Database2",
        },
    ]);
    // old fake data
    // const [databases, setDatabases] = useState([
    //     {
    //         dbId: 1,
    //         dbName: "Database1",
    //         tables: [
    //             { tableName: "Users", columns: ["id", "name", "email"] },
    //             { tableName: "Orders", columns: ["id", "userId", "amount"] },
    //         ],
    //     },
    //     {
    //         dbId: 2,
    //         dbName: "Database2",
    //         tables: [
    //             { tableName: "Products", columns: ["id", "title", "price"] },
    //             { tableName: "Categories", columns: ["id", "categoryName"] },
    //         ],
    //     },
    // ]);

    // ======== CRUD operations for databases ========
    // ===== Add a new database =====

    // GET — Fetch file names only wit API
    /*const getDatabases = async () => {
        try {
            const res = await fetchDatabasesRequest();
            setDatabases(res.data);
        } catch (err) {
            console.error("Error fetching files: ", err);
        }
    };*/
    // #endregion

    // #region UPDATE an existing database =========
    const updateDatabase = (id, updatedData) => {
        setDatabases((prev) =>
            prev.map((db) => (db.id === id ? { ...db, ...updatedData } : db))
        );
    };
    // #endregion

    // #region DELETE a database =========
    const deleteDatabase = (id) => {
        setDatabases((prev) => prev.filter((db) => db.id !== id));
    };
    // #endregion

    // useEffect(() => {
    //     getDatabases();
    // }, []);


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
