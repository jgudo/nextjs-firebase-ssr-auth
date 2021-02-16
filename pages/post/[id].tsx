import withAuthServerSideProps from "@/libs/hoc/withAuthServerSide";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { FC } from "react";

const Post: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ data: post }) => {
    return (
        <div>
            <h1>View Post</h1>
            <h4>ID</h4>
            <p>{post.id}</p>
            <h4>Description</h4>
            <p>{post.description}</p>
        </div>
    );
}

export const getServerSideProps = withAuthServerSideProps(
    undefined, //redirect options
    async (ctx: GetServerSidePropsContext, user: any) => { // callback for getting serverSideProps
        const { id } = ctx.query;
        const req = await fetch(`http://localhost:3000/api/post/${id}`);
        const post = await req.json();

        return post.data;
    }
);

export default Post;
