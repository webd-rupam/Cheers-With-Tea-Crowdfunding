import React from 'react';
import PaymentPage from '@/components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDb';
import User from '../models/User';

const Page = async ({params}) => {
    // showing 404 page if user is not there in the database
    const checkUser = async () => {

      await connectDB()
      let u = await User.findOne({username: params.username})
      
      if(!u) {
        return notFound()
      }
    }

   await checkUser()

      return (
        <>
      <PaymentPage username={params.username}/>
    </>
  );
}


export default Page;


export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Cheers with Tea`,
  }
}