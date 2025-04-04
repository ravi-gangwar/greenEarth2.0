"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaHandHoldingHeart, FaGlobe } from "react-icons/fa";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
      <motion.section {...fadeIn} className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            At Green Earth, we&apos;re dedicated to making the world a greener
            place, one plant at a time. Our mission is to provide high-quality
            plants and expert guidance to help you create your own sustainable
            garden.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            {...fadeIn}
            className="bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <FaLeaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Quality Plants
            </h3>
            <p className="text-gray-600 text-lg">
              We carefully select and nurture each plant to ensure the highest
              quality for our customers.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <FaHandHoldingHeart className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Expert Care
            </h3>
            <p className="text-gray-600 text-lg">
              Our team of experts provides guidance and support to help your
              plants thrive.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transition-shadow duration-300"
          >
            <FaGlobe className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Sustainability
            </h3>
            <p className="text-gray-600 text-lg">
              We&apos;re committed to sustainable practices and environmental
              conservation.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        {...fadeIn}
        className="bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)] py-16"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeIn} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Environmental Stewardship
                </h3>
                <p className="text-gray-600 text-lg">
                  We believe in responsible environmental practices and
                  promoting biodiversity.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FaHandHoldingHeart className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600 text-lg">
                  Your satisfaction is our priority. We provide exceptional
                  service and support.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
