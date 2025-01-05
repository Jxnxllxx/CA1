const pool = require('../services/db');

module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Inventory (player_id, weapon, damage, level)
    VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.player_id, data.weapon, data.damage, data.level];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Inventory
    WHERE weapon_id = ?;
    `;
    const VALUES = [data.weapon_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Inventory
    WHERE player_id = ?;
    `;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
