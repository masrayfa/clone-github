import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body

  console.log('disid', id)

  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  const repos = await octokit
    .request(`GET /user/73578698/repos`)
    .then((res) => res.data)

  // const data = await fetch(`https://api.github.com/user/${id}/repos`).then(
  //   (res) => res.json()
  // )

  return res.status(200).json({
    data: repos,
  })
}
