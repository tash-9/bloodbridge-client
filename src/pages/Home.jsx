import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, MapPin, ShieldCheck, Clock, Users, Droplets } from "lucide-react";
import CountUp from "react-countup";

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

      {//Stat
       }
      <div className="stats-strip">
        <div className="stat-item">
          <strong>
            <CountUp end={10000} duration={2} separator="," suffix="+" enableScrollSpy scrollSpyDelay={200} />
          </strong>
          <span>Registered Donors</span>
        </div>
        <div className="stat-item">
          <strong>
            <CountUp end={5000} duration={2} separator="," suffix="+" enableScrollSpy scrollSpyDelay={200} />
          </strong>
          <span>Lives Saved</span>
        </div>
        <div className="stat-item">
          <strong>
            <CountUp end={64} duration={2} enableScrollSpy scrollSpyDelay={200} />
          </strong>
          <span>Districts Covered</span>
        </div>
      </div>

      {//Features
      }
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

      {//Section
      }
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

      {//Contact 
      }
      <section className="section contact-band">
        <div className="contact-inner">
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
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <label style={{ color: "rgba(255,255,255,0.7)" }}>
              Your Name
              <input placeholder="Enter your name" />
            </label>
            <label style={{ color: "rgba(255,255,255,0.7)" }}>
              Email or Phone
              <input placeholder="contact@example.com" />
            </label>
            <label style={{ color: "rgba(255,255,255,0.7)" }}>
              Message
              <textarea placeholder="How can we help you?" />
            </label>
            <button className="btn primary">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
