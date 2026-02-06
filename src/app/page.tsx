import Editor from '@/components/root/Editor';
import Preview from '@/components/root/Preview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileEdit, Eye, Sparkles } from 'lucide-react';

export default function page() {
  return (
    <div className="mt-20 min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Header Section */}
      <div className="sticky top-0 z-10 border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center gap-4">
            {/* Centered Tabs */}
            <Tabs defaultValue="editor" className="w-full">
              <div className="flex justify-center">
                <TabsList className="bg-muted text-muted-foreground inline-flex h-11 items-center justify-center rounded-lg p-1 shadow-sm">
                  <TabsTrigger
                    value="editor"
                    className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
                  >
                    <FileEdit size={16} />
                    <span className="hidden sm:inline">Editor</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center gap-2 rounded-md px-6 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm"
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">Preview</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Tab Content */}
              <TabsContent value="editor" className="mt-0">
                <Editor />
              </TabsContent>
              <TabsContent value="preview" className="mt-0">
                <Preview />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
