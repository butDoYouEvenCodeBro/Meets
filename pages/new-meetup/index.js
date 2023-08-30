import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";

export default function NewMeetup() {
  const router = useRouter();
  const addMeetupHandler = async (enteredData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enteredData),
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Create a new meetup!</title>
        <meta
          name="description"
          content="Create a new meetup and explore opportunities"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://pic.onlinewebfonts.com/thumbnails/icons_454077.svg"></link>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
