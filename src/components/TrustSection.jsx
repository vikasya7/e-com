// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#6B3E26] mb-12"
        >
          Why Squirll Bites?
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">🌿</div>
            <h4 className="font-semibold mb-2">100% Natural</h4>
            <p className="text-gray-600 text-sm">
              No preservatives. No artificial flavors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl mb-4">🔥</div>
            <h4 className="font-semibold mb-2">Roasted Not Fried</h4>
            <p className="text-gray-600 text-sm">
              Guilt-free crunch in every bite.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="font-semibold mb-2">Fast Delivery</h4>
            <p className="text-gray-600 text-sm">
              Freshly packed & shipped across India.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default TrustSection;