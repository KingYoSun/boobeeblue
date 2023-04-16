import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RowBox({ children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
