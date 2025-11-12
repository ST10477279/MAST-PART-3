export type Course = "Starters" | "Mains" | "Desserts";

export interface Dish {
  id: number;
  name: string;
  description: string;
  course: Course;
  price: number;
}
