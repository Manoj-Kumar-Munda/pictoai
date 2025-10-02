import EditSidebar from "./_components/edit-sidebar";
import Header from "./_components/header";

const ImageEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />

      <main className="h-svh w-full relative pt-20  text-black flex ">
        <EditSidebar />
        <div className="flex-1 h-full w-full flex justify-center p-4 bg-gray-200">
          {children}
        </div>
      </main>
    </>
  );
};

export default ImageEditorLayout;
