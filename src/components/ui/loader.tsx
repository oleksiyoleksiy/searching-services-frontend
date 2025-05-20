import { Loader2 } from "lucide-react";

const Loader = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div className="flex items-center justify-center h-full w-full py-12">
      <div className="flex flex-col items-center gap-4 text-gray-600">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">{label}</p>
      </div>
    </div>
  );
};

export default Loader;
