const DeliveryInformation = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-sm">
      <p className="text-lg text-blue-600 font-medium pb-2">
        Delivery Information
      </p>
      <h1 className="text-4xl md:text-5xl font-semibold text-slate-700 pb-6 text-center">
        Shipping & Delivery Details
      </h1>
      <p className="text-sm md:text-base text-gray-500 text-center max-w-2xl pb-12">
        We aim to make your shopping experience smooth and reliable. Here’s what
        you can expect when placing an order with us.
      </p>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          1. Delivery Times
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Most orders ship within{" "}
          <span className="font-medium">1–2 business days</span>. Delivery times
          may vary depending on your location and product availability.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          2. Shipping Costs
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Shipping costs are calculated at checkout based on your location and
          the size of your order. We strive to keep shipping fees fair and
          transparent.
        </p>
      </section>

      <section className="w-full max-w-5xl mb-12">
        <h2 className="text-2xl font-bold text-slate-700 mb-4">
          3. Tracking Your Order
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Once your order ships, you will receive a tracking number via email
          sent to your account’s registered email address. This allows you to
          monitor your delivery status in real time.
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
};

export default DeliveryInformation;
