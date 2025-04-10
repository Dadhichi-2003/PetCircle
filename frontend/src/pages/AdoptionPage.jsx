import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PawPrint, Clock, CheckCircle, XCircle } from "lucide-react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setAdoptionPet, setAllAdoptionReq, setAllSendingAdoptionReq } from '../redux/adoption/adoptionSlice'
import { toast } from "sonner"
import PetCard from "@/components/adoptionComp/PetCard"
import MyAdoptionReq from "@/components/adoptionComp/MyAdoptionReq"


export default function AdoptionsPage() {

  const dispatch = useDispatch();
  const { AdoptionPets, AllAdoptionReq, AllSendingReq } = useSelector(store => store.adoption);
  const { user } = useSelector(store => store.auth);


  const getAllAvailablePets = async () => {
    try {

      const res = await axios.get('/Adoption/by-adoption-status?adoptionStatus=true', { withCredentials: true });
      if (res.data) {
        dispatch(setAdoptionPet(res.data.pets));
      }

    } catch (err) {
      console.log(err);

    }
  }

 

  const getAllAdoptionrequest = async () => {
    try {

      const res = await axios.get(`Adoption/requests-by-my-pets/${user._id}`, { withCredentials: true });
      if (res.data) {
        dispatch(setAllAdoptionReq(res.data.requestsByPet))
        console.log(res.data.requestsByPet);

      }

    } catch (err) {
      console.log(err);

    }
  }

  const handleAdoptionRequest = async (adoptionReqId, status) => {
    try {

      const res = await axios.post('Adoption/update-status', { adoptionReqId, status }, { withCredentials: true });
      if (res.data) {
        toast.success(`Request ${status.toLowerCase()} successfully`);

        const updatedRequests = AllAdoptionReq.map((req) =>
          req._id === adoptionReqId ? { ...req, status } : req
        );

        

        dispatch(setAllAdoptionReq(updatedRequests));
        dispatch(setAllSendingAdoptionReq(updatedRequests));
      }

    } catch (err) {
      console.log(err);
    }
  }

  const groupedRequests = AllAdoptionReq.reduce((acc, req) => {
    const petId = req.petId._id;

    // Only add pet once
    if (!acc[petId]) {
      acc[petId] = { pet: req.petId, requests: [] };
    }

    // Prevent adding the same request twice
    const alreadyExists = acc[petId].requests.find(r => r._id === req._id);
    if (!alreadyExists) {
      acc[petId].requests.push(req);
    }

    return acc;
  }, {});

  useEffect(() => {
    getAllAvailablePets();
    getAllAdoptionrequest();
 
  }, [])
  return (
    <div className="flex justify-center items-center w-200">

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Pet Adoptions</h1>

        <Tabs defaultValue="available">
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Pets</TabsTrigger>
            <TabsTrigger value="requests">My Adoption Requests</TabsTrigger>
            <TabsTrigger value="mypets">My Pets</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AdoptionPets?.map((pet) => (
                <>
                  
                  {!(user._id === pet.owner) && <PetCard key={pet._id} pet={pet}  />}

                </>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              
                <MyAdoptionReq  />
              
            </div>
          </TabsContent>

          <TabsContent value="mypets" className="space-y-6">
            {Object.values(groupedRequests).map(({ pet, requests }) => (
              <div key={pet._id} className="space-y-4">
                <Petcard pet={pet} isOwner={true} />
                {requests.length > 0 && (
                  <div className="ml-6 space-y-4">
                    <h3 className="text-lg font-medium">Adoption Requests</h3>
                    {requests.map((request) => (
                      <AdoptionRequestCard
                        key={request._id}
                        request={request}
                        isOwner={true}
                        handleAdoptionRequest={handleAdoptionRequest}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Petcard({ pet, isOwner = false, requestAdoption ,value }) {
  return (
    <Card className="overflow-hidden">
      <div className=" relative">
        <img
          src={pet?.profilePic}
          alt={pet?.petname}
          className={`object-cover w-full md:h-69 h-full `}
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {pet.petname}
          <PawPrint className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
        <CardDescription>
          {pet.breed} {pet.species}, {pet.age} years old
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-medium">Medical History:</h4>
          {pet.medicalHistory && pet.medicalHistory.length > 0 ? (
            <ul className="list-disc pl-5 text-sm">
              {pet.medicalHistory.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No medical records available</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        
        {isOwner && (
          <Button variant="outline" className="w-full"> {/* ani uper navigate krin pet profile pr moklvanu 6 */ }
            Edit Pet Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function AdoptionRequestCard({ request, isOwner = false, handleAdoptionRequest }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-500">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="success" className="flex items-center gap-1 bg-violet-500">
            <CheckCircle className="h-3 w-3" /> Approved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-400">
            <XCircle className="h-3 w-3" /> Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <>

      <Card >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{request?.petId.petname}</CardTitle>
              <CardDescription>
                {request.petId.breed} {request.petId.species}, {request.petId.age} years old
              </CardDescription>
            </div>
            {getStatusBadge(request.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={ request?.adopterId.profilePic } />
              <AvatarFallback>{request?.adopterId.username }</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{request?.adopterId.username }</p>
              <p className="text-sm text-muted-foreground">Potential Adopter</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Request submitted on {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
        {isOwner && request.status === "Pending" && (
          <CardFooter className="flex gap-2">
            <Button onClick={() => { handleAdoptionRequest(request._id, 'Approved') }} className="flex-1" variant="secondary">
              Approve
            </Button>
            <Button onClick={() => { handleAdoptionRequest(request._id, 'Rejected') }} className="flex-1 bg-red-500 hover:bg-red-700" variant="secondary">
              Reject
            </Button>
          </CardFooter>
        )}
       
      </Card>

    </>
  )
}
