const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="font-bold text-secondary">
      {children}
    </h2>
  );
};

export default Heading;
