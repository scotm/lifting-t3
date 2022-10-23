type ExerciseAdditionalProps = {
  precursor: string;
  named?: Array<{ name: string }>;
};

export default function ExerciseAdditional({
  precursor,
  named,
}: ExerciseAdditionalProps) {
  if (named === undefined) return <></>;
  const output =
    named.length > 0
      ? named
          .map((n: { name: string }) => n.name)
          .sort()
          .join(", ")
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
