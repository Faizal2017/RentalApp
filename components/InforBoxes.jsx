import React from "react";
import Link from "next/link";
import InfoBox from "./InfoBox";
import { BackgroundGradient } from "./UI/background-gradient";

const InforBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <BackgroundGradient >
            <InfoBox
              heading="For Renters"
              backgroundColor="bg-gray-100"
              buttonInfo={{
                text: "Browse properties",
                backgroundColor: "bg-black",
                link: "/properties",
              }}
            >
              Find your Dream rental property.Bookmark properties and contact
              owners
            </InfoBox>
          </BackgroundGradient>
          <BackgroundGradient >

          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Add properties",
              backgroundColor: "bg-blue-500",
              link: "/roperties/add",
            }}
          >
            Find your Dream rental property.Bookmark properties and contact
            owners
          </InfoBox>
                    </ BackgroundGradient >

        </div>
      </div>
    </section>
  );
};

export default InforBoxes;
