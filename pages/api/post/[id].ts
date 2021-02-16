import firebaseAdmin from "@/utils/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = req.query;

        const post = await firebaseAdmin
            .firestore()
            .collection('posts')
            .doc(id as string)
            .get()

        if (post) {
            return res.json({
                data: { ...post.data(), id: post.id }
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
}