import React, { useEffect } from 'react'
import { Badge } from '../ui/badge'
import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import axios from 'axios'
import { setAllAdoptionReq, setAllSendingAdoptionReq } from '@/redux/adoption/adoptionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const MyAdoptionReq = (  isAdopter = false ) => {

    const {AllSendingReq ,AllAdoptionReq} = useSelector(store => store.adoption);
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    
      
    const getSendingAdoptionReq = async () => {
        try {
          const res = await axios.get(`Adoption/my-requests/${user?._id}`, { withCredentials: true });
          if (res.data) {
            dispatch(setAllSendingAdoptionReq(res.data.requests)); 
          }
        } catch (err) {
          console.log(err);
        }
      }
      console.log(AllSendingReq);
    useEffect(()=>{
        getSendingAdoptionReq();
    },[])

    const getStatusBadge = (status) => {
        switch (status) {
          case "Pending":
            return (
              <Badge variant="outline" className="flex items-center gap-1 bg-blue-400">
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

  const cancelAdoptionReq = async(adoptionId)=>{
    try{
      const res = await axios.delete(`Adoption/${adoptionId}`,{withCredentials:true});
      if(res.data){
        toast.success("request cancelled succesfully");
        const updatedRequests = AllSendingReq.filter(req => req._id !== adoptionId);

        // Update Redux state
        dispatch(setAllSendingAdoptionReq(updatedRequests));

      }
    }catch(err){
      toast.error("can't cancel request")
      console.log(err);
      
    }

  }
  return (
     <>

    
    {AllSendingReq?.map((request)=>{
        return <>

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
          <Link to={`/main/profile/${ request?.ownerId._id}`}>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={ request?.ownerId.profilePic} />
              <AvatarFallback>{ request?.ownerId.username}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{request?.ownerId.username}</p>
              <p className="text-sm text-muted-foreground"> "Pet Owner"</p>
            </div>
          </div>
          </Link>
          <p className="text-sm text-muted-foreground">
            Request submitted on {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
        
        {request.status === "Pending" && (
          <CardFooter>
            <Button onClick = {()=>{cancelAdoptionReq(request._id)}} variant="outline" className="w-full">
              Cancel Request
            </Button>
          </CardFooter>
        )}
      </Card>

        </>
    })}

      

    </>
  


    
  )
}

export default MyAdoptionReq
