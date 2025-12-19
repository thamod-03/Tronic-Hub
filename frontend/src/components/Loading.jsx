import { ClipLoader } from "react-spinners";

const Loading = ({ size = 50, color = "#3b82f6", fullScreen = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "fixed inset-0 bg-white/70 z-50" : "w-full h-full"
      }`}
    >
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loading;
