import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import { bloodGroups } from "../../data/locations";
import LocationFields from "../../components/LocationFields";

const empty = {
  recipientName: "",
  recipientDistrict: "",
  recipientUpazila: "",
  hospitalName: "",
  address: "",
  bloodGroup: "",
  donationDate: "",
  donationTime: "",
  message: "",
};

export default function RequestForm({ edit = false }) {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && id) {
      api.get(`/requests/${id}`).then(({ data }) => setForm(data));
    }
  }, [edit, id]);

  const change = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "recipientDistrict" ? { recipientUpazila: "" } : {}),
    }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (edit) {
        await api.patch(`/requests/${id}`, form);
        toast.success("Donation request updated");
      } else {
        await api.post("/requests", form);
        toast.success("Donation request created");
      }
      navigate(
        user.role === "donor"
          ? "/dashboard/my-donation-requests"
          : "/dashboard/all-blood-donation-request"
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="panel">
        <div className="section-head">
          <h1>{edit ? "Edit Donation Request" : "Create Donation Request"}</h1>
        </div>

        <div className="form-grid">
          <label>
            Requester Name
            <input disabled value={user.name} />
          </label>
          <label>
            Requester Email
            <input disabled value={user.email} />
          </label>

          <label className="full">
            Recipient Name
            <input
              required
              placeholder="Patient's full name"
              value={form.recipientName}
              onChange={(e) => change("recipientName", e.target.value)}
            />
          </label>

          <LocationFields
            district={form.recipientDistrict}
            upazila={form.recipientUpazila}
            onChange={change}
            districtName="recipientDistrict"
            upazilaName="recipientUpazila"
            required
          />

          <label>
            Hospital Name
            <input
              required
              placeholder="e.g. Dhaka Medical College Hospital"
              value={form.hospitalName}
              onChange={(e) => change("hospitalName", e.target.value)}
            />
          </label>

          <label>
            Full Address
            <input
              required
              placeholder="Street address"
              value={form.address}
              onChange={(e) => change("address", e.target.value)}
            />
          </label>

          <label>
            Blood Group
            <select
              required
              value={form.bloodGroup}
              onChange={(e) => change("bloodGroup", e.target.value)}
            >
              <option value="">Select blood group</option>
              {bloodGroups.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>

          <div /> {/* spacer */}

          <label>
            Donation Date
            <input
              type="date"
              required
              value={form.donationDate}
              onChange={(e) => change("donationDate", e.target.value)}
            />
          </label>

          <label>
            Donation Time
            <input
              type="time"
              required
              value={form.donationTime}
              onChange={(e) => change("donationTime", e.target.value)}
            />
          </label>

          <label className="full">
            Request Message
            <textarea
              required
              placeholder="Describe why blood is needed, patient condition, urgency level…"
              value={form.message}
              onChange={(e) => change("message", e.target.value)}
            />
          </label>

          <div className="full form-actions">
            <button className="btn primary" disabled={loading}>
              <Send size={15} />
              {loading
                ? "Saving…"
                : edit
                ? "Update Donation Request"
                : "Submit Request"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
