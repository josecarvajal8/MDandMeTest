import React, { FC } from "react";
import { Text, type TextStyle } from "react-native";
import { styles } from "./styles";
import { Colors } from "@/constants/Colors";

interface ITypoProps {
  children: React.ReactNode;
  size?: "body" | "title" | "headline" | "display" | "caption";
  fontStyle?: "medium" | "bold" | "semibold" | "regular";
  style?: TextStyle;
}
export const TypoBase: FC<ITypoProps> = ({
  children,
  fontStyle = "regular",
  size = "body",
  style = {},
}) => {
  const fontBaseStyle: TextStyle = {
    ...styles[size],
    ...styles[fontStyle],
    color: Colors.common.black,
    ...style,
  };
  return <Text style={fontBaseStyle}>{children}</Text>;
};
