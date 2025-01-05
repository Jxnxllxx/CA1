const pool = require("../services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS FitnessChallenge;

DROP TABLE IF EXISTS UserCompletion;

DROP TABLE IF EXISTS Player;

DROP TABLE IF EXISTS Quest;

DROP TABLE IF EXISTS Inventory;

CREATE TABLE User (
 user_id INT AUTO_INCREMENT PRIMARY KEY,
 username TEXT NOT NULL,
 skillpoints INT NOT NULL
);

CREATE TABLE FitnessChallenge (
 challenge_id INT AUTO_INCREMENT PRIMARY KEY,
 creator_id INT NOT NULL,
 challenge TEXT NOT NULL,
 skillpoints INT NOT NULL
);

CREATE TABLE UserCompletion (
 complete_id INT AUTO_INCREMENT PRIMARY KEY,
 challenge_id INT NOT NULL,
 user_id INT NOT NULL,
 completed BOOL NOT NULL,
 creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 notes TEXT
);

CREATE TABLE Player (
player_id INT AUTO_INCREMENT PRIMARY KEY,
username TEXT NOT NULL,
name TEXT NOT NULL,
points INT NOT NULL
);

CREATE TABLE Quest(
quest_id INT AUTO_INCREMENT PRIMARY KEY,
quest TEXT NOT NULL,
points INT NOT NULL
);

CREATE TABLE Inventory(
weapon_id INT AUTO_INCREMENT PRIMARY KEY,
player_id INT NOT NULL,
weapon TEXT NOT NULL,
damage INT NOT NULL,
level INT NOT NULL,
description TEXT
);

INSERT INTO FitnessChallenge (creator_id, challenge, skillpoints) VALUES
(1, 'Complete 2.4km within 15 minutes', 50),
(1, 'Cycle around the island for at least 50km', 100),
(2, 'Complete a full marathon (42.2km)', 200),
(2, 'Hold a plank for 5 minutes', 50),
(2, 'Perform 100 push-ups in one session', 75);

INSERT INTO Inventory (player_id, weapon, damage, level) VALUES
(1, 'knife', 100, 1),
(1, 'dagger', 150, 1);

INSERT INTO Quest (quest, points) VALUES
('Defeat boss level 20', 30),
('Collect 50 gems', 20);
`

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully:", results);
    }
    process.exit();
  });