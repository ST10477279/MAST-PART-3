import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Dish } from "../types";

interface Props {
  dish: Dish;
  right?: React.ReactNode;
}

const DishCard: React.FC<Props> = ({ dish, right }) => {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{dish.name}</Text>
        <Text style={styles.desc}>{dish.description}</Text>
        <View style={styles.row}>
          <Text style={styles.course}>{dish.course}</Text>
          <Text style={styles.price}>R{Number(dish.price).toFixed(2)}</Text>
        </View>
      </View>
      {right ? <View style={{ marginLeft: 12 }}>{right}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#ddd" },
  title: { fontSize: 18, fontWeight: "700", color: "#222" },
  desc: { color: "#666", marginTop: 4 },
  row: { marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  course: { fontStyle: "italic", color: "#666" },
  price: { fontWeight: "700", color: "#222" }
});

export default DishCard;