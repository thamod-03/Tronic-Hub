import { useRef, useState } from "react";
import { sendContactEmail } from "../utility/emailService";
import { toast } from "react-toastify";

const ContactUs = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await sendContactEmail(form);

    if (response.success) {
      toast.success("Message sent successfully!");
      form.current.reset();
    } else {
      toast.error("Failed to send message. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6 py-20">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <p className="text-lg text-blue-600 font-medium pb-2">Contact Us</p>
        <h1 className="text-3xl font-semibold text-slate-700 pb-4 text-center">
          Get in touch with us
        </h1>
        <p className="text-sm text-gray-500 text-center pb-6">
          Have questions or need assistance? Fill out the form below and our team
          will get back to you shortly.
        </p>

        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="text-black/70" htmlFor="first_name">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              required
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-blue-400"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-black/70" htmlFor="last_name">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              required
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-blue-400"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-black/70" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-blue-400"
            />
          </div>

          {/* Message Title (below email, full width) */}
          <div>
            <label className="text-black/70" htmlFor="title">
              Message Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-blue-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-black/70" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              className="w-full mt-2 p-2 border border-gray-500/30 rounded resize-none outline-none focus:border-blue-400"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white h-12 px-4 rounded active:scale-95 transition hover:bg-blue-600"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
