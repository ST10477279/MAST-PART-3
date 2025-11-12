import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DishCard from "../components/DishCard";
import { useMenu } from "../MenuContext";

const ManageScreen: React.FC = () => {
  const { dishes, deleteDish } = useMenu();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add / Manage Items</Text>
      <Text style={styles.note}>Add items on Home. Remove items here.</Text>

      <FlatList
        data={dishes}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <DishCard
            dish={item}
            right={
              <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteDish(item.id)}>
                <Text style={styles.deleteTxt}>Delete</Text>
              </TouchableOpacity>
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items yet — add on Home.</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f8fa", padding: 18 },
  header: { fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom: 12, color: "#d62828" },
  note: { textAlign: "center", color: "#666", marginBottom: 12 },
  deleteBtn: { backgroundColor: "#d62828", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, alignSelf: "center" },
  deleteTxt: { color: "#fff", fontWeight: "700" },
  empty: { textAlign: "center", color: "#666", marginTop: 8, fontStyle: "italic" }
});

export default ManageScreen;