import MakeReadme from "@/components/root/MakeReadme"; 
import Preview from "@/components/root/Preview";

export default function page() {
  return (
    <div className="flex h-screen overflow-hidden">
        {/* Editor Side (Scrollable) */}
        <div className="w-1/2 overflow-y-auto border-r">
            <MakeReadme/>
        </div>

        {/* Preview Side (Scrollable) */}
        <div className="w-1/2 overflow-y-auto bg-slate-50 dark:bg-zinc-950">
            <Preview/>
        </div>
    </div>
  )
}