const pool = require('../services/db');

// Create new user ################################################
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Quest (quest, points)
    VALUES (?, ?);
    `;
    const VALUES = [data.quest, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE Quest
    SET quest = ?, points = ?
    WHERE quest_id = ?;
    `;
    const VALUES = [data.quest, data.points, data.quest_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM Quest
    WHERE quest_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}