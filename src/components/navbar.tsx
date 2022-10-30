import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const [navigation, setNavigation] = useState(1);
  const navigate = useNavigate();

  const handleNavigation = (id: any) => {
    setNavigation(id);
  };

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="mb-8 py-4 bg-gray-100 md:w-[1080px] mx-auto rounded-lg shadow-lg text-xl px-5 font-medium flex justify-between items-center">
      <div className="flex gap-8">
        <Link
          onClick={() => handleNavigation(1)}
          className={navigation === 1 ? "underline underline-offset-8" : ""}
          to={"/"}
        >
          Home
        </Link>
        {user && (
          <Link
            onClick={() => handleNavigation(2)}
            className={navigation === 2 ? "underline underline-offset-8" : ""}
            to={"/createpost"}
          >
            Create Post
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2">
          {user && (
            <>
              <p className="text-md md:hidden">
                {user?.displayName?.substring(0, 7)}
              </p>
              <p className="text-md hidden md:block font-medium">
                Hi, {user?.displayName?.substring(0, 7)}
              </p>

              <img
                className="rounded-full w-9"
                src={user?.photoURL || ""}
                alt="/"
              />
            </>
          )}
        </div>
        <span className="font-light">|</span>
        {user?.emailVerified ? null : (
          <Link
            className="mt-[2px] bg-gray-600 px-2 h-9 flex items-center rounded-md text-white text-[18px]"
            to={"/login"}
          >
            Login
          </Link>
        )}

        {user && (
          <button
            onClick={signUserOut}
            className="bg-gray-600 px-2 h-9 flex items-center rounded-md text-white text-[18px]"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};
