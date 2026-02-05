"use client";

import React, { createContext, useContext, useState } from "react";

// টাইপ ডিফাইন করা
export type ReadmeBlock = {
  id: string;
  type: string;
  content: string;
};

interface ReadmeContextType {
  blocks: ReadmeBlock[];
  addBlock: (type: string) => void;
  updateBlock: (id: string, content: string) => void;
  removeBlock:(id: string) => void
}

const ReadmeContext = createContext<ReadmeContextType | undefined>(undefined);

export function ReadmeProvider({ children }: { children: React.ReactNode }) {
  const [blocks, setBlocks] = useState<ReadmeBlock[]>([]);

  const addBlock = (type: string) => {
    const newBlock = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content: "",
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const removeBlock = (id: string) => {
  setBlocks((prev) => prev.filter((block) => block.id !== id));
};


  return (
    <ReadmeContext.Provider value={{ blocks, addBlock, updateBlock, removeBlock }}>
      {children}
    </ReadmeContext.Provider>
  );
}

// এটি ব্যবহারের জন্য একটি কাস্টম হুক
export const useReadme = () => {
  const context = useContext(ReadmeContext);
  if (!context) throw new Error("useReadme must be used within a ReadmeProvider");
  return context;
};