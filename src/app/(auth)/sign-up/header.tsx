"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">DevOps Hub</h1>
          <p className="text-xs text-gray-600">Créer un compte</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
