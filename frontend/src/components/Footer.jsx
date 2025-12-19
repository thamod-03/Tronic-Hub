import { Link } from "react-router";
import { assets } from "../assets/assets";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 text-gray-600">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-10 flex flex-col md:flex-row justify-between gap-10">
        <div className="md:max-w-sm">
          <img
            src={assets.logo}
            alt="Tronic Hub Logo"
            className="w-50 mix-blend-multiply pb-4"
          />
          <p className="text-sm leading-relaxed text-gray-500 text-justify">
            Tronic Hub is your premier online destination for all things related
            to microcontroller-based projects, specializing in a wide array of
            high-quality electronics components. We are dedicated to providing
            builders, hobbyists, and professionals with reliable parts and a
            seamless shopping experience to fuel every project, from simple
            prototypes to complex systems.
          </p>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row md:justify-end gap-12">
          <div>
            <h2 className="font-semibold mb-4 text-gray-800">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-500 transition">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500 transition">
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="hover:text-blue-500 transition"
                >
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery-info"
                  className="hover:text-blue-500 transition"
                >
                  Delivery Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-4 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p className="hover:text-blue-500 transition">+94 77 94 53 532</p>
              <p className="hover:text-blue-500 transition">
                contact@tronichub.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 border-t border-gray-200">
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          © {year}{" "}
          <Link to="#" className="text-blue-500 hover:underline">
            Tronic Hub
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
