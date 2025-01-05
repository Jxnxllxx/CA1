const model = require("../models/questModel");

module.exports.createNewQuest = (req, res, next) => {
    if (req.body.points == undefined || req.body.quest == undefined) {
        res.status(400).send("Error: quest or points undefined");
        return;
    }

    const data = {
        quest: req.body.quest,
        points: req.body.points
    }

    model.insertSingle(data, (insertError, insertResults) => {
        if (insertError) {
            console.error("Internal server error during user creation.", insertError);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(201).json({
                quest_id: insertResults.insertId,
                quest: data.quest,
                points: data.points
            });
        }
    });
}

module.exports.updateQuestById = (req, res, next) => {
    if (req.body.quest == undefined ||req.params.quest_id == undefined||req.params.points == undefined) {
        res.status(400).json({
            message: "Error: quest, quest_id or points is undefined"
        });
        return;
    }

    const data = {
        quest_id: req.params.quest_id,
        quest: req.body.quest,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Quest not found"
                });
            }
            else res.status(200).json({
                quest_id: data.quest_id,
                quest: data.quest,
                points: data.points
            });
        }
    }

    model.updateById(data, callback);
}


module.exports.deleteQuestById = (req, res, next) => {
    const data = {
        id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Quest not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}