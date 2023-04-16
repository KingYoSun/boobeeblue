import { ReactNode } from "react";

interface Props {
  className: string;
  children: ReactNode;
}

export default function RowBox({ className, children }: Props) {
  return (
    <div
      className={className}
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
