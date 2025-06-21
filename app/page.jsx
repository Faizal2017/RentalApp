import Link from "next/link";

export const metadata = {
  title: 'Homepage',
  description: 'This is the home page',
};

export default function Homepage() {
  return (
    <div>
      <h1 className="text-red-500">This is home page</h1>
      <Link className="text-3xl text-blue-500" href="/properties/id">Go to properties</Link>
    </div>
  );
};