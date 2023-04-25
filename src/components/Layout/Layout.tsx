import { Container } from "@nextui-org/react";
import Navbar from "./Navbar";
import MySidebar from "./Sidebar";
import React, {
  useEffect,
  useState,
  ReactNode,
  useRef,
  useCallback,
} from "react";

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
    <Container
      display="flex"
      justify="center"
      alignContent="flex-start"
      responsive
      css={{ height: "100%" }}
    >
      <Navbar />
      <div
        style={{
          height: "90%",
          width: "95%",
          paddingTop: "2vh",
          paddingBottom: "5vh",
        }}
      >
        {children}
      </div>
    </Container>
  );
}
