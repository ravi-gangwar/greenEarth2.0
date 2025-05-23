"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { clearUser } from "@/store/features/userReducer";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-lg p-8 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col items-center space-y-6">
            <Avatar className="h-32 w-32 border-4 border-blue">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-4xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue mb-2">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="w-full max-w-md space-y-4">
              <div className="p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-blue mb-4">
                  Account Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Status</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
