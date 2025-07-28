import { UserX, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BannedUser } from "./Admintypes";



  const mockBannedUsers: BannedUser[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@gmail.com',
      reason: 'Multiple violations of community guidelines',
      bannedDate: '2024-02-15',
      status: 'permanent',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@gmail.com',
      reason: 'Suspicious activity detected',
      bannedDate: '2024-02-14',
      status: 'temporary',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@gmail.com',
      reason: 'Repeated harassment reports',
      bannedDate: '2024-02-13',
      status: 'permanent',
    },
  ];

  // const mockBannedUsers: BannedUser[] = Array.from({length:4}, (_, i)=>({
  //   id: `1 ${i + 1}`,
  //   name:[
  //     "Kristin Watson", "Jenny Wilson", "Robert Fox", "Cody Fisher"
  //   ][i % 4],
  //   email: 'kihenjo@gmail.com',
  //   reason: '',
  //   bannedDate: `${new Date().toISOString()}`,
  //   status: ["permanent", "temporary"][i % 2]
  // }))
export const BannedUsers = () => {

  return (
    <div className="w-full mx-auto p-6 -z-0">
        <div className="flex items-center gap-3 mb-8">
            <UserX className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-semibold">Banned Users</h1>
        </div>

        <div className="flex flex-wrap gap-6">
            {mockBannedUsers.length ? (
            mockBannedUsers.map((user) => (
                <div className="flex-1 min-w-[300px] max-w-[400px]">
                <BannedUserCard key={user.id} user={user} />
                </div>
            ))
            ) : (
            <div className="flex w-full justify-center">
                <p className="text-lg text-gray-500">No banned users.</p>
            </div>
            )}
        </div>
    </div>

  );
};

const BannedUserCard = ({ user }: { user: BannedUser }) => {
  return (
    <>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 p-6 shadow-lg"
        >
        <div className="absolute top-4 right-4">
            <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                user.status === "permanent"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            )}
            >
            {user.status}
            </span>
        </div>

        <div className="flex flex-col gap-4">
            <div className="space-y-1">
            <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
            <p className="text-sm text-gray-600">{user.reason}</p>
            </div>

            <div className="mt-2 text-sm text-gray-500">
            Banned on: {new Date(user.bannedDate).toLocaleDateString()}
            </div>
        </div>
        </motion.div>
    </>
  );
};

export default BannedUsers;