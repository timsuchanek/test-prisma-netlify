import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '../../prisma/generated'
import globby from 'globby'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const files = await globby('**')
  try {
    const prisma = new PrismaClient()
    const data = await prisma.user.findMany()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(files)
  }
}

export default handler
