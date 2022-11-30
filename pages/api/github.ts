import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'
import { useSession } from 'next-auth/react'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: session } = useSession()
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  // @ts-ignore
  const user = await octokit.request(`/user/${session?.user.id}`)
  console.log(user)

  const followers = await octokit.request(
    '/users/masrayfa/followers?per_page=100'
  )
  const count = followers.data.length
  console.log('count', count)

  const repos = await octokit.request('/users/masrayfa/repos')

  const starred = await octokit.request('/users/masrayfa/starred')

  return res.json({
    data: {
      followers,
      repos,
      starred,
    },
  })
}
