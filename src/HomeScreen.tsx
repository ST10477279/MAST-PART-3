import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useMenu } from "../MenuContext";
import type { Course, Dish } from "../types";

export default function HomeScreen(): JSX.Element {
  const { dishes, addDish, courses, total, avgByCourse } = useMenu();

  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [course, setCourse] = useState<Course>("Starters");
  const [priceText, setPriceText] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !description.trim() || !priceText.trim()) return;
    const price = Number(priceText);
    if (Number.isNaN(price) || price <= 0) return;
    const newDish: Omit<Dish, "id"> = { name: name.trim(), description: description.trim(), course, price };
    addDish(newDish);
    setName(""); setDesc(""); setPriceText("");
  };

  const renderItem = ({ item }: { item: Dish }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.course} · {item.description}</Text>
      <Text style={styles.badge}>R {item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Prepared Menu</Text>

      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Total Items</Text>
          <Text style={styles.statValue}>{total}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average Price</Text>
          <Text style={styles.small}>S R{avgByCourse.Starters} | M R{avgByCourse.Mains} | D R{avgByCourse.Desserts}</Text>
        </View>
      </View>

      <Text style={styles.section}>Add New Item (Part 2)</Text>

      <TextInput value={name} onChangeText={setName} placeholder="Dish name" style={styles.input} />
      <TextInput value={description} onChangeText={setDesc} placeholder="Description" style={styles.input} />
      <View style={styles.row}>
        {courses.map((c) => (
          <TouchableOpacity key={c} onPress={() => setCourse(c)} style={[styles.chip, course === c && styles.chipSel]}>
            <Text style={styles.chipTxt}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        value={priceText}
        onChangeText={setPriceText}
        placeholder="Price (R)"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add" onPress={handleAdd} />

      <FlatList
        data={dishes}
        keyExtractor={(d) => String(d.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  h1: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  row: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 8 },
  stat: { flex: 1, backgroundColor: "#f3f4f6", borderRadius: 10, padding: 10 },
  statLabel: { fontWeight: "600" },
  statValue: { fontSize: 18, fontWeight: "800" },
  small: { fontSize: 12, marginTop: 4 },
  section: { marginTop: 10, marginBottom: 6, fontWeight: "700" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 8 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, backgroundColor: "#eee" },
  chipSel: { backgroundColor: "#ffd166" },
  chipTxt: { fontWeight: "600" },
  card: { backgroundColor: "#fafafa", borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee" },
  title: { fontWeight: "700", marginBottom: 4 },
  badge: { alignSelf: "flex-start", marginTop: 6, backgroundColor: "#eee", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }
});
