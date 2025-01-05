const model = require("../models/fitnessChallengeModel.js");

module.exports.createNewChallenge = (req, res, next) => {
    if (req.body.user_id == undefined || req.body.skillpoints == undefined || req.body.challenge == undefined) {
        res.status(400).send("Error: challenge, user_id or skillpoints undefined");
        return;
    }

    const data = {
        challenge_id: req.params.challenge_id,
        challenge: req.body.challenge,
        creator_id: req.body.user_id,
        skillpoints: req.body.skillpoints
    }

    model.insertSingle(data, (insertError, insertResults) => {
        if (insertError) {
            console.error("Internal server error during user creation.", insertError);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(201).json({
                challenge_id: insertResults.insertId,
                challenge: data.challenge,
                creator_id: data.creator_id,
                skillpoints: data.skillpoints
            });
        }
    });
}

module.exports.readAllChallenges = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllChallenges:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.getCreatorId = (req, res, next) => {
    
}

//Update challenge ################################################
module.exports.updateChallengeById = (req, res, next) => {
    const challengeId = req.params.challenge_id;
    const { user_id, challenge, skillpoints } = req.body;

    // Validate request body
    if (!user_id || !challenge || skillpoints === undefined) {
        res.status(400).json({ error: "Missing user_id, challenge, or skillpoints" });
        return;
    }

    // Check if the challenge exists
    model.selectChallengeById(challengeId, (error, results) => {
        if (error) {
            console.error("Internal server error during challenge check.", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (results.length === 0) {
            // Challenge does not exist
            res.status(404).json({ error: "Challenge not found" });
        } else {
            const existingChallenge = results[0];

            // Verify that the user is the creator of the challenge
            if (existingChallenge.creator_id != user_id) {
                res.status(403).json({ error: "You are not the creator of this challenge" });
            } else {
                // Proceed to update the challenge
                const data = { challenge_id: challengeId, challenge, skillpoints };
                model.updateById(data, (updateError) => {
                    if (updateError) {
                        console.error("Internal server error during challenge update.", updateError);
                        res.status(500).json({ error: "Internal server error" });
                    } else {
                        res.status(200).json({
                            challenge_id: challengeId,
                            challenge: challenge,
                            creator_id: user_id,
                            skillpoints: skillpoints
                        });
                    }
                });
            }
        }
    });
};
module.exports.deleteChallengeById = (req, res, next) => {
    const data = {
        id: req.params.challenge_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteChallengeById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Challenge not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}