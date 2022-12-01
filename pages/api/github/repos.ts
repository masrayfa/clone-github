import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, username } = req.body

  console.log('disid', id)

  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  // const username: string = 'masrayfa'

  const repos = await octokit
    .request(`GET /users/${username}/repos`)
    .then((res) => res.data)

  // const reposByI: = await octokit
  //   .request(`GET /`)
  //   .then((res) => res.data)

  return res.status(200).json({
    data: repos,
  })
}
