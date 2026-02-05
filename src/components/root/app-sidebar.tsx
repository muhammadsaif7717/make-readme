"use client";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Heading1, 
  Type, 
  Image as ImageIcon, 
  Code2, 
  List, 
  CheckSquare, 
  Table as TableIcon, 
  Github, 
  Link as LinkIcon,
  Quote
} from "lucide-react";
import { useReadme } from "@/providers/ReadmeProvider";

export function AppSidebar() {
  const { addBlock } = useReadme();

  // এলিমেন্টগুলোকে ক্যাটাগরি অনুযায়ী সাজানো হয়েছে
  const elements = [
    {
      group: "Typography",
      items: [
        { label: "Title / Heading", type: "heading", icon: <Heading1 size={16} /> },
        { label: "Description Text", type: "text", icon: <Type size={16} /> },
        { label: "Blockquote", type: "quote", icon: <Quote size={16} /> },
      ],
    },
    {
      group: "Structure & Media",
      items: [
        { label: "Image / GIF", type: "image", icon: <ImageIcon size={16} /> },
        { label: "Code Block", type: "code", icon: <Code2 size={16} /> },
        { label: "Bullet List", type: "list", icon: <List size={16} /> },
        { label: "Task List", type: "task", icon: <CheckSquare size={16} /> },
        { label: "Table", type: "table", icon: <TableIcon size={16} /> },
      ],
    },
    {
      group: "GitHub Special",
      items: [
        { label: "GitHub Stats Card", type: "stats", icon: <Github size={16} /> },
        { label: "Top Languages Card", type: "langs", icon: <Github size={16} /> },
        { label: "Social Badges", type: "badges", icon: <LinkIcon size={16} /> },
      ],
    },
  ];

  return (
    <Sidebar className="mt-20 border-r">
      <SidebarHeader className="px-4 py-2 border-b">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Add Elements
        </h2>
      </SidebarHeader>
      
      <SidebarContent>
        {elements.map((section) => (
          <SidebarGroup key={section.group}>
            <SidebarGroupLabel>{section.group}</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-1 p-2">
              {section.items.map((item) => (
                <Button
                  key={item.type}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-3 px-3 py-5 hover:bg-primary/10 transition-colors"
                  onClick={() => addBlock(item.type)}
                >
                  <span className="text-primary">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}