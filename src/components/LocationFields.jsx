import { districts } from "../data/locations";

export default function LocationFields({
  district,
  upazila,
  onChange,
  disabled = false,
  districtName = "district",
  upazilaName = "upazila",
  required = false,
}) {
  const upazilaList = districts[district] || [];

  return (
    <>
      <label>
        District
        <select
          disabled={disabled}
          value={district || ""}
          required={required}
          onChange={(e) => onChange(districtName, e.target.value)}
        >
          <option value="">Select district</option>
          {Object.keys(districts).map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>
      <label>
        Upazila
        <select
          disabled={disabled || !district}
          value={upazila || ""}
          required={required}
          onChange={(e) => onChange(upazilaName, e.target.value)}
        >
          <option value="">Select upazila</option>
          {upazilaList.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
    </>
  );
}
