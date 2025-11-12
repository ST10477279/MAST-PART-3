import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import type { Course, Dish } from "./types";

type Ctx = {
  courses: Course[];
  dishes: Dish[];
  addDish: (d: Omit<Dish, "id">) => void;
  deleteDish: (id: number) => void;
  total: number;
  avgByCourse: Record<Course, number>;
};

const MenuCtx = createContext<Ctx | null>(null);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const idRef = useRef(1);
  const [dishes, setDishes] = useState<Dish[]>([
    { id: idRef.current++, name: "Caprese Salad", description: "Tomato, mozzarella, basil", course: "Starters", price: 85 },
    { id: idRef.current++, name: "Grilled Salmon", description: "Lemon butter sauce", course: "Mains", price: 199.99 },
    { id: idRef.current++, name: "Crème Brûlée", description: "Vanilla custard", course: "Desserts", price: 90 }
  ]);

  const courses: Course[] = ["Starters", "Mains", "Desserts"];

  const addDish: Ctx["addDish"] = (d) => {
    setDishes((prev) => [...prev, { ...d, id: idRef.current++ }]);
  };

  const deleteDish: Ctx["deleteDish"] = (id) => {
    setDishes((prev) => prev.filter((x) => x.id !== id));
  };

  const total = dishes.length;

  const avgByCourse = useMemo(() => {
    const map: Record<Course, number> = { Starters: 0, Mains: 0, Desserts: 0 };
    const counts: Record<Course, number> = { Starters: 0, Mains: 0, Desserts: 0 };
    dishes.forEach((d) => {
      counts[d.course] += 1;
      map[d.course] += d.price;
    });
    (Object.keys(map) as Course[]).forEach((c) => {
      map[c] = counts[c] ? +(map[c] / counts[c]).toFixed(2) : 0;
    });
    return map;
  }, [dishes]);

  const value: Ctx = { courses, dishes, addDish, deleteDish, total, avgByCourse };

  return <MenuCtx.Provider value={value}>{children}</MenuCtx.Provider>;
};

export const useMenu = () => {
  const v = useContext(MenuCtx);
  if (!v) throw new Error("useMenu must be used inside <MenuProvider>");
  return v;
};
