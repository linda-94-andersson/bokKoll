import { View, Text } from "react-native";

type ResultsProps = {
  readonly input: string;
};

export default function Results({ input }: ResultsProps) {
  return (
    <View>
      <Text>Results here!</Text>
      <Text>{input}</Text>
    </View>
  );
}
