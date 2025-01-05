const model = require("../models/userModel.js");

// Create new User ################################################
module.exports.createNewUser = (req, res, next) => {
    if (!req.body.username) {
        res.status(400).send("Error: username is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        skillpoints: 0 // Default value for skillpoints
    };

    // Check if the username already exists ################################################
    model.selectUserByUsername(data.username, (error, results) => {
        if (error) {
            console.error("Internal server error during username check.", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (results.length > 0) {
            // Username already exists
            res.status(409).json({ error: "Username is already associated with another user" });
        } else {
            // Proceed to insert the new user
            model.insertNewUser(data, (insertError, insertResults) => {
                if (insertError) {
                    console.error("Internal server error during user creation.", insertError);
                    res.status(500).json({ error: "Internal server error" });
                } else {
                    res.status(201).json({
                        user_id: insertResults.insertId,
                        username: data.username,
                        skillpoints: data.skillpoints
                    });
                }
            });
        }
    });
};

module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else return res.status(200).json(results);
    }

    model.selectAll(callback);
}

// Update user by user id and like check if the username duplicate oh my  
module.exports.updateUserById = (req, res, next) => {
    const userId = req.params.user_id;
    const { username, skillpoints } = req.body;

    if (!username || skillpoints === undefined) {
        res.status(400).send("Error: username or skillpoints is undefined");
        return;
    }

    // Check if the username is already taken by another user 
    model.selectUserByUsername(username, (error, results) => {
        if (error) {
            console.error("Internal server error during username check.", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        if (results.length > 0 && results[0].user_id != userId) {
            // Username is taken by another user
            res.status(409).json({ error: "Username is already associated with another user" });
        } else {
            // Check if the user exists
            model.selectUserById(userId, (error, userResults) => {
                if (error) {
                    console.error("Internal server error during user check.", error);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }

                if (userResults.length === 0) {
                    // User does not exist
                    res.status(404).json({ error: "User not found" });
                } else {
                    // Proceed to update the user
                    const data = { user_id: userId, username, skillpoints };
                    model.updateById(data, (updateError) => {
                        if (updateError) {
                            console.error("Internal server error during user update.", updateError);
                            res.status(500).json({ error: "Internal server error" });
                        } else {
                            res.status(200).json({
                                user_id: userId,
                                username,
                                skillpoints,
                            });
                        }
                    });
                }
            });
        }
    });
};