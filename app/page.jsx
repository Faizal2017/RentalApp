import InforBoxes from "@/components/InforBoxes";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import { connectDB } from "@/config/database";

export const metadata = {
  title: 'Homepage',
  description: 'This is the home page',
};

const  Homepage = async ()=> {
  // Connect to the database
  await connectDB();

  return (
    <>
     <Hero/>
     <InforBoxes/>
     <HomeProperties/>
    </>
  );
};

export default Homepage;