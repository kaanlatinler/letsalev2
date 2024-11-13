import { Button } from "@/components/ui/button";
import Service from "@/Shared/Service";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const OwnersDetail = ({ carDetail }) => {
  const { user } = useUser();
  const navigation = useNavigate();

  const onMessageClick = async () => {
    const ownerId = carDetail?.createdBy.split("@")[0];
    const id = (user.primaryEmailAddress?.emailAddress).split("@")[0];

    try {
      await Service.CreateSendBirdUser(id, user?.fullName, user?.imageUrl).then(
        (response) => {
          console.log(response);
        }
      );
    } catch (error) {
      console.log(error);
    }

    try {
      await Service.CreateSendBirdUser(
        ownerId,
        carDetail?.userName,
        carDetail?.imageUrl
      ).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await Service.CreateSendBirdChannel(
        [id, ownerId],
        carDetail?.listingTitle
      ).then((response) => {
        console.log(response);
        navigation("/profile");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl mb-3">Owner / Deals Details</h2>
      <img
        src={carDetail?.userImageUrl}
        className="w-[100px] h-[100px] object-cover rounded-full"
      />
      <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
      <h2 className="mt-2 text-gray-500">{carDetail?.createdBy}</h2>

      <Button onClick={onMessageClick} className="w-full mt-6">
        Message Owner
      </Button>
    </div>
  );
};

export default OwnersDetail;
