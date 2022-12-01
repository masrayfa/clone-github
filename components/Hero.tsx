import React, { useEffect, useState, useRef } from 'react'
import ButtonGroup from './ButtonGroup'
import InputGroup from './InputGroup'
import CardRepo from './CardRepo'
import { useSession } from 'next-auth/react'

const Hero = () => {
  const { data: session } = useSession()
  const [repo, setRepo] = useState({})
  const [fullName, setFullName] = useState<string>()
  const [cloneUrl, setCloneUrl] = useState<string>()
  const [watchers, setWatchers] = useState<number>()
  const [downloadUrl, setDownloadUrl] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [language, setLanguage] = useState<string>()
  const [userRepos, setUserRepos] = useState([{}])
  const [isShown, setIsShown] = useState(false)

  const inputRepoNameRef = useRef()
  const inputUserNameRef = useRef()
  const inputUserNameReposRef = useRef()

  const handleSubmitDetailRepo = async (e: any) => {
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
    // console.log(detailRepo)
    // set all repo state from result of detailRepo function
    setIsShown(true)
    setFullName(detailRepo.data.full_name)
    setDescription(detailRepo.data.description)
    setCloneUrl(detailRepo.data.clone_url)
    setDownloadUrl(detailRepo.data.downloads_url)
    setWatchers(detailRepo.data.watchers)
    setLanguage(detailRepo.data.language)
  }

  const handleSubmitUserRepos = async (e: any) => {
    e.preventDefault()
    // @ts-ignore
    const userRepos = await fetch('/api/github/repos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // @ts-ignore
        username: inputUserNameReposRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log('result', result.data)
        setUserRepos(result.data)
        return result.data
      })
    // console.log('userrepos', userRepos)
    // set all repo state from result of detailRepo function
    setUserRepos(userRepos.name)
  }

  function renderRepos(repo: any, index: any) {
    return (
      <div key={index}>
        <h2 className="text-white">{repo.name}</h2>
      </div>
    )
  }

  return (
    <div className="p-5 space-y-7">
      {session ? (
        <div className="flex items-center space-x-5">
          <img className="rounded-full w-10 h-10" src={session.user?.image!} />
          <h1 className="text-2xl">Welcome {session?.user?.name}</h1>
        </div>
      ) : null}
      <div className="border-white border-2 rounded-xl space-y-3 md:grid md:grid-rows-2 justify-items-center">
        <h1 className="text-4xl font-bold text-white text-center p-5">
          Search Other Github repo
        </h1>
        <form onSubmit={handleSubmitDetailRepo}>
          <div className="md:flex p-3">
            <InputGroup
              refer={inputUserNameRef}
              placeholder="Search username"
              className="md:rounded-l-lg w-full rounded-t-lg md:rounded-tr-none"
            />
            <InputGroup
              refer={inputRepoNameRef}
              placeholder="Search repo"
              className="w-full"
            />
            <ButtonGroup className="md:rounded-l-none rounded-t-none w-full md:w-10 md:rounded-r-lg" />
          </div>
        </form>
      </div>
      <form onSubmit={handleSubmitUserRepos}>
        <div className="flex">
          <InputGroup
            refer={inputUserNameReposRef}
            placeholder="Search username repos"
            className="rounded-l-lg"
          />
          <ButtonGroup className="md:rounded-l-none" />
        </div>
      </form>
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
      {userRepos ? userRepos.map(renderRepos) : null}
    </div>
  )
}

export default Hero
