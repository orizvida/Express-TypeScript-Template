import dotenv from 'dotenv';
dotenv.config();

// const MYSQL_HOST = process.env.MYSQL_HOST;
// const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
// const MYSQL_USER = process.env.MYSQL_USER;
// const MYSQL_PASS = process.env.MYSQL_PASS;
// const filePath = './dist/temp'

// const MYSQL = {
//     host: MYSQL_HOST,
//     database: MYSQL_DATABASE,
//     user: MYSQL_USER,
//     pass: MYSQL_PASS
// };


const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER
};

export default config;