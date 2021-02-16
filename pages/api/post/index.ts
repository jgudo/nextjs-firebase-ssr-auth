import firebaseAdmin from "@/utils/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { description } = JSON.parse(req.body);
            console.log(req.cookies)

            const post = await firebaseAdmin
                .firestore()
                .collection('posts')
                .add({ description })
            return res.json({ data: { description, id: post.id } });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
}