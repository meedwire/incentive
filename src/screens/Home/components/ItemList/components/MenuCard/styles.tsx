import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  button: {
    padding: 12,
    borderRadius: 32,
    marginRight: 12,
  },
  buttonEdit: {
    backgroundColor: "#ffdc5c",
  },
  buttonDelete: {
    backgroundColor: "#ff7373",
  },
});
