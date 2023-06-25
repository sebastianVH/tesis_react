import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("testTesis1");
const profileCollection = db.collection("profile");

async function createProfile(account, profile) {
  const profileData = {
    ...profile,
    userName: account.userName,
    _id: new ObjectId(account._id),
  };

  client.connect();

  const isExist = await profileCollection.findOne({
    _id: new ObjectId(account._id),
  });

  if (isExist) {
    throw new Error("La cuenta ya tiene un perfil asociado.");
  }

  await profileCollection.insertOne(profileData);
}

async function getProfile(idProfile) {
  client.connect();

  const profile = await profileCollection.findOne({
    _id: new ObjectId(idProfile),
  });

  if (!profile) {
    throw new Error("La cuenta no tiene un perfil asociado.");
  }

  return profile;
}

export { createProfile, getProfile };
