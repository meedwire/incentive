import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 0.6,
    borderColor: "#8affa3be",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 32,
    fontSize: 16,
  },
  buttonSave: {
    padding: 16,
    backgroundColor: "#8affa336",
    borderRadius: 32,
    alignItems: "center",
  },
  textButtonSave: {
    fontSize: 16,
  },
  textError: {
    fontSize: 12,
    color: "#ff6565",
    marginLeft: 8,
    marginTop: -10,
  },
});
