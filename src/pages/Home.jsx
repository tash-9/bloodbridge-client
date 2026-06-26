import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, MapPin, ShieldCheck, Clock, Users, Droplets } from "lucide-react";
import CountUp from "react-countup";

import { useState } from "react";
import toast from "react-hot-toast";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.message) {
    toast.error("Please fill in all fields.");
    return;
  }
  setSending(true);
  try {
    await api.post("/contact", form);
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  } catch {
    toast.error("Failed to send message. Please try again.");
  } finally {
    setSending(false);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        value={form.message}
        onChange={handleChange}
        required
        style={{ resize: "vertical" }}
      />
      <button
        type="submit"
        className="btn primary"
        disabled={sending}
        style={{ justifySelf: "start" }}
      >
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <main>
      {}
      <section className="hero">
        <motion.div
          className="hero-content"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55 }}
        >
          <span className="eyebrow">Emergency-ready donor network</span>
          <h1>
            Save Lives with <span>Every Drop</span>
          </h1>
          <p>
            BloodBridge connects blood donors with those in urgent need across Bangladesh.
            Register as a donor, publish requests, and coordinate donation progress in one
            secure platform.
          </p>
          <div className="hero-actions">
            <Link className="btn hero-primary" to="/register">
              Join as a Donor
            </Link>
            <Link className="btn hero-ghost" to="/search">
              Search Donors
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "5rem 1.5rem", background: "#1a1f2e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#e53e3e", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              PLATFORM HIGHLIGHTS
            </p>
            <h2 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
              BloodBridge At a Glance
            </h2>
            <p style={{ color: "#9ca3af", marginTop: "0.75rem", fontSize: "0.95rem" }}>
              A quick snapshot of donors, districts, and lives saved across Bangladesh.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {[
              { Icon: Users, value: 10000, suffix: "+", label: "Registered Donors" },
              { Icon: Droplets, value: 5000, suffix: "+", label: "Lives Saved" },
              { Icon: MapPin, value: 64, suffix: "", label: "Districts Covered" },
              { Icon: Activity, value: 98, suffix: "%", label: "Success Rate" },
            ].map(({ Icon, value, suffix, label }) => (
              <div
                key={label}
                style={{
                  background: "#2c3347",
                  borderRadius: 16,
                  padding: "2rem",
                  textAlign: "center",
                  border: "1px solid #3d4561",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#e53e3e";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#3d4561";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: "rgba(229,62,62,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}>
                  <Icon size={26} style={{ color: "#e53e3e" }} />
                </div>
                <h3 style={{ fontSize: "2.25rem", fontWeight: 800, color: "#fff", margin: 0 }}>
                  <CountUp end={value} duration={2} separator="," suffix={suffix} enableScrollSpy scrollSpyDelay={200} />
                </h3>
                <p style={{ color: "#9ca3af", marginTop: "0.5rem", fontSize: "0.875rem" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-bg">
        <div className="section-header">
          <span className="section-label">Why BloodBridge</span>
          <h2>Everything you need to donate blood</h2>
          <p>
            Our platform makes blood donation simple, transparent, and fast — from
            request to confirmed donation.
          </p>
        </div>
        <div className="feature-grid">
          {[
            [
              Activity,
              "Live Request Tracking",
              "Every donation request moves from pending → in progress → done with clear ownership and status updates in real time.",
            ],
            [
              MapPin,
              "Location-Aware Search",
              "Find verified donors by blood group, district, and upazila. Get to the right person in the right area instantly.",
            ],
            [
              ShieldCheck,
              "Role-Secured Workflow",
              "Admins, volunteers, and donors each see only the controls they need. JWT-protected APIs keep your data safe.",
            ],
            [
              Clock,
              "Fast Response Times",
              "Urgent requests are visible the moment they are published. No delays, no barriers — just instant connections.",
            ],
            [
              Users,
              "Community Driven",
              "Built around volunteers and donors who care. Volunteer coordinators help manage and approve donation progress.",
            ],
            [
              Droplets,
              "All Blood Groups",
              "Support for every blood group — A+, A−, B+, B−, AB+, AB−, O+, and O−. No one is left behind.",
            ],
          ].map(([Icon, title, text]) => (
            <motion.article
              className="feature-card"
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="feature-icon">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Section */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-header">
          <span className="section-label">How it works</span>
          <h2>Three simple steps to save a life</h2>
        </div>
        <div className="steps-grid">
          {[
            ["1", "Register as a Donor", "Create your free account, fill in your blood group and location, and become part of the donor network."],
            ["2", "Receive or Submit a Request", "Find open requests near you or submit a request if you or someone you know needs blood urgently."],
            ["3", "Confirm & Donate", "Connect with the requester, confirm your donation, and update the status — from pending to done."],
          ].map(([num, title, text]) => (
            <motion.div
              className="step-card"
              key={num}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Number(num) * 0.1 }}
            >
              <div className="step-number">{num}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="section contact-band" id="contact">
        <div className="contact-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start", maxWidth: 900, margin: "0 auto" }}>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have a question or need assistance? Our coordination desk is available
              to help you with any blood donation related queries.
            </p>
            <div className="contact-detail">
              <Droplets size={16} />
              Hotline: +880 1700 000 000
            </div>
            <div className="contact-detail">
              <Activity size={16} />
              Email: support@bloodbridge.test
            </div>
            <div className="contact-detail">
              <MapPin size={16} />
              Dhaka, Bangladesh
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
