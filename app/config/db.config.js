module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "sharma78",
  DB: "infinite_scroll",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
