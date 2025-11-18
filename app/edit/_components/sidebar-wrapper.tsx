const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside className="h-full shrink-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-r border-zinc-800/50 px-4 py-4 text-white space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent w-80">
      {children}
    </aside>
  );
};

export default SidebarWrapper;
