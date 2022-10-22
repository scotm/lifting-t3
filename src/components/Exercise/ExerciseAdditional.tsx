import { Equipment, Exercise } from "@prisma/client";

type ExerciseAdditionalProps = {
  precursor: string;
  named?: Array<{ name: string }>;
};

export default function ExerciseAdditional({
  precursor,
  named,
}: ExerciseAdditionalProps) {
  if (named === undefined) return <></>;
  let output =
    named.length > 0
      ? named.map((n: { name: string }) => n.name).join(", ")
      : "";
  return (
    <div>
      <p>
        <strong>{precursor}</strong>
        {output}
      </p>
    </div>
  );
}
