import InforBoxes from "@/components/InforBoxes";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";

export const metadata = {
  title: 'Homepage',
  description: 'This is the home page',
};

export default function Homepage() {
  return (
    <>
     <Hero/>
     <InforBoxes/>
     <HomeProperties/>
    </>
  );
};