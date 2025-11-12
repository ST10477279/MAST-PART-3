import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMenu } from "../MenuContext";
import type { Course, Dish } from "../types";

export default function FilterScreen(): JSX.Element {
  const { dishes, courses } = useMenu();
  const [selected, setSelected] = useState<Course | null>(null);

  const filtered = useMemo(() => {
    if (!selected) return dishes;
    return dishes.filter((d) => d.course === selected);
  }, [dishes, selected]);

  const renderItem = ({ item }: { item: Dish }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.course} · {item.description}</Text>
      <Text style={styles.badge}>R {item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Filter by Course</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.chip, !selected && styles.sel]} onPress={() => setSelected(null)}>
          <Text>All</Text>
        </TouchableOpacity>
        {courses.map((c) => (
          <TouchableOpacity key={c} style={[styles.chip, selected === c && styles.sel]} onPress={() => setSelected(c)}>
            <Text>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList data={filtered} keyExtractor={(d) => String(d.id)} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  h1: { fontSize: 20, fontWeight: "700", marginBottom: 10 },
  row: { flexDirection: "row", gap: 8, marginBottom: 12 },
  chip: { backgroundColor: "#eee", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20 },
  sel: { backgroundColor: "#ffd166" },
  card: { backgroundColor: "#fafafa", borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee" },
  title: { fontWeight: "700" },
  badge: { marginTop: 6, alignSelf: "flex-start", backgroundColor: "#eee", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }
});
