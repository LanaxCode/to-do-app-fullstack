import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

// Wir wolle das unsere daten so aussehen
// data = {
//   "ac7130b0-...-90edd4140f3a": { name: "Oliver" },
// };

// ID == Index is nicht so nice!
// Array als Datenstruktur ist verwaltungsschwer
// Strukturell suboptimal
export const FileHandler = async (path) => {
  let data = await fs.readFile(path);
  // Daten Pool / .json Inhalt
  data = JSON.parse(data);

  // Gibt alles VALUES aus unserem daten Objekt
  // als array zurück
  const getData = () => {
    return Object.values(data);
  };

  // Geb uns den DatenSatz mit der ID
  // Zum Glück ist die property von unserem
  // Datensatz die ID
  const getOne = (id) => {
    console.log(id)
    return data[id];
  };

  // Function um Daten hinzuzufügen
  const addDataEntry = async (dataEntry) => {
    // Eine neue ID erstellen
    const newID = uuidv4();
    // data["ac7130b0-..."] = dataEntry bzw { name: "Oliver" }
    // Id and den neuen datensatz (dataEntry) anfügen
    dataEntry.id = newID;
    // data (Unser großer daten-pool)
    // Property is id und wert ist neuer Datensatz
    data[newID] = dataEntry;
    //speicher das in der Datei!
    fs.writeFile(path, JSON.stringify(data));
  };

  const deleteOne = (id) => {
    // Lösche folgenden eintrag aus dem daten-pool
    delete data[id];
    // Schreibe den daten-pool in der JSON Datei
    fs.writeFile(path, JSON.stringify(data));
  };

  const updateOne = (id, updateData) => {
    // Datensatz der geupdated wird
    const updateTarget = data[id];
    // Neuer Datensatz aka updated
    const updatedData = { ...updateTarget, ...updateData };
    // Update zurück in den daten-pool
    data[id] = updatedData;

    fs.writeFile(path, JSON.stringify(data));
    // Und geben die daten zurück das unsere response das update
    // dem user anzeigen kann
    return updatedData;
  };

  return {
    getData,
    getOne,
    addDataEntry,
    deleteOne,
    updateOne,
  };
};
