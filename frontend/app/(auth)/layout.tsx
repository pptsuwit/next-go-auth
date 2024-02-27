import type { Metadata } from "next";
import { Layouts } from "@/components/Layouts/Layouts";

export const metadata: Metadata = {
  title: "Web Authentication",
  description: "Authentication",
};

export default function AuthLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth">
      <Layouts.Auth>{children}</Layouts.Auth>
    </div>
  );
}
