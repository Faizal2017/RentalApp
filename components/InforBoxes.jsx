import React from "react";
import Link from "next/link";
import InfoBox from "./InfoBox";

const InforBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
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
        </div>
      </div>
    </section>
  );
};

export default InforBoxes;
