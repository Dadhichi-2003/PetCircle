import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/user/authSlice";

const PetProfileForm = () => {

  const dispatch = useDispatch()
 


  
  const { user } = useSelector(store => store.auth)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [profilePic, setProfilePic] = useState("");
  const fileInputRef = useRef(null); // Reference to hidden input

  const getuser = async () => {
    try {
      const res = await axios.get(`/user/${user._id}`, { withCredentials: true });
      dispatch(setAuthUser(res.data.user)); // ✅ Update Redux state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Handle form submission
  const onSubmit =async (data) => {

    const formData = new FormData();
    formData.append("owner", user._id); // ✅ Ensure user ID is added
    formData.append("petname", data.petname);
    formData.append("species", data.species);
    formData.append("breed", data.breed || ""); // Optional fields
    formData.append("age", data.age || "");
    formData.append("medicalHistory", data.medicalHistory || "");
    formData.append("profilePic", data.profilePic); // ✅ Send the file
    
    const res = await axios.post("/pet/addpet",formData,{ withCredentials: true});
    
    if (res){
      toast.success("pet added succesfuly")
    }
    console.log(res.data)
    getuser();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
      setValue("profilePic", file);
    }
  };

  return (
    <div className="max-w-md w-500 mx-auto  bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Add Pet Profile
      </h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-4">
        {/* Avatar & Upload Text Clickable */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => fileInputRef.current.click()} // Trigger hidden input
        >
          <Avatar className="h-24 w-24 border-4 border-gray-200 shadow-md">
            <AvatarImage src={profilePic || ""} alt="Pet Image" />
            <AvatarFallback>🐾</AvatarFallback>
          </Avatar>
          <p className="text-sm text-blue-500 mt-2 font-medium hover:underline">
            Upload Profile Picture
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"

          
          onChange={handleFileChange}
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Label className="text-gray-600 text-sm">Pet Name</Label>
          <Input
            className="mt-1 border-none bg-gray-100 focus:ring border-b-2"
            {...register("petname", { required: "Pet name is required" })}
          />
          {errors.petname && (
            <p className="text-red-500 text-xs">{errors.petname.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600 text-sm">Species</Label>
          <Input
            className="mt-1 bg-gray-100 focus:ring focus:ring-blue-300"
            {...register("species", { required: "Species is required" })}
          />
          {errors.species && (
            <p className="text-red-500 text-xs">{errors.species.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600 text-sm">Breed</Label>
          <Input
            className="mt-1 bg-gray-100 focus:ring focus:ring-blue-300"
            {...register("breed", { required: "Breed is required" })}
          />
          {errors.breed && (
            <p className="text-red-500 text-xs">{errors.breed.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600 text-sm">Age</Label>
          <Input
            type="number"
            className="mt-1 bg-gray-100 focus:ring focus:ring-blue-300"
            {...register("age", { required: "Age is required" })}
          />
          {errors.age && (
            <p className="text-red-500 text-xs">{errors.age.message}</p>
          )}
        </div>

        <div>
          <Label className="text-gray-600 text-sm">Medical History</Label>
          <Textarea
            className="mt-1 bg-gray-100 focus:ring focus:ring-blue-300"
            {...register("medicalHistory")}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition">
          Add  
        </Button>
      </form>
    </div>
  );
};

export default PetProfileForm;
