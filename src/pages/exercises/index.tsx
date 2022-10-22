import { useState } from "react";
import ExerciseList from "../../components/Exercise/ExerciseList";
import ExerciseListHeader from "../../components/Exercise/ExerciseListHeader";
import Layout from "../../components/PageLayout/Layout";

export default function ShowExercises() {
  // The search parameters state
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <Layout title="Exercise Selection">
      <ExerciseListHeader
        category={category}
        search={search}
        setCategory={setCategory}
        setSearch={setSearch}
      />
      <ExerciseList
        show_description={false}
        category={category}
        search={search}
      />
    </Layout>
  );
}
