'use client';

import { useParams,useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link'
import React from 'react'

const page = () => {

  const router = useRouter();
  const {id} = useParams();
  const query = useSearchParams();
  

  const name = query.get('name');
  return (
     <div><h1>welcome to {id} and name is {name}</h1>
          <button onClick={()=>{ router.push('/')}}>Home pqge</button>
</div>
  )
}

export default page