import EditSidebar from "./_components/edit-sidebar";

const ImageEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-svh overflow-hidden">
      <main className="h-full w-full relative pt-16 text-black flex items-start">
        <EditSidebar />
        <div className="flex-1 h-full w-full flex justify-center p-4 bg-gray-200">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ImageEditorLayout;
