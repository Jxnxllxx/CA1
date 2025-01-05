const model = require("../models/userCompletionModel.js");

module.exports.createNewUserCompletion = (req, res, next) => {
    if (req.body.creation_date == undefined) {
        res.status(400).send("Error: creation_date undefined");
        return;
    }

    const data = {
        challenge_id: req.params.challenge_id,
        user_id:req.body.user_id,
        completed: req.body.completed,
        creation_date: req.body.creation_date,
        notes: req.body.notes
    }

    // Check if challenge exists
    model.selectChallengeById(data.challenge_id, (challengeError, challengeResults) => {
        if (challengeError) {
            console.error("Internal server error during challenge check.", challengeError);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (challengeResults.length === 0) {
            res.status(404).json({ error: "Challenge not found" });
            return;
        }

        // Check if user exists
        model.selectUserById(data.user_id, (userError, userResults) => {
            if (userError) {
                console.error("Internal server error during user check.", userError);
                res.status(500).json({ error: "Internal server error" });
                return;
            }

            if (userResults.length === 0) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            model.insertCompletion(data, (insertError, insertResults) => {
                if (insertError) {
                    console.error("Internal server error during completion insertion.", insertError);
                    res.status(500).json({ error: "Internal server error" });
                } else {
                    // Update user skillpoints (add challenge skillpoints if completed, or 5 skillpoints otherwise)
                    const skillpoints = completed ? challengeResults[0].skillpoints : 5;

                    model.updateUserSkillpoints(user_id, skillpoints, (updateError) => {
                        if (updateError) {
                            console.error("Internal server error during skillpoints update.", updateError);
                            res.status(500).json({ error: "Internal server error" });
                        } else {
                            res.status(201).json({
                                complete_id: insertResults.insertId,
                                challenge_id: challengeId,
                                user_id,
                                completed,
                                creation_date,
                                notes
                            });
                        }
                    });
                }
            });
        });
    });
    model.insertSingle(data, (insertError, insertResults) => {
            if (insertError) {
                console.error("Internal server error during user creation.", insertError);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({
                    complete_id: insertResults.insertId,
                    challenge_id: data.challenge_id,
                    user_id: data.user_id,
                    completed: data.completed,
                    creation_date: data.creation_date,
                    notes: data.notes
                });
            }
        });
}

module.exports.readUserCompletionById = (req, res, next) => {
    const data = {
        challenge_id: req.params.challenge_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserCompletionById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Error: Challenge has no user attempts"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}