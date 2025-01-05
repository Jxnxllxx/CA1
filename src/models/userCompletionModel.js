const pool = require('../services/db');

// Insert new user
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO UserCompletion (user_id, completed, creation_date, notes, challenge_id)
    VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.completed, data.creation_date, data.notes, data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// Check if user exists 
module.exports.selectUserById = (user_id, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id
    FROM UserCompletion
    WHERE user_id = ?;
    `;
    const VALUES = [user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

//Check if challenge exists
module.exports.selectChallengeById = (challenge_id, callback) => {
    const SQLSTATEMENT = `
    SELECT challenge_id, challenge, creator_id, skillpoints
    FROM Fitnesschallenge
    WHERE challenge_id = ?;
    `;
    const VALUES = [challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// Check if user completion exists
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM UserCompletion
    WHERE challenge_id = ?;
    `;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateUserSkillpoints = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM UserCompletion
    WHERE skillpoints = ?
    `;
    const VALUES = [data.skillpoints];

    pool.query(SQLSTATEMENT, VALUES, callback);
}