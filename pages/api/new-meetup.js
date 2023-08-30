import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://vwadhwa:Membermongo@cluster0.hgl4lx4.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollections = db.collection("meetups");

    const result = await meetupsCollections.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Successfully added meetup" });
  }
}
