import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Course } from "../types";

interface Props {
  value: Course;
  onChange: (course: Course) => void;
  options: Course[];
}

const CourseChips: React.FC<Props> = ({ value, onChange, options }) => {
  return (
    <View style={styles.row}>
      {options.map((c) => {
        const selected = value === c;
        return (
          <TouchableOpacity key={c} style={[styles.chip, selected && styles.selected]} onPress={() => onChange(c)}>
            <Text style={[styles.label, selected && styles.selLabel]}>{c}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, marginBottom: 8 },
  chip: { borderWidth: 1, borderColor: "#ddd", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#fff" },
  selected: { backgroundColor: "#d62828", borderColor: "#d62828" },
  label: { color: "#222" },
  selLabel: { color: "#fff", fontWeight: "700" }
});

export default CourseChips;