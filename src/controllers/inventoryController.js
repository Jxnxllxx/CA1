const model = require("../models/inventoryModel");

module.exports.createNewWeapon = (req, res, next) => {
    if (req.body.player_id == undefined || req.body.weapon == undefined || req.body.damage == undefined) {
        res.status(400).send("Error: player_id, weapon, damage undefined");
        return;
    }

    const data = {
        player_id:req.body.player_id,
        weapon:req.body.weapon,
        damage:req.body.damage,
        level: 1
    }

    model.insertSingle(data, (insertError, insertResults) => {
        if (insertError) {
            console.error("Internal server error during user creation.", insertError);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(201).json({
                player_id: insertResults.insertId,
                weapon: data.weapon,
                damage: data.damage,
                level: data.level
            });
        }
    });
}


module.exports.deleteWeaponById = (req, res, next) => {
    const data = {
        weapon_id: req.params.weapon_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteWeaponById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Weapon not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}

module.exports.readWeaponsByPlayerId = (req, res, next) => {
    const data = {
        player_id: req.params.player_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readWeaponsByPlayerId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Error: Player has no weapons"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}