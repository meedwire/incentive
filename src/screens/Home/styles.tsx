import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  containerItem: {
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#8affa32b",
    marginBottom: 6,
    borderRadius: 8,
  },
  limitDate: {
    position: "absolute",
    right: 8,
    top: 5,
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  buttonAdd: {
    position: "absolute",
    bottom: 15,
    right: 10,
    backgroundColor: "#eaffef",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    elevation: 10,
    shadowColor: "#3dff67",
    borderWidth: 1,
    borderColor: "#3dff6714",
  },
});
