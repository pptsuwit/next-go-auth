export default function Paper({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border rounded-md shadow-md min-w-[420px] xs:w-full mx-2 sm:w-10/12 md:w-2/3 max-w-[100svw] p-6  ${className}`}
    >
      {children}
    </div>
  );
}
