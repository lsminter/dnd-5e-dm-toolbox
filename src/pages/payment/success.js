import router from 'next/router';
import Link from 'next/link';

const timeout = setTimeout(() => {
  router.push('/profile')
}, 5000);

timeout;

const Success = () => {
  return (
    <div>
      <h1>Payment Success</h1>
      <h3>You will be redirected to your profile in 5 seconds.</h3>
      <h3>If not, click <Link href="/profile">here</Link>.</h3>
    </div>
  )
}

export default Success;