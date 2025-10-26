const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="font-bold text-transparent bg-clip-text active-effect">
      {children}
    </h2>
  );
};

export default Heading;
