import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PawPrint, Clock, CheckCircle, XCircle } from "lucide-react"

export default function AdoptionsPage() {
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
            {availablePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {myAdoptionRequests.map((request) => (
              <AdoptionRequestCard key={request.id} request={request} isAdopter={true} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mypets" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {myPetsWithRequests.map((item) => (
              <div key={item.pet.id} className="space-y-4">
                <PetCard pet={item.pet} isOwner={true} />

                {item.requests.length > 0 && (
                  <div className="ml-6 space-y-4">
                    <h3 className="text-lg font-medium">Adoption Requests</h3>
                    {item.requests.map((request) => (
                      <AdoptionRequestCard key={request.id} request={request} isOwner={true} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  )
}

function PetCard({ pet, isOwner = false }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={pet.profilePic || "/placeholder.svg?height=300&width=300"}
          alt={pet.petname}
          className="object-cover w-full h-full"
        />
        {pet.adoptionStatus && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive">Adoption Pending</Badge>
          </div>
        )}
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
        {!isOwner && (
          <Button variant='secondary' className="w-full" disabled={pet.adoptionStatus}>
            {pet.adoptionStatus ? "Adoption In Progress" : "Request Adoption"}
          </Button>
        )}
        {isOwner && (
          <Button variant="outline" className="w-full">
            Edit Pet Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function AdoptionRequestCard({ request, isOwner = false, isAdopter = false }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Approved
          </Badge>
        )
      case "Rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
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
            <CardTitle>{request.pet.petname}</CardTitle>
            <CardDescription>
              {request.pet.breed} {request.pet.species}, {request.pet.age} years old
            </CardDescription>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={isOwner ? request.adopter.profilePic : request.owner.profilePic} />
            <AvatarFallback>{isOwner ? request.adopter.name.charAt(0) : request.owner.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{isOwner ? request.adopter.name : request.owner.name}</p>
            <p className="text-sm text-muted-foreground">{isOwner ? "Potential Adopter" : "Pet Owner"}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Request submitted on {new Date(request.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      {isOwner && request.status === "Pending" && (
        <CardFooter className="flex gap-2">
          <Button className="flex-1" variant="default">
            Approve
          </Button>
          <Button className="flex-1" variant="destructive">
            Reject
          </Button>
        </CardFooter>
      )}
      {isAdopter && request.status === "Pending" && (
        <CardFooter>
          <Button variant="outline" className="w-full">
            Cancel Request
          </Button>
        </CardFooter>
      )}
    </Card>
    
    </>
  )
}

// Sample data for demonstration
const availablePets = [
  {
    id: "1",
    petname: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 3,
    profilePic: "/placeholder.svg?height=300&width=300",
    medicalHistory: ["Vaccinated", "Neutered"],
    adoptionStatus: false,
  },
  {
    id: "2",
    petname: "Bella",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    profilePic: "/placeholder.svg?height=300&width=300",
    medicalHistory: ["Vaccinated", "Spayed", "Treated for ear mites"],
    adoptionStatus: true,
  },
  {
    id: "3",
    petname: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: 4,
    profilePic: "/placeholder.svg?height=300&width=300",
    medicalHistory: ["Vaccinated", "Neutered", "Hip dysplasia treatment"],
    adoptionStatus: false,
  },
]

const myAdoptionRequests = [
  {
    id: "1",
    pet: {
      id: "2",
      petname: "Bella",
      species: "Cat",
      breed: "Siamese",
      age: 2,
    },
    owner: {
      id: "101",
      name: "John Doe",
      profilePic: "/placeholder.svg?height=50&width=50",
    },
    status: "Pending",
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    pet: {
      id: "4",
      petname: "Charlie",
      species: "Dog",
      breed: "Beagle",
      age: 1,
    },
    owner: {
      id: "102",
      name: "Jane Smith",
      profilePic: "/placeholder.svg?height=50&width=50",
    },
    status: "Approved",
    createdAt: "2023-04-10T14:20:00Z",
  },
  {
    id: "3",
    pet: {
      id: "5",
      petname: "Luna",
      species: "Cat",
      breed: "Maine Coon",
      age: 3,
    },
    owner: {
      id: "103",
      name: "Mike Johnson",
      profilePic: "/placeholder.svg?height=50&width=50",
    },
    status: "Rejected",
    createdAt: "2023-04-05T09:15:00Z",
  },
]

const myPetsWithRequests = [
  {
    pet: {
      id: "6",
      petname: "Cooper",
      species: "Dog",
      breed: "Labrador",
      age: 2,
      profilePic: "/placeholder.svg?height=300&width=300",
      medicalHistory: ["Vaccinated", "Neutered"],
      adoptionStatus: true,
    },
    requests: [
      {
        id: "4",
        pet: {
          id: "6",
          petname: "Cooper",
          species: "Dog",
          breed: "Labrador",
          age: 2,
        },
        adopter: {
          id: "201",
          name: "Sarah Williams",
          profilePic: "/placeholder.svg?height=50&width=50",
        },
        status: "Pending",
        createdAt: "2023-04-18T11:45:00Z",
      },
      {
        id: "5",
        pet: {
          id: "6",
          petname: "Cooper",
          species: "Dog",
          breed: "Labrador",
          age: 2,
        },
        adopter: {
          id: "202",
          name: "David Brown",
          profilePic: "/placeholder.svg?height=50&width=50",
        },
        status: "Pending",
        createdAt: "2023-04-17T16:30:00Z",
      },
    ],
  },
  {
    pet: {
      id: "7",
      petname: "Milo",
      species: "Cat",
      breed: "Persian",
      age: 4,
      profilePic: "/placeholder.svg?height=300&width=300",
      medicalHistory: ["Vaccinated", "Dental cleaning"],
      adoptionStatus: false,
    },
    requests: [],
  },
]

