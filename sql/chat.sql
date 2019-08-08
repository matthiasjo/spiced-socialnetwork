DROP TABLE IF EXISTS chat;

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT NULL,
    message TEXT NOT NULL CHECK (message <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ################### FAILED ATTEMPT #####################
-- CREATE OR REPLACE FUNCTION check_chat_update()
-- RETURNS TRIGGER
-- AS $$
-- BEGIN
-- SELECT chat.id AS msg_id, message, users.id AS user_id,
--     first, last, avatar, chat.created_at
--     FROM chat
--     JOIN users
--     ON sender_id = users.id
--     WHERE chat.id = NEW.id;
-- RETURN NEW;
-- END;
-- $$
-- LANGUAGE plpgsql;
--
-- CREATE TRIGGER check_chat_trigger
-- AFTER INSERT ON chat
-- FOR EACH STATEMENT EXECUTE PROCEDURE check_chat_update();
--
-- DROP TRIGGER IF EXISTS check_chat_trigger ON chat;
