const pool = require('../services/db');

module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO FitnessChallenge (challenge, creator_id, skillpoints)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.challenge, data.creator_id, data.skillpoints];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
    SELECT * FROM FitnessChallenge;
    `;

    pool.query(SQLSTATMENT, callback);
}

module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE FitnessChallenge
    SET challenge = ?, skillpoints = ?
    WHERE challenge_id = ?;
    `;
    const VALUES = [data.challenge, data.skillpoints, data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//Check if challenge exist :joy: ################################################
module.exports.selectChallengeById = (challenge_id, callback) => {
    const SQLSTATEMENT = `
    SELECT challenge_id, challenge, creator_id, skillpoints
    FROM Fitnesschallenge
    WHERE challenge_id = ?;
    `;
    const VALUES = [challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM FitnessChallenge 
    WHERE challenge_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
