import { ErrorMessage, Field } from "formik";

type LabelProps = { name: string; label: string };

const FieldLabel: React.FC<LabelProps> = (props) => {
  const { name, label } = props;
  return (
    <label className="text-xl font-bold" htmlFor={name}>
      {label}
    </label>
  );
};

type MyTextFieldProps = {
  className?: string;
  name: string;
  label: string;
  onChange?: (e: any) => void;
};

export const MyTextField: React.FC<MyTextFieldProps> = (props) => {
  const { name, label, className } = props;
  return (
    <>
      {label ? <FieldLabel name={name} label={label} /> : null}
      <Field
        className={className ?? "col-span-3 rounded-xl shadow-xl p-2"}
        name={name}
        as="input"
        type="text"
      />
      <ErrorMessage name={name} className="col-span-4 bg-indigo-200" />
    </>
  );
};

export function MyTextAreaField(props: MyTextFieldProps) {
  const { name, label, className: myclass } = props;
  const className = myclass ?? "col-span-3 h-96 rounded-xl shadow-xl p-2";

  return (
    <>
      <FieldLabel name={name} label={label} />
      <Field className={className} name={name} as="textarea"></Field>
      <ErrorMessage name={name} className="col-span-4 bg-indigo-200" />
    </>
  );
}

type MySelectFieldProps = {
  name: string;
  label: string;
  options: any[];
  className?: string;
};

export function MySelectField(props: MySelectFieldProps) {
  const { name, label, options, className: myclass } = props;
  const className = myclass ?? "col-span-3 rounded-xl shadow-xl p-2";
  return (
    <>
      {label ? <FieldLabel name={name} label={label} /> : null}
      <Field className={className} name={name} as="select">
        {options.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name ?? e.full_name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} />
    </>
  );
}

type MyCheckboxesFieldsProps = {
  name: string;
  label: string;
  choices: any[];
};

export function MyCheckboxesFields(props: MyCheckboxesFieldsProps) {
  const { name, label, choices } = props;
  return (
    <>
      <div className="text-xl font-bold">{label}</div>
      <div className="col-span-3 grid grid-cols-4 rounded-xl border-2 border-indigo-200 bg-indigo-100 p-2 shadow-xl">
        {choices.map((choice) => (
          <label key={choice.id} className="flex grid-cols-2">
            <Field
              className="m-2"
              type="checkbox"
              name={name}
              // Having to use toString? This *feels* like a wtf!
              // https://stackoverflow.com/a/64740181
              value={choice.id.toString()}
            />
            <span className=" m-2 text-sm">{choice.name}</span>
          </label>
        ))}
      </div>
    </>
  );
}
