-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'games'
--
-- ---


CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NULL DEFAULT NULL,
  minPlayers SMALLINT NULL DEFAULT NULL,
  maxPlayers SMALLINT NULL DEFAULT NULL,
  playingTime SMALLINT NULL DEFAULT NULL,
  cooperative BOOLEAN
);

ALTER TABLE games
ADD COLUMN minage SMALLINT NULL DEFAULT NULL;

-- ---
-- Table 'themes'
--
-- ---


CREATE TABLE IF NOT EXISTS themes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NULL DEFAULT NULL
);

-- ---
-- Table 'mechanics'
--
-- ---


CREATE TABLE IF NOT EXISTS mechanics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NULL DEFAULT NULL
);

-- ---
-- Table 'equipment'
--
-- ---


CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NULL DEFAULT NULL
);

-- ---
-- Table 'game-themes'
--
-- ---


CREATE TABLE IF NOT EXISTS game_themes (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL DEFAULT NULL,
  theme_id INTEGER NULL DEFAULT NULL,
  CONSTRAINT fk_game
   FOREIGN KEY(game_id)
      REFERENCES games(id),
  CONSTRAINT fk_theme
   FOREIGN KEY(theme_id)
      REFERENCES themes(id)
);

-- ---
-- Table 'game-mechanics'
--
-- ---

CREATE TABLE IF NOT EXISTS game_mechanics (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NULL DEFAULT NULL,
  mechanic_id INTEGER NULL DEFAULT NULL,
  CONSTRAINT fk_game
   FOREIGN KEY(game_id)
      REFERENCES games(id),
  CONSTRAINT fk_mechanic
   FOREIGN KEY(mechanic_id)
      REFERENCES mechanics(id)
);

-- ---
-- Table 'game-equipment'
--
-- ---

CREATE TABLE IF NOT EXISTS game_equipment (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL DEFAULT NULL,
  equipment_id INTEGER NULL DEFAULT NULL,
  CONSTRAINT fk_game
   FOREIGN KEY(game_id)
      REFERENCES games(id),
  CONSTRAINT fk_equipment
   FOREIGN KEY(equipment_id)
      REFERENCES equipment(id)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `game-themes` ADD FOREIGN KEY (game_id) REFERENCES `games` (`id`);
-- ALTER TABLE `game-themes` ADD FOREIGN KEY (theme_id) REFERENCES `themes` (`id`);
-- ALTER TABLE `game-mechanics` ADD FOREIGN KEY (game_id) REFERENCES `games` (`id`);
-- ALTER TABLE `game-mechanics` ADD FOREIGN KEY (theme_id) REFERENCES `mechanics` (`id`);
-- ALTER TABLE `game-equipment` ADD FOREIGN KEY (game_id) REFERENCES `games` (`id`);
-- ALTER TABLE `game-equipment` ADD FOREIGN KEY (equipment_id) REFERENCES `equipment` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `games` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `themes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `mechanics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `equipment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `game-themes` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `game-mechanics` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `game-equipment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO
--   mechanics (name)
-- VALUES
--   ('Scenario, Mission, or Campaign'),
--   ('Variapble Player Powers'),
--   ('Deck, Bag, and Pool Building'),
--   ('Resource Management'),
--   ('Battle'),
--   ('Random Number Generation'),
--   ('Bluffing'),
--   ('Trading'),
--   ('Auction'),
--   ('Income'),
--   ('Player Elimination');

INSERT INTO
  themes (name)
VALUES
  ('Fantasy'),
  ('Sci-Fi Science Fiction'),
  ('TV'),
  ('Books'),
  ('Movies'),
  ('The Lord of the Rings'),
  ('Harry Potter'),
  ('Star Trek'),
  ('Firefly'),
  ('Monsters'),
  ('Horror'),
  ('History'),
  ('Renaissance'),
  ('United States of America'),
  ('Comedy'),
  ('Absurd Humor'),
  ('Mystery'),
  ('Murder'),
  ('Spies and Espionage'),
  ('Politics'),
  ('Escape Room'),
  ('Food'),
  ('Animals');

-- INSERT INTO
--   equipment (name)
-- VALUES
--   ('Dice'),
--   ('Cards'),
--   ('Board or Boards'),
--   ('Tokens'),
--   ('Meeples'),
--   ('Figurines or Models');

-- INSERT INTO
--   games (title, minPlayers, maxPlayers, playingTime, cooperative, minage)
-- VALUES
--   ('Splendor', 2, 4, 30, false, 10),
--   ('Ticket to Ride', 2, 5, 60, false, 8),
--   ('Star Trek Catan', 3, 4, 75, false, 10),
--   ('Catan Histories: Settlers of America', 3, 4, 120, false, 12),
--   ('King of Tokyo', 2, 6, 30, false, 8),
--   ('Harry Potter Clue', 3, 5, 30, false, 9),
--   ('Pandemic', 2, 4, 45, true, 8),
--   ('Villainous', 2, 6, 50, false, 10),
--   ('Monopoly: Socialism Edition', 2, 4, 120, false, 18),
--   ('Dixit', 3, 6, 30, false, 8),
--   ('Friends Wheel of Mayhem Game', 2, 6, null, false, 12)