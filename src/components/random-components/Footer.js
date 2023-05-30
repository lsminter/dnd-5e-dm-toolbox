import Link from 'next/link'

export default function Footer() {
  const todaysYear = new Date().getFullYear();
  return(
    <div className="flex justify-between mt-4 text-white p-2">
      <a href="https://github.com/lsminter" className="flex space-x-2 text-sm items-center text-white">
        <p>Site by Lucas Minter</p>
        <p>© {todaysYear}</p>
      </a>
      <div className="flex space-x-2">
      <Link href={'/terms-and-conditions'}>
        Terms and Conditions
      </Link>
      <Link href={'/privacy-policy'}>
        Privacy Policy
      </Link>
      </div>
    </div>
  )
}