import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center p-4">
      {/* Image Section */}
      <img
        src={"/images/home.png"}
        alt="Home Page Image"
        className="w-full max-w-[600px] mx-auto mb-4"
      />

      {/* Header Section */}
      <header className="text-3xl font-bold my-4 text-center">
        Welcome to Drone Mission Manager
      </header>

      {/* Main Content Section */}
      <main className="text-center max-w-[500px] flex flex-col">
        <p className="text-lg mb-[70px]">
          Drones are revolutionizing various industries by providing innovative
          solutions that were previously unimaginable. From aerial photography
          and videography to agriculture, surveillance, and delivery services,
          drones are becoming an integral part of modern technology.
        </p>

        <a
          href="/auth/register"
          className="button px-5 py-2 mb-[150px] w-fit mx-auto"
        >
          Join Us
        </a>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Why Drones?</h2>
          <p>
            Drones offer a unique vantage point that can be leveraged for
            numerous applications. Their ability to capture high-resolution
            images and videos from the sky makes them invaluable for real
            estate, filmmaking, and news reporting. Moreover, drones equipped
            with sensors and cameras are used for precision agriculture, helping
            farmers monitor crop health and optimize yields.
          </p>
        </section>

        <section className="my-[70px] mb-[150px]">
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>
            Our mission is to advance drone technology and make it accessible to
            everyone. We are committed to providing high-quality drones that are
            reliable, efficient, and easy to use. Whether you are a hobbyist, a
            professional, or a business, we have the right drone solution for
            you.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Page;
