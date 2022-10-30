import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

interface createFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });

  const [isdone, setIsdone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createFormData>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data: createFormData) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });

    setIsdone(true);
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      {isdone && (
        <div className="bg-green-500 w-56 rounded-xl mx-auto mt-5 text-center py-3 text-white ease-in-out duration-1000">
          <div
            className="bg-red-600 w-[31px] items-center py-1 rounded-full -mt-4 mx-52  hover:cursor-pointer"
            onClick={() => setIsdone(false)}
          >
            <p className="text-sm  text-center">X</p>
          </div>

          <p className="-mt-3">Your post is complete</p>
        </div>
      )}

      <div className="flex mt-6 flex-col gap-5">
        <p className="italic text-red-600  animate-bounce">
          {errors.title && <span>* You must add a title!!!</span>}
        </p>
        <input
          className="-mt-4 mb-4 px-3 py-2 rounded-md ring-1 ring-gray-300"
          placeholder="Title..."
          {...register("title")}
        />
        <p className="italic text-red-600  animate-bounce">
          {errors.description && <span>* You must add a description!!!</span>}
        </p>
        <textarea
          className="-mt-4 mb-4 h-24 px-3 rounded-none ring-1 ring-gray-300"
          placeholder="Description..."
          {...register("description")}
        />
        <input className="bg-gray-200 w-full py-2 rounded-md" type="submit" />
      </div>
    </form>
  );
};
