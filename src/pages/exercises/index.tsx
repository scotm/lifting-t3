import { useState } from "react";
import ExerciseListHeader from "../../components/Exercise/ExerciseListHeader";
import Layout from "../../components/PageLayout/Layout";
import { ExerciseTable } from "../../components/Exercise/ExerciseTable";

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
      {/* <RenderTable category={category} search={search} /> */}
      <ExerciseTable
        show_description={false}
        category={category}
        search={search}
      />
    </Layout>
  );
}
