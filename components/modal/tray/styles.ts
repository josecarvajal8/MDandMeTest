import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '100%',
        backgroundColor: 'white',
        minHeight: '60%',
        borderRadius: 20,
        padding: 20,
        gap: 20,
      },
      titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      emptyBox: {
        width: 24,
        height: 24,
      },
});