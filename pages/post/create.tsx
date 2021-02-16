import withAuthServerSideProps from "libs/hoc/withAuthServerSide";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const CreatePost: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = () => {
    const [description, setDescription] = useState('');
    const router = useRouter();

    const onCreate = async () => {
        try {
            const req = await fetch(`/api/post`, {
                body: JSON.stringify({ description }),
                method: 'POST'
            });
            const post = await req.json();

            router.push(`/post/${post?.data.id}`);
            console.log(post)
        } catch (e) {
            console.log(e);
        }
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    return (
        <div>
            <h1>Create Post</h1>
            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={onDescriptionChange}
            />
            <button onClick={onCreate}>Submit</button>
        </div>
    );
}

export const getServerSideProps = withAuthServerSideProps();

export default CreatePost;