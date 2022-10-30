import { CreateForm } from "./create-form";

export const CreatePost = () => {
  return (
    <div className="mb-8 py-4 bg-gray-100 md:w-[1080px] mx-auto rounded-lg shadow-lg text-xl px-3 font-medium py">
      <h1 className="text-center">Create Post</h1>
      <div>
        <CreateForm />
      </div>
    </div>
  );
};
