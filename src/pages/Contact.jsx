import React from "react";

function Contact() {
  return (
    <div className="bg-[#FFF8EE] min-h-screen py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* ===== HERO ===== */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B3E26]">
            Contact Us
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you. Reach out for bulk orders, partnerships,
            product queries, or customer support.
          </p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* ================= Registered Office ================= */}
          <div className="bg-white rounded-3xl shadow-lg p-10 border border-[#f1e3d3]">
            <h2 className="text-2xl font-semibold text-[#6B3E26] mb-6">
              Registered Office
            </h2>

            <p className="text-gray-700 leading-relaxed">
              2nd Floor, Flat No-B1, Rajshree Tower <br />
              Plot No-409 (Old Plot No-404), Rev. Plot No-52 (P) <br />
              Ghatikia, Kalinganagar, PO-Bharatpur <br />
              Bhubaneswar, Khorda, Odisha <br />
              India - 751029
            </p>
            <div className="mt-6 rounded-2xl overflow-hidden border">
              <iframe
                src="https://www.google.com/maps?q=Rajshree+Tower+Ghatikia+Kalinganagar+Bhubaneswar+751029&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-gray-800 font-medium">📞 7655057620</p>

              <p>
                📧{" "}
                <a
                  href="mailto:Squrllbites@gmail.com"
                  className="text-[#C48A3A] hover:underline"
                >
                  Squrllbites@gmail.com
                </a>
              </p>

              <p>
                📧{" "}
                <a
                  href="mailto:support@squrllbites.com"
                  className="text-[#C48A3A] hover:underline"
                >
                  support@squrllbites.com
                </a>
              </p>

              <p>
                📧{" "}
                <a
                  href="mailto:admin@squrllbites.com"
                  className="text-[#C48A3A] hover:underline"
                >
                  admin@squrllbites.com
                </a>
              </p>
            </div>
          </div>

          {/* ================= Manufacturing Office ================= */}
          <div className="bg-white rounded-3xl shadow-lg p-10 border border-[#f1e3d3]">
            <h2 className="text-2xl font-semibold text-[#6B3E26] mb-6">
              Manufacturing Office
            </h2>

            <p className="text-gray-700 leading-relaxed">
              00, Sarai Sultani, Raniganj <br />
              Pratapgarh, Uttar Pradesh - 230304 <br />
              <span className="block mt-2 text-[#6B3E26] font-medium">
                📍 Landmark: Raniganj Chirkutti Square
              </span>
            </p>
            <div className="mt-6 rounded-2xl overflow-hidden border">
  <iframe
    src="https://www.google.com/maps?q=Raniganj+Chirkutti+Square+Pratapgarh+Uttar+Pradesh+230304&output=embed"
    width="100%"
    height="250"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>

            <div className="mt-6 space-y-3">
              <p className="text-gray-800 font-medium">📞 7655057620</p>

              <p>
                📧{" "}
                <a
                  href="mailto:support@squrllbites.com"
                  className="text-[#C48A3A] hover:underline"
                >
                  support@squrllbites.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ===== Bottom CTA ===== */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-semibold text-[#6B3E26]">
            Have a question or bulk inquiry?
          </h3>

          <a
            href="mailto:support@squrllbites.com"
            className="inline-block mt-6 bg-[#6B3E26] text-white px-8 py-4 rounded-full text-lg hover:bg-[#5a341f] transition shadow-md"
          >
            Email Our Support Team
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
