import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ふるさと発見 | 江戸川乱歩生誕地ミュージアム",
};

export default function NabariLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
