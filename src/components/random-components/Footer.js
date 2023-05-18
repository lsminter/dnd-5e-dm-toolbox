import Link from 'next/link'

export default function Footer() {
  const todaysYear = new Date().getFullYear();
  return(
    <div className="flex justify-between mt-4 text-white">
      <div className="flex space-x-2">
        <a href="https://github.com/lsminter" className="text-sm items-center text-white">
          Site by Lucas Minter
        </a>
        <div className="text-sm items-center">
          <p>© {todaysYear}</p>
        </div>
      </div>
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