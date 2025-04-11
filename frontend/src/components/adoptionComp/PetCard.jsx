import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { PawPrint } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setAllAdoptionReq, setAllSendingAdoptionReq } from '@/redux/adoption/adoptionSlice'
import { Link } from 'react-router-dom'

const PetCard = ({ pet, isOwner = false }) => {

    const dispatch = useDispatch();
    const{user} = useSelector(store => store.auth);
    const {AllSendingReq,AllAdoptionReq} = useSelector(store =>store.adoption)
    
    const requestAdoption = async (petId) => {

        try {
    
          const adopterId = user._id
    
          const res = await axios.post('Adoption/request-adoption', { petId, adopterId }, { withCredentials: true });
          if (res) {
            toast.success('request sent suucesfully');
            dispatch(setAllSendingAdoptionReq([...AllSendingReq, res.data.adoptionRequest]));
            // dispatch(setAllAdoptionReq([...AllAdoptionReq , res.data.adoptionRequest]))
            console.log(res.data);
    
          }
    
        } catch (err) {
    
          toast.error(err?.response?.data.message)
          console.log(err);
    
        }
    
      }
  return (
    <div>
      <Card className="overflow-hidden">
      <Link to={`/main/profile/${pet?.owner}`}>
      <div className="aspect-square relative">
        <img
          src={pet?.profilePic}
          alt={pet?.petname}
          className={`object-cover w-full h-69`}
        />
        {pet.adoptionStatus && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive">Available for Adoption</Badge>
          </div>
        )}
      </div>
      </Link>
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
          <Button onClick={() => { requestAdoption(pet._id) }} variant='secondary' className="w-full" disabled={!pet.adoptionStatus} >
            {pet.adoptionStatus ? "Request Adoption" : "Already Adopted"}
          </Button>
        )}
       
      </CardFooter>
    </Card>
    </div>
  )
}

export default PetCard
