import { Text } from "@nextui-org/react";

interface Props {
  style?: Object;
}

export default function MainText({ style }: Props) {
  return (
    <div style={style}>
      <Text
        h1
        size={22}
        weight="bold"
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
          marginBottom: -15,
        }}
      >
        boo
      </Text>
      <Text
        h1
        size={22}
        weight="bold"
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
          marginTop: -15,
          marginBottom: -15,
        }}
      >
        bee.
      </Text>
      <Text
        size={22}
        weight="bold"
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
          marginTop: -15,
        }}
      >
        blue
      </Text>
    </div>
  );
}
