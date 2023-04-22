import { Container, Row } from "@nextui-org/react";
import Navbar from "./Navbar";
import MySidebar from "./Sidebar";
import React, { useEffect, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const useWindowSize = (): number[] => {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
      const updateSize = (): void => {
        setSize([window.innerWidth, window.innerHeight]);
      };

      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };

  const [width, height] = useWindowSize();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      {width >= 900 ? <MySidebar /> : null}
      <main>
        {width < 900 ? <Navbar /> : null}
        <Container
          justify="center"
          css={{ paddingTop: "$lg", paddingBottom: "$xl" }}
        >
          {children}
        </Container>
      </main>
    </div>
  );
}
