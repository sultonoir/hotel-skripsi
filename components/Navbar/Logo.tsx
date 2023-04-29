import Image from "next/image"

const Logo = () => {
  return (
    <div className="avatar">
      <div className="w-7">
        <Image
          width={40}
          height={40}
          src="/logo.svg"
          alt="Logo"
          className="rounded-full"
        />
      </div>
    </div>
  )
}

export default Logo
