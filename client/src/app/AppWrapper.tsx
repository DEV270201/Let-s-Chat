"use client";
import React from 'react';
import Navbar from "@/app/(components)/Navbar";
import { Toaster } from 'react-hot-toast';


const AppLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={`flex text-gray-900 w-full h-screen bg-deepblack`}>
      <main className={`flex flex-col w-full py-7 px-9`}>
         <Navbar />
         {children}
      </main>
      </div>
  )
}

const AppWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <AppLayout>
    {
      children
    }
    <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 4000 }} />
    </AppLayout>
  )
}

export default AppWrapper;