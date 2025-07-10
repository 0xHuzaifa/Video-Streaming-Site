import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Bell,
  Menu,
  Mic,
  Play,
  Search,
  User,
  VideoIcon,
  Zap,
} from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAppContext } from "@/hooks/UseAppContext";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const { isLogin } = useAppContext();

  const logout = () => {
    // Logic to handle logout
    console.log("User logged out");
    // Clear user data and update login state
    localStorage.removeItem("user");
    localStorage.setItem("isLogin", "false");
    // Optionally, you can redirect the user or update the UI accordingly
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 z-50"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Video Streaming
              </span>
              <div className="text-xs text-purple-400 font-medium">
                NEXT-GEN
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center section - Search */}
        <div className="flex items-center max-w-2xl flex-1 mx-8">
          <div className="flex items-center w-full max-w-xl">
            <motion.div
              className="flex items-center flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-slate-600/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Input
                placeholder="Search for anything..."
                className="border-0 bg-transparent rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 px-6 py-3 text-white placeholder:text-slate-400"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0 rounded-2xl ml-3 px-6 py-3 h-12 shadow-lg shadow-purple-500/25">
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="ml-3 hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl relative"
            >
              <VideoIcon className="w-5 h-5" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-xl relative"
            >
              <Bell className="w-5 h-5" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isLogin ? (
              <div className="flex gap-x-2">
                <Avatar className="w-10 h-10 ring-2 ring-purple-500/30 hover:ring-purple-500/50 transition-all">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>

                <Button
                  className="bg-gradient-to-r from-purple-500 to-blue-500"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                Sign In
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
