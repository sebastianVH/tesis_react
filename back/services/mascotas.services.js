import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("testTesis1")

async function getMascotas(filter = {}) {
    await client.connect()

    const filterMongo = { deleted: { $ne: true } }

    const regex = new RegExp(filter.nombre, 'i'); 
    if (filter?.nombre) {
     filterMongo.$and = [{ nombre: { $regex: regex } }];
    }

    if (filter?.categoria) {
        filterMongo.categoria = filter.categoria 
    }

    return db.collection("mascotas").find(filterMongo).toArray()
}

async function getMascotaById(id) {
    await client.connect()
    return db.collection("mascotas").findOne({ _id: new ObjectId(id) })
}

async function createMascota(mascota) {
    await client.connect()
    await db.collection("mascotas").insertOne(mascota)
    return mascota
}

async function editMascota(idMascota, mascota) {
    await client.connect()
    await db.collection("mascotas").updateOne({ _id: new ObjectId(idMascota) }, { $set: mascota })
    return mascota
}

async function replaceMascota(idMascota, mascota) {
    await client.connect()
    await db.collection("mascotas").replaceOne({ _id: new ObjectId(idMascota) }, mascota)
    return mascota
}

async function deleteMascota(idMascota) {
    await client.connect()
    await db.collection("mascotas").deleteOne({ _id: new ObjectId(idMascota) })

    return {
        id: idMascota
    }
}

export {
    getMascotas,
    getMascotaById,
    createMascota,
    editMascota,
    deleteMascota,
    replaceMascota
}