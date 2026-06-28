import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { HandCoins, PlusCircle, X } from "lucide-react";
import api from "../services/api";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

function FundModal({ onFunded, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { data } = await api.post("/funding/payment-intent", { amount });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      if (result.error) {
        toast.error(result.error.message);
        return;
      }
      await api.post("/funding", {
        amount: Number(amount),
        paymentIntentId: result.paymentIntent.id,
      });
      toast.success("Thank you for your contribution!");
      onFunded();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <h2>Give Fund</h2>
        <p>Support our blood donation network with a contribution. Secure payment powered by Stripe.</p>
        <form onSubmit={submit} style={{ display: "grid", gap: "1rem" }}>
          <label>
            Amount (USD)
            <input
              type="number"
              min="1"
              step="1"
              required
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            Card Details
            <div className="card-element-wrap">
              <CardElement options={{ style: { base: { fontSize: "15px" } } }} />
            </div>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={!stripe || loading}>
              {loading ? "Processing…" : `Pay $${amount || "0"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FundingContent() {
  const [funds, setFunds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const load = () => api.get("/funding").then(({ data }) => setFunds(data));
  useEffect(() => { load(); }, []);

  const total = funds.reduce((s, f) => s + f.amount, 0);

  return (
    <main className="page">
      {showModal && (
        <FundModal onFunded={load} onClose={() => setShowModal(false)} />
      )}

      <div className="page-header">
        <div>
          <h1>Funding</h1>
          <p style={{ color: "var(--muted)", marginTop: "0.25rem" }}>
            Community contributions that keep BloodBridge running
          </p>
        </div>
        <button className="btn primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={16} /> Give Fund
        </button>
      </div>

      {/* Total card */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="stat-card">
          <div className="stat-icon gold"><HandCoins size={22} /></div>
          <div>
            <strong>${total.toFixed(2)}</strong>
            <span>Total Raised</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon teal"><HandCoins size={22} /></div>
          <div>
            <strong>{funds.length}</strong>
            <span>Contributors</span>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Contributor</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((f, i) => (
              <tr key={f._id}>
                <td style={{ color: "var(--muted)" }}>{i + 1}</td>
                <td>
                  <strong>{f.userName}</strong>
                  <br />
                  <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{f.userEmail}</span>
                </td>
                <td style={{ fontWeight: 700, color: "var(--green)" }}>${f.amount.toFixed(2)}</td>
                <td style={{ color: "var(--muted)" }}>
                  {new Date(f.fundingDate).toLocaleDateString("en-BD", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {!funds.length && (
              <tr><td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "var(--muted)" }}>No funding records yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default function Funding() {
  return (
    <Elements stripe={stripePromise}>
      <FundingContent />
    </Elements>
  );
}
