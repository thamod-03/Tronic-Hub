import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-sm">
      <p className="text-lg text-blue-600 font-medium pb-2">About Us</p>
      <h1 className="text-4xl md:text-5xl font-semibold text-slate-700 pb-6 text-center">
        Discover Our Journey
      </h1>
      <p className="text-sm md:text-base text-gray-500 text-center max-w-2xl pb-12">
        We believe in building more than just an online store. Our mission is to
        create meaningful experiences, foster trust, and deliver delight with
        every product.
      </p>

      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          From humble beginnings, we started with a vision to bring quality
          products closer to people who value authenticity and care. What began
          as a small idea has grown into a thriving platform, connecting
          customers with items that inspire joy and confidence. Every step of
          our journey has been guided by passion, innovation, and a commitment
          to excellence.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Our Values</h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-inside">
          <li>
            <span className="font-medium text-slate-700">Integrity:</span> We
            believe in transparency, honesty, and ethical practices.
          </li>
          <li>
            <span className="font-medium text-slate-700">Quality:</span> Every
            product is carefully curated to meet high standards.
          </li>
          <li>
            <span className="font-medium text-slate-700">Customer First:</span>{" "}
            Your satisfaction drives our decisions and inspires our growth.
          </li>
          <li>
            <span className="font-medium text-slate-700">Innovation:</span> We
            embrace change and continuously improve to serve you better.
          </li>
        </ul>
      </section>

      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Our mission is simple: to deliver products that enrich lives while
          ensuring a seamless and enjoyable shopping experience. We aim to
          empower customers with choice, reliability, and trust — making every
          purchase a step toward a more fulfilling lifestyle.
        </p>
      </section>

      <div className="mt-10">
        <Link
          to="/products"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Explore Our Products
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
