import mysql from "mysql"

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "api_recipe"
})

connection.connect();


export const consult = (sql, values = "", messageReject) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                return reject(messageReject);
            } else {
                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            }
        });
    });
};


export default connection;