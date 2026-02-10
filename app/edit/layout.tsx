import EditSidebar from "./_components/edit-sidebar";

const ImageEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh overflow-hidden">
      <main className="h-full w-full relative pt-16 flex items-start gap-3 pb-4 px-3">
        <EditSidebar />
        <div className="flex-1 h-full w-full flex justify-center rounded-xl overflow-hidden border border-editor-border/50 bg-editor-surface shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ImageEditorLayout;
