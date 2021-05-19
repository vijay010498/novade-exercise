/*
This file will create table if not exists and auto insert 1000 random records
 */
import { postgres } from "./config/postgresConnection";

const autoCreateTableInsert = async () => {
  try {
    //init database and create table schema
    await postgres.query(
      "CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, added VARCHAR(255) NULL,author VARCHAR(255) NOT NULL, content VARCHAR(255) NOT NULL)"
    );
    //auto insert 1000 records
    const authors = ["john", "jane", "pablo", "sara", "vijay"];
    const addedDates = [
      "2021-01-02",
      "2021-05-19",
      "2021-03-21",
      "2021-04-01",
      "2021-04-28",
    ];
    const notes = [
      "Get Food",
      "Buy Some Chocolates",
      "Get a pen",
      "Commit to github before 3 pm",
      "Test the new code ASAP",
      "Meeting with joy today",
    ];
    console.log("Auto Inserting 1000 records");
    for (let i = 0; i < 1000; i++) {
      const added = addedDates[Math.floor(Math.random() * addedDates.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      const content = notes[Math.floor(Math.random() * notes.length)];
      await postgres.query(
        "INSERT INTO notes (added,author,content) VALUES ($1,$2,$3)",
        [added, author, content]
      );
    }
    console.log("Inserted 1000 records");
  } catch (err) {
    console.error("Error  Auto Inserting Data");
  }
};

autoCreateTableInsert();
