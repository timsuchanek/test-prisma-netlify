import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import globby from 'globby'
import path from 'path'

path.join(
  process.cwd(),
  './src/node_modules/.prisma/client/query-engine-rhel-openssl-1.0.x',
)
path.join(
  process.cwd(),
  './node_modules/.prisma/client/query-engine-rhel-openssl-1.0.x',
)

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const files = await globby('**')
  try {
    const prisma = new PrismaClient()
    const data = await prisma.user.findMany()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ err: err.stack, files })
  }
}

export default handler
