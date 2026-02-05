"use client";

import { useReadme } from "@/providers/ReadmeProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileText } from "lucide-react";

export default function Preview() {
  const { blocks } = useReadme();

  // ১. ব্লকের ডাটাকে Markdown String-এ কনভার্ট করার ফাংশন
  const generateMarkdown = () => {
    return blocks
      .map((block) => {
        const content = block.content.trim();
        if (!content && block.type !== "stats" && block.type !== "langs") return "";

        switch (block.type) {
          case "heading": return `# ${content}`;
          case "text": return content;
          case "quote": return `> ${content}`;
          case "image": return `![Image](${content})`;
          case "code": return `\`\`\`\n${content}\n\`\`\``;
          case "list": return content.split('\n').map(l => `- ${l}`).join('\n');
          case "task": return content.split('\n').map(l => `- [x] ${l}`).join('\n');
          case "table": return content; // ইউজার সরাসরি Markdown টেবিল লিখবে
          case "stats": 
            return `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${content}&show_icons=true&theme=radical)`;
          case "langs": 
            return `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${content}&layout=compact&theme=radical)`;
          case "badges":
            return content; // Badges usually links/images
          default: return content;
        }
      })
      .filter(Boolean)
      .join("\n\n");
  };

  const finalMarkdown = generateMarkdown();

  // ২. কপি এবং ডাউনলোড ফাংশন
  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalMarkdown);
    alert("Markdown copied to clipboard! 🚀");
  };

  const downloadFile = () => {
    const blob = new Blob([finalMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
  };

  return (
    <div className="flex-1 min-h-screen bg-white dark:bg-zinc-950 border-l">
      {/* কন্ট্রোল বার */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-slate-50 dark:bg-zinc-900 border-b">
        <div className="flex items-center gap-2 font-semibold">
          <FileText size={18} className="text-blue-500" />
          <span>README.md Preview</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={copyToClipboard}>
            <Copy size={14} className="mr-2" /> Copy
          </Button>
          <Button size="sm" onClick={downloadFile}>
            <Download size={14} className="mr-2" /> Download
          </Button>
        </div>
      </div>

      {/* GitHub স্টাইলড বডি */}
      <div className="p-8 max-w-3xl mx-auto">
        {blocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-lg">
            <p>প্রিভিউ দেখার জন্য কিছু এলিমেন্ট যোগ করুন</p>
          </div>
        ) : (
          <div className="prose prose-slate dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:border-b prose-headings:pb-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {finalMarkdown}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}