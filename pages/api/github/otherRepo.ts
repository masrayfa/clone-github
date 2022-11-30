import { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userName } = req.body
  console.log('name repo', name)

  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  })

  const repo = await octokit
    .request(`GET /repos/${userName}/${name}`)
    .then((res) => res.data)

  return res.status(200).json({
    data: repo,
  })
}
