'use client';

import Link from 'next/link';
import{useRouter, useSearchParams, useParams} from 'next/navigation';

const Propertiespage = () => {

  const router = useRouter();
  const {id} = useParams();
  const query = useSearchParams();
  const name = query.get('name');

    return (
    <div className="p-2"><h1 className=" text-3xl text-red-500">This is Property</h1>
    <button onClick={()=> router.push('/')} className="bg-red-400">Clickme</button>
    <h1> HEllo {id}</h1>
</div>
  )
}

export default Propertiespage