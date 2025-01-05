const pool = require('../services/db');


// Check Username ################################################
module.exports.selectUserByUsername = (username, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [username];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// Create new user ################################################
module.exports.insertNewUser = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO User (username, skillpoints)
    VALUES (?, ?);
    `;
    const VALUES = [data.username, data.skillpoints];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, skillpoints = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.skillpoints, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Check if user exists ################################################
module.exports.selectUserById = (user_id, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id, username, skillpoints
    FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
