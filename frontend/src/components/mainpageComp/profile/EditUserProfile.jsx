import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { setAuthUser, setUserProfile } from '@/redux/user/authSlice';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const EditUserProfile = ({ open, setopen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: '',
      location: '',
      bio: '',
      expertise: '',
      experience: '',
      services: '',
      contact: ''
    }
  });

  const dispatch = useDispatch();
  const imageRef = useRef();
  const [profilePic, setProfilePic] = useState(user?.profilePic);

  useEffect(() => {
    // Pre-fill values when user data is available
    if (user) {
      setValue('username', user.username || '');
      setValue('location', user.location || '');
      setValue('bio', user.bio || '');
      if (user.role === 'Expert') {
        setValue('expertise', user.expertise || '');
        setValue('experience', user.experience || '');
        setValue('services', user.services || '');
        setValue('contact', user.contact || '');
      }
    }
  }, [user, setValue]);

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('username', data.username || '');
      formData.append('location', data.location || '');
      formData.append('bio', data.bio || '');

      if (user?.role === 'Expert') {
        formData.append('expertise', data.expertise || '');
        formData.append('experience', data.experience || '');
        formData.append('services', data.services || '');
        formData.append('contact', data.contact || '');
      }
      console.log(profilePic);
      
      if (profilePic ) {
        formData.append('profilePic', profilePic);
      }

      const res = await axios.put(`/upadateownerprofile/${user?._id}`, formData, { withCredentials: true });

      if (res.data) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.profile));
        dispatch(setUserProfile(res.data.profile));
        console.log(user);
        
        setopen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
    }
  };

  return (
    <>
      {open && (
        <div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex flex-col justify-center items-center'>
              <Avatar className='size-30 shadow-2xl my-2 ring-2 ring-gray-600'>
                <AvatarImage src={profilePic ? (typeof profilePic === 'string' ? profilePic : URL.createObjectURL(profilePic)) : user?.profilePic }  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <button type='button' onClick={() => imageRef.current.click()} className='text-blue-600 cursor-pointer border-none'>
                Update profile pic
              </button>
            </div>

            <div className='flex flex-col justify-center items-center my-6 gap-3'>
              <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                <Label>Username</Label>
                <Input type='text' placeholder='Username' {...register('username')} />
              </div>

              <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                <Label>Location</Label>
                <Input type='text' placeholder='Location' {...register('location')} />
              </div>

              <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                <Label>Bio</Label>
                <Textarea className='text-wrap text-sm' placeholder='Your bio' {...register('bio')} />
              </div>

              {user?.role === 'Expert' && (
                <>
                  <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>Expertise</Label>
                    <Input type='text' placeholder='e.g. Dog Training, Vet' {...register('expertise')} />
                  </div>
                  <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>Experience</Label>
                    <Input type='text' placeholder='Years of experience' {...register('experience')} />
                  </div>
                  <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>Services</Label>
                    <Input type='text' placeholder='e.g. Vaccination, Checkup' {...register('services')} />
                  </div>
                  <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                    <Label>Contact Info</Label>
                    <Input type='text' placeholder='Phone or Email' {...register('contact')} />
                  </div>
                </>
              )}

              <input type='file' ref={imageRef} className='hidden' onChange={fileChangeHandler} />

              <div className='flex flex-col gap-2 w-80 justify-center items-center'>
                {loading ? (
                  <Button className='w-full my-2 mx-auto bg-gray-800 rounded-lg p-2 text-gray-100 hover:bg-gray-700'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin text-white' />
                    Please wait
                  </Button>
                ) : (
                  <Button type='submit' variant='secondary'>
                    Update
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUserProfile;
