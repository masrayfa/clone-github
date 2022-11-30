import React from 'react'
import { CardProps } from '../constants/types'
import { FiEye } from 'react-icons/fi'

const CardRepo = ({
  description,
  full_name,
  clone_url,
  watchers,
  downloads_url,
  language,
}: CardProps) => {
  return (
    <div className="rounded-xl bd-red-800 w-max border border-white/30">
      <div className="bg-[#161B22] rounded-t-xl p-5 flex justify-between space-x-5 ">
        <h2 className="text-xl text-[#165DDB]">
          {full_name ? full_name : 'Full name not found'}
        </h2>
        <a
          href={clone_url}
          className="bg-green-800 rounded-lg w-24 p-1 text-center font-bold cursor-pointer"
        >
          Clone
        </a>
      </div>
      <div className="bg-[#0D1117] p-5 rounded-b-xl space-y-3">
        <p className="text-lg max-w-sm">
          {description ? description : 'Description repo not found'}
        </p>
        <div className="flex justify-between">
          <div className="flex space-x-5 items-center">
            <p className="text-slate-400 text-md">{language}</p>
            <div className="text-slate-400 flex items-center space-x-1">
              <FiEye />
              <p>{watchers}</p>
            </div>
          </div>
          <a href={downloads_url} className="underline text-sm text-green-600">
            download file
          </a>
        </div>
      </div>
    </div>
  )
}

export default CardRepo
