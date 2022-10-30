import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getPosts();
    setIsLoading(true);
  }, []);

  return (
    <div className="mb-8 py-4 bg-gray-100 lg:w-[1080px] mx-auto rounded-lg shadow-lg text-xl px-3 font-medium py ">
      <h1 className="text-center text-2xl">Timeline</h1>
      {isLoading ? <h1 className="text-center mt-10">Loading...</h1> : null}
      <div className="mt-12 md:px-24">
        {postsList?.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};
