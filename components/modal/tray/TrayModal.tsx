import { TypoBase } from "@/components/typography";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";
import { styles } from "./styles";

interface TrayModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  onDismiss: () => void;
  title: string;
}
export const TrayModal: React.FC<TrayModalProps> = ({
  children,
  isVisible,
  onDismiss,
  title,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[
              Colors.light_purple,
              Colors.soft_purple,
              Colors.dark_purple,
            ]}
            style={styles.modalContent}
          >
            <View style={styles.titleContainer}>
              <View style={styles.emptyBox} />
              <TypoBase
                size="title"
                fontStyle="bold"
                style={{ color: Colors.common.white }}
              >
                {title}
              </TypoBase>
              <Pressable onPress={onDismiss}>
                <Feather
                  name="x-circle"
                  size={24}
                  color={Colors.common.white}
                />
              </Pressable>
            </View>
            {children}
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
