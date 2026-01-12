import { motion } from "framer-motion";
import { Link } from "react-router";

export default function Legal() {
  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl font-bold mb-4"
          >
            Privacy & Terms
          </motion.h1>
          <p className="text-base-content/70">Last updated: January 2026</p>
        </div>

        {/* Legal Content */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="space-y-12"
        >
          {/* Privacy Policy */}
          <section id="privacy" className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-amber-glow-500 mb-6">Privacy Policy</h2>
            <p>
              At FeastFlow, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website or use our services.
            </p>
            <h3>1. Information We Collect</h3>
            <p>
              We collect information that you provide directly to us when you register for an account, create or modify your profile, make a purchase, or communicate with us. This may include:
            </p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Payment information (processed securely by third-party providers)</li>
              <li>Delivery address and location data</li>
              <li>Profile information and preferences</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>
              We use the information we collect to:
            </p>
             <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <hr className="border-base-300" />

          {/* Terms of Service */}
          <section id="terms" className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-amber-glow-500 mb-6">Terms of Service</h2>
            <p>
              Please read these Terms of Service carefully before using FeastFlow. By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h3>2. User Accounts</h3>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms.
            </p>
            
            <h3>3. Food Safety & Liability</h3>
            <p>
              FeastFlow acts as a platform connecting home chefs with customers. while we vet our chefs, the compliance with local food safety regulations is the responsibility of each individual chef.
            </p>
          </section>
        </motion.div>

         <div className="mt-16 bg-base-200 p-8 rounded-2xl text-center">
            <h3 className="font-bold mb-2">Have questions about our legal policies?</h3>
            <Link to="/contact" className="text-amber-glow-500 font-bold hover:underline">Contact our Legal Team</Link>
         </div>

      </div>
    </div>
  );
}
