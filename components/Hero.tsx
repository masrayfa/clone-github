import React, { useEffect, useState, useRef } from 'react'
import ButtonGroup from './ButtonGroup'
import InputGroup from './InputGroup'
import CardRepo from './CardRepo'
import { useSession } from 'next-auth/react'

const Hero = () => {
  const { data: session } = useSession()
  const [repo, setRepo] = useState<string>()
  const [fullName, setFullName] = useState<string>()
  const [cloneUrl, setCloneUrl] = useState<string>()
  const [watchers, setWatchers] = useState<number>()
  const [downloadUrl, setDownloadUrl] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [language, setLanguage] = useState<string>()
  const [isShown, setIsShown] = useState(false)

  const inputRepoNameRef = useRef()
  const inputUserNameRef = useRef()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // @ts-ignore
    // console.log(inputRepoNameRef.current.value)
    const detailRepo = await fetch('/api/github/otherRepo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // @ts-ignore
        name: inputRepoNameRef.current.value,
        // @ts-ignore
        userName: inputUserNameRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => result)
    console.log(detailRepo)
    // set all repo state from result of detailRepo function
    setIsShown(true)
    setFullName(detailRepo.data.full_name)
    setDescription(detailRepo.data.description)
    setCloneUrl(detailRepo.data.clone_url)
    setDownloadUrl(detailRepo.data.downloads_url)
    setWatchers(detailRepo.data.watchers)
    setLanguage(detailRepo.data.language)
  }

  return (
    <div className="p-5 space-y-7">
      {session ? <h1 className="text-2xl">Welcome {session?.user?.name}</h1> : null}
      <div className="border-white border-2 rounded-xl space-y-3 grid grid-rows-2 justify-items-center">
        <h1 className="text-4xl font-bold text-white text-center p-5">
          Search Other Github repo
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex p-3">
            <InputGroup
              refer={inputUserNameRef}
              placeholder="Search username"
              className="rounded-l-lg"
            ></InputGroup>
            <InputGroup
              refer={inputRepoNameRef}
              placeholder="Search repo"
            ></InputGroup>
            <ButtonGroup />
          </div>
        </form>
      </div>
      {isShown ? (
        <CardRepo
          full_name={fullName!}
          clone_url={cloneUrl!}
          downloads_url={downloadUrl!}
          language={language!}
          description={description!}
          watchers={watchers!}
        />
      ) : null}
    </div>
  )
}

export default Hero
