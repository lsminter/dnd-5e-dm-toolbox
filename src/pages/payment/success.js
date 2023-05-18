import router from 'next/router';
import Link from 'next/link';


const Success = () => {
  return (
    <div>
      <h1>Payment Success</h1>
      <h3>Click <Link href="/profile">HERE</Link> to be redirected to your profile.</h3>
    </div>
  )
}

export default Success;