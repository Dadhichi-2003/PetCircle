import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { Briefcase, Calendar, MapPin, MessageCircle, Star } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ExpertPage = () => {

    const {user}= useSelector(store => store.auth);
    const [experts,setExperts] = useState([]);

    const getAllExpert = async()=>{
        try{

            const res = await axios.get('/user/getAllexpert',{withCredentials:true});

            if(res.data){
                setExperts(res.data.data)
            }

        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getAllExpert();
    },[])

  return (

     <div className="flex justify-center items-center w-200 md:ml-[25%]">
    
        <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Experts</h1>
       
        
    {
        experts?.map((expert)=>{
            return <>
            
             <Card className="overflow-hidden m-5">
        <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={expert.profilePic ||  "/placeholder.svg?height=200&width=200"}
                alt={expert.username}
              />
              <AvatarFallback>{expert?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{expert.username}</CardTitle>
              <CardDescription>{expert.expertise}</CardDescription>
            </div>
          </div>
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Expert
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{expert.bio}</p>

        {expert.location && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{expert.location}</span>
          </div>
        )}

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Briefcase className="h-4 w-4 mr-1" />
          <span>{expert.experience} years experience</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {expert?.services.map((service, index) => (
            <Badge key={index} variant="outline">
              {service}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-medium">{expert.followers.length}</span>
          <span className="mx-1">followers</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" className="w-[48%]">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        
      </CardFooter>
    </Card>
  
            
            </>
        })
    }
       
    
     
    </div>

    </div>

  )
}

export default ExpertPage
