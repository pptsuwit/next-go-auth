export default function Loading() {
  return (
    <div className="absolute opacity-80 bg-gray-200 w-full min-h-screen flex justify-center items-center ">
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-300">
        {/* <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin"> */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-900 to-indigo-300 animate-spin">
          <div className="h-9 w-9 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
