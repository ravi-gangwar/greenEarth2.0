"use client"
import React from 'react';
import { trpc } from '../_trpc/client';

function Plants() {
  // Fetch data using tRPC
  const { data, isLoading, isError, refetch, isFetching } = trpc.treeRoutes.getTodos.useQuery();

  // Handling loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className='min-h-screen w-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]'>
      <h1 className='text-center text-3xl font-bold'>Plants List</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {data?.map((plant, index) => (
          <div key={index} className='max-w-sm p-4 border rounded-lg shadow-md bg-white'>
            <img src={plant.imageUrl} alt={plant.name} className='w-full h-48 object-cover rounded-md' />
            <h2 className='text-xl font-semibold mt-2'>{plant.name}</h2>
            <p className='text-gray-600'>Category: {plant.category}</p>
            <p className='text-green-600 font-bold'>Price: ${plant.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plants;
