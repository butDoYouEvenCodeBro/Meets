import MeetDeet from "@/components/meetups/MeetDeet";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

export default function MeetupDetail(props) {
  return (
    <>
      <Head>
        <title>Meetup: {props.meetupData.title}</title>
        <meta
          name="description"
          content={props.description}
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://pic.onlinewebfonts.com/thumbnails/icons_454077.svg"></link>
      </Head>
      <MeetDeet
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://vwadhwa:Membermongo@cluster0.hgl4lx4.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://vwadhwa:Membermongo@cluster0.hgl4lx4.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollections = db.collection("meetups");

  const meetup = await meetupCollections.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}
