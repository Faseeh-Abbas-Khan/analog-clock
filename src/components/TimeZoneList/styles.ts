import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    backgroundColor: '#f1f2f6',
    borderRadius: 8,
    paddingHorizontal: 15,
    margin: 15,
    fontSize: 16,
    color: '#2f3542',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  itemContainer: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dfe4ea',
  },
  itemText: {
    fontSize: 16,
    color: '#2f3542',
  },
});


export default styles;