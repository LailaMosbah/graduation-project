// import axios from "axios";

export const translateToSQL = async (text, database) => {
  /* try {
    const response = await axios.post("http://localhost:3000/api/translate", {
      text,
      database,
    });
    return response.data.sql; // الباك إند بيرجع SQL
  } catch (error) {
    console.error("Error translating to SQL:", error);
    throw error;
  }*/
  return ` SELECT p_name, p_category, p_price FROM ${database}  WHERE ${text}`;
};
