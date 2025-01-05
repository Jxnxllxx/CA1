const model = require("../models/playerModel");

module.exports.createNewPlayer = (req, res, next) => {
    if (req.body.name == undefined||req.body.username == undefined) {
        res.status(400).send("Error: username or name is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        name: req.body.name,
        points: 0,
    }

    model.insertSingle(data, (insertError, insertResults) => {
            if (insertError) {
                console.error("Internal server error during user creation.", insertError);
                res.status(500).json({ error: "Internal server error" });
            } else {
                res.status(201).json({
                    player_id: insertResults.insertId,
                    username: data.username,
                    name: data.name,
                    points: data.points,
                });
            }
        });
}

module.exports.readPlayersByUsername = (req, res, next) => {
    const data = {
        username: req.params.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayersByUsername:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Error: User has no players"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectByUsername(data, callback);
}

module.exports.updateNameById = (req, res, next) => {
    if (req.body.name == undefined ||req.params.player_id == undefined) {
        res.status(400).json({
            message: "Error: name, player_id is undefined"
        });
        return;
    }

    const data = {
        player_id: req.params.player_id,
        name: req.body.name,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(200).json({
                player_id: data.player_id,
                name: data.name
            });
        }
    }

    model.updateById(data, callback);
}

module.exports.deletePlayerById = (req, res, next) => {
    const data = {
        player_id: req.params.player_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}