import { MongoClient } from "mongodb"

// localhost IPv6 IPv4

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("testTesis1")

client.connect()
    .then(function () {
        console.log("Coneccion exitosa!")

        db.collection("mascotas").insertOne({ name: "Node! otro dato!" })



    })
    .catch(function () {
        console.log("Coneccion incorrecta...")
    })