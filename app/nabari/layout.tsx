import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ふるさと発見 | 乱歩と名張",
};

export default function NabariLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
