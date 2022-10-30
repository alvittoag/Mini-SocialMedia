import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="mb-8 py-4 bg-gray-100 md:w-[1080px] mx-auto rounded-lg shadow-lg text-xl px-3 font-medium">
      <h1 className="text-center">Sign In With Google To Continue</h1>
      <div className="flex">
        <button
          onClick={signInWithGoogle}
          className="bg-gray-200 mx-auto px-3 py-1 mt-5 rounded-lg text-md ring-1 ring-gray-600"
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
};
