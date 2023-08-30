import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";

export default function HomePage({ meetups }) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="A meetup manager"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://pic.onlinewebfonts.com/thumbnails/icons_454077.svg"></link>
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://vwadhwa:Membermongo@cluster0.hgl4lx4.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}
