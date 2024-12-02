import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

   
const Dashboard =async()=> {
    const session = await getServerSession(authOptions);
    console.log(session);
  return (
      <div> 
          <div><Link href='/'>Home</Link></div>
          <h1>Welcome to dashboard</h1>
          <p>{session?.user?.name}</p>
      </div>
  );
}

export default Dashboard;