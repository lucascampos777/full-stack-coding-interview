import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  res.json({ message: 'CORS enabled!' });
}