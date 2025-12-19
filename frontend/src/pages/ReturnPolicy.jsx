const ReturnPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-sm">
      <p className="text-lg text-blue-600 font-medium pb-2">Return & Refund Policy</p>
      <h1 className="text-4xl md:text-5xl font-semibold text-slate-700 pb-6 text-center">
        Our Commitment to You
      </h1>
      <p className="text-sm md:text-base text-gray-500 text-center max-w-2xl pb-12">
        We want you to feel confident shopping with us. Please read our return and refund policy carefully.
      </p>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">1. Eligibility for Returns</h2>
        <p className="text-gray-600 leading-relaxed">
          Returns are accepted <span className="font-medium">only if the item is received in defective or damaged condition</span>. 
          Items must be unused and in their original packaging. Returns for “change of mind,” wrong size, or personal preference are not applicable.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">2. How to Initiate a Return</h2>
        <p className="text-gray-600 leading-relaxed">
          Contact our support team within <span className="font-medium">7 days of delivery</span> if your item is defective. 
          Please provide your order number, photos of the defective item, and a brief description of the issue. 
          Our team will review your request and provide return instructions.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">3. Return Shipping</h2>
        <p className="text-gray-600 leading-relaxed">
          If the item is confirmed defective, we will cover the return shipping costs. 
          Customers are responsible for safe packaging when sending the item back.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">4. Refunds</h2>
        <p className="text-gray-600 leading-relaxed">
          Refunds are processed only after the returned item is received and inspected. 
          Approved refunds will be issued within <span className="font-medium">5 business days</span> to the original payment method. 
          Depending on your bank or card issuer, additional time may be required for funds to appear.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">5. Exchanges</h2>
        <p className="text-gray-600 leading-relaxed">
          If stock is available, defective items may be replaced with a new unit instead of a refund. 
          Exchanges are subject to product availability.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">6. Non‑Returnable Items</h2>
        <p className="text-gray-600 leading-relaxed">
          Items that are used, altered, or not in their original packaging are not eligible for return. 
          Products returned due to <span className="font-medium">change of mind</span> or personal preference will not be accepted.
        </p>
      </section>

      <div className="mt-10">
        <a
          href="/contact"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default ReturnPolicy;