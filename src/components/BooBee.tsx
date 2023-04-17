import { Row } from "@nextui-org/react";
import MainLogo from "./MainLogo";
import MainText from "./MainText";

export default function BooBee() {
  return (
    <Row align="center">
      <MainLogo />
      <MainText style={{ marginLeft: 5 }} />
    </Row>
  );
}
