const pool = require('../services/db');

module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO Player (username, name, points)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.username, data.name, data.points];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectByUsername = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Player
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE Player
    SET name = ?
    WHERE player_id = ?;
    `;
    const VALUES = [data.name, , data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Player
    WHERE player_id = ?;
    `;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}