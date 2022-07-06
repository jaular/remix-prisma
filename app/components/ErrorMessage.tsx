type Props = {
  error: Error;
  data?: string;
};

export const ErrorMessage = ({ error, data }: Props) => {
  return (
    <div className="max-w-sm px-6 py-4 mx-auto border rounded border-emerald-500">
      <h1 className="text-base">Something unexpected went wrong</h1>
      <div className="mt-2">
        <p className="text-xs">Details:</p>
        <p className="text-xs text-rose-500 mt-0.5">{error.message}</p>
      </div>
    </div>
  );
};
