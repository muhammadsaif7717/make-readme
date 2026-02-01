import { AppSidebar } from "@/components/root/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MakeReadmeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <SidebarProvider >
                <AppSidebar />
                <SidebarTrigger />
                {children}
            </SidebarProvider>
        </div>
    );
}
