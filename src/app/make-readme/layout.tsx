
import { AppSidebar } from "@/components/root/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReadmeProvider } from "@/providers/ReadmeProvider";

export default function MakeReadmeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReadmeProvider>
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar  /> 
          <main className="flex-1">
            <SidebarTrigger className="z-50 mt-2" />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ReadmeProvider>
  );
}