export const GradientTitle = ({ text }: { text: string }) => {
  return (
    <h1 className="text-2xl font-bold text-blue-700 md:text-3xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-700">
        {text}
      </span>
    </h1>
  );
};
