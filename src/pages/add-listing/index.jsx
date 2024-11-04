import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "@/Shared/carDetails.json";
import InputField from "./components/InputField";
import DropDownField from "./components/DropDownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import features from "@/Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Footer from "@/components/Footer";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";

const AddListing = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState();
  const { user } = useUser();

  const navigate = useNavigate();
  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode == "edit" && recordId) {
      getListingDetails();
    }
  }, []);

  const getListingDetails = async () => {
    const res = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));

    const response = Service.FormatResult(res);
    setCarInfo(response[0]);
    setFormData(response[0]);
    setFeaturesData(response[0]?.features);
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    toast({
      title: "Submitting",
      description: "Please wait while we submit your data",
    });

    if (mode == "edit") {
      const res = await db
        .update(CarListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAdress?.emailAdress,
          postedOn: new Date().toISOString(),
        })
        .where(eq(CarListing.id, recordId));
      setLoader(false);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      try {
        const res = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAdress?.emailAdress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            postedOn: new Date().toISOString(),
          })
          .returning({ id: CarListing.id });

        if (res) {
          console.log("Data inserted successfully");
          setTriggerUploadImages(res[0]?.id);
          setLoader(false);
        }
      } catch (error) {
        console.log("error => ", error);
      }
    }
  };

  // const uploadImages =()=>{

  // }

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* car details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    <IconField icon={item?.icon} />
                    {item?.label}{" "}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropDownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* features */}
          <div>
            <h2 className="font-md text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeaturesChange(item.name, value)
                    }
                    checked={featuresData?.[item?.name]}
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* car images */}
          <Separator className="my-6" />
          <UploadImages
            mode={mode}
            carInfo={carInfo}
            triggerUploadImages={triggerUploadImages}
            setLoader={(v) => {
              setLoader(v);
            }}
          />

          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {loader ? (
                <BiLoaderAlt className="animate-spin text-lg" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddListing;
