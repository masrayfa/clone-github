import React from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'

interface Props {
  title: string
}

const Header = ({ title }: Props) => {
  const { data: session } = useSession()
  return (
    <div className="p-4 bg-[#161B22] flex justify-between items-center">
      <h1 className="text-xl text-white font-bold">{title}</h1>
      <li className="flex text-white space-x-4">
        <ul>Repos</ul>
        <ul>Followers</ul>
        <ul>Stars</ul>
        {session ? (
          <ul>
            <button
              className="px-2 py-1 bg-red-800 rounded-lg"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </ul>
        ) : (
          <ul>
            <button
              className="px-2 py-1 bg-green-800 rounded-lg"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </ul>
        )}
      </li>
    </div>
  )
}

export default Header
