import { motion } from "framer-motion";
import { Users, Target, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Image Grid Background */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-1 animate-pulse-slow">
          <div 
            className="col-span-2 row-span-2 bg-cover bg-center" 
            style={{ backgroundImage: "url('/grilled lobster.jpg')" }} 
          />
          <div 
            className="hidden md:block bg-cover bg-center" 
            style={{ backgroundImage: "url('/fresh green salad.jpg')" }} 
          />
          <div 
            className="bg-cover bg-center" 
            style={{ backgroundImage: "url('/sliced beef.jpg')" }} 
          />
          <div 
            className="bg-cover bg-center" 
            style={{ backgroundImage: "url('/Wings.jpg')" }} 
          />
          <div 
            className="hidden md:block bg-cover bg-center" 
            style={{ backgroundImage: "url('/poke bowl.jpg')" }} 
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative container mx-auto px-6 h-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              About FeastFlow
            </h1>
            <p className="text-xl md:text-3xl max-w-4xl mx-auto font-light drop-shadow-md text-gray-100">
              Connecting food lovers with passionate home chefs for authentic,
              delicious meals delivered to your door.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center text-base-content mb-12"
            >
              Our <span className="text-amber-glow-500">Story</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-base-content/80"
            >
              <p className="mb-6">
                FeastFlow was born from a simple idea: everyone deserves access
                to home-cooked, authentic meals without the hassle of cooking.
                We believe that the best food comes from passionate chefs who
                pour their heart into every dish.
              </p>
              <p className="mb-6">
                Founded in 2024, our platform connects talented home chefs with
                food enthusiasts looking for something special. Whether it's a
                traditional family recipe or a creative fusion dish, FeastFlow
                brings the magic of home-cooked meals to your table.
              </p>
              <p>
                Today, we serve thousands of happy customers and support
                hundreds of incredible chefs in building their culinary
                businesses from home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-base-200 p-8 rounded-2xl"
            >
              <Target className="w-12 h-12 text-amber-glow-500 mb-4" />
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Our Mission
              </h3>
              <p className="text-base-content/70">
                To empower home chefs and provide communities with access to
                diverse, authentic, and delicious home-cooked meals while
                fostering a sustainable food economy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-base-200 p-8 rounded-2xl"
            >
              <Heart className="w-12 h-12 text-amber-glow-500 mb-4" />
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Our Vision
              </h3>
              <p className="text-base-content/70">
                To become the world's most trusted platform connecting food
                lovers with passionate chefs, celebrating culinary diversity and
                home-cooked excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-base-content mb-12"
          >
            Our <span className="text-amber-glow-500">Values</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Community First",
                description:
                  "We believe in building strong connections between chefs and customers.",
              },
              {
                icon: Award,
                title: "Quality Excellence",
                description:
                  "Every meal is crafted with care, using fresh ingredients and authentic recipes.",
              },
              {
                icon: Heart,
                title: "Passion & Love",
                description:
                  "Food made with passion tastes better. We celebrate chefs who love what they do.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-base-100 p-6 rounded-xl text-center shadow-lg"
              >
                <value.icon className="w-12 h-12 text-amber-glow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-base-content mb-3">
                  {value.title}
                </h3>
                <p className="text-base-content/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-glow-500 to-amber-glow-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Home-Cooked Magic?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of happy customers enjoying delicious meals from
              passionate chefs.
            </p>
            <a
              href="/meals"
              className="inline-block bg-white text-amber-glow-500 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              Browse Meals
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
