"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReadme } from "@/providers/ReadmeProvider";

export default function MakeReadme() {
  const { blocks, updateBlock, removeBlock } = useReadme(); 
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">README Editor</h1>
          <p className="text-muted-foreground">আপনার ব্লকের ডাটাগুলো এখানে এডিট করুন।</p>
        </div>
        <Button variant="outline" onClick={() => window.print()}>Export Preview</Button>
      </div>

      <div className="space-y-6">
        {blocks.length === 0 ? (
          <div className="text-center p-20 border-2 border-dashed rounded-xl">
            <p className="text-muted-foreground">সাইডবার থেকে এলিমেন্ট যোগ করে শুরু করুন...</p>
          </div>
        ) : (
          blocks.map((block) => (
            <Card key={block.id} className="relative group overflow-hidden">
              {/* Drag handle icon (visual only for now) */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={20} />
              </div>

              <CardContent className="p-6 ml-4">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase rounded">
                    {block.type}
                  </span>
                  {/* Delete Button (Optional: Add this function to context) */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeBlock(block.id)} 
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                {/* ডাইনামিক ইনপুট লজিক */}
                <div className="space-y-3">
                  {block.type === "heading" && (
                    <div className="grid gap-2">
                      <Label>Heading Text</Label>
                      <input
                        className="w-full p-2 border rounded-md bg-background text-xl font-bold"
                        value={block.content}
                        placeholder="Project Title..."
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    </div>
                  )}

                  {(block.type === "text" || block.type === "quote") && (
                    <div className="grid gap-2">
                      <Label>{block.type === "quote" ? "Quote" : "Description"}</Label>
                      <textarea
                        className="w-full p-3 border rounded-md bg-background min-h-[100px]"
                        value={block.content}
                        placeholder="আপনার টেক্সট এখানে লিখুন..."
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    </div>
                  )}

                  {(block.type === "stats" || block.type === "langs") && (
                    <div className="grid gap-2">
                      <Label>GitHub Username</Label>
                      <input
                        className="w-full p-2 border rounded-md bg-background"
                        value={block.content}
                        placeholder="e.g. mrhidoy"
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                      <p className="text-[10px] text-muted-foreground italic">
                        *এই ইউজারনেমের ওপর ভিত্তি করে কার্ড জেনারেট হবে।
                      </p>
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="grid gap-2">
                      <Label>Image URL / Banner Link</Label>
                      <input
                        className="w-full p-2 border rounded-md bg-background"
                        value={block.content}
                        placeholder="https://example.com/banner.png"
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    </div>
                  )}

                  {block.type === "code" && (
                    <div className="grid gap-2">
                      <Label>Code Snippet</Label>
                      <textarea
                        className="w-full p-3 border rounded-md bg-zinc-950 text-zinc-100 font-mono text-sm"
                        value={block.content}
                        placeholder="npm install my-cool-project"
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    </div>
                  )}

                  {/* Table/List এর জন্য আপাতত সাধারণ ইনপুট রাখা হলো */}
                  {["table", "list", "task", "badges"].includes(block.type) && (
                    <div className="grid gap-2">
                      <Label>{block.type.toUpperCase()} Content</Label>
                      <textarea
                        className="w-full p-3 border rounded-md bg-background"
                        value={block.content}
                        placeholder="Markdown ফরম্যাটে ডাটা লিখুন..."
                        onChange={(e) => updateBlock(block.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}