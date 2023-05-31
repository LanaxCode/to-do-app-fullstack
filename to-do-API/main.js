
import express from "express";
import { FileHandler } from "./model/BlankModel.js";
import path from "node:path";
import cors from "cors";

const app = express();
const port = 3008;

app.use(express.json());
app.use(cors());

const toDoModel = await FileHandler(
  new URL("./data/toDo.json", import.meta.url)
);

//	- GET `/contacts`: Rufe alle Kontakte ab und gib sie als JSON-Antwort zurück.
app.get("/todos", async (req, res) => {
  const data = toDoModel.getData();
  res.send(data);
});

// - GET `/contacts/:id`: Rufe einen bestimmten Kontakt anhand seiner ID ab und gib ihn als JSON-Antwort zurück.
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const data = toDoModel.getOne(id);
  res.send(data);
});

// - POST `/contacts`: Erstelle einen neuen Kontakt anhand der übergebenen Daten im Anfragekörper und gib den neu erstellten Kontakt als JSON-Antwort zurück.
app.post("/todos", (req, res) => {
  const data = req.body;
  toDoModel.addDataEntry(data);
  res.send(data);
  console.log(data)
});

// - PUT `/contacts/:id`: Aktualisiere einen bestimmten Kontakt anhand seiner ID und der übergebenen Daten im Anfragekörper. Gib den aktualisierten Kontakt als JSON-Antwort zurück.
app.put("/todos/:id", (req, res) => {
  const updateData = req.body;
  const id = req.params.id;
  const result = toDoModel.updateOne(id, updateData);
  res.send(result);
});


// - DELETE `/contacts/:id`: Lösche einen bestimmten Kontakt anhand seiner ID und gib eine JSON-Antwort zurück, die den Erfolg der Operation angibt.
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  toDoModel.deleteOne(id);
  console.log(id)
  res.send("Deleted");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
