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
    <Row style={{ height: height }}>
      {width >= 900 ? <MySidebar height={height} /> : null}
      <main style={{ width: width }}>
        {width < 900 ? <Navbar /> : null}
        <Container
          justify="center"
          css={{ paddingTop: "$lg", paddingBottom: "$xl" }}
        >
          {children}
        </Container>
      </main>
    </Row>
  );
}
