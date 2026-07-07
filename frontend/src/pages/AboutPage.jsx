import React from "react";
import { Link } from "react-router-dom";
import {
    Award,
    Clock,
    Users,
    UtensilsCrossed,
    ArrowLeft,
} from "lucide-react";

const AboutPage = () => {
    return (
        <div className="bg-black text-white min-h-screen">

            {/* Hero */}

            <section
                className="relative h-[70vh] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/b10.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">

                    <Link
                        to="/"
                        className="absolute top-8 left-8 flex items-center gap-2 text-amber-400 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                        Back Home
                    </Link>

                    <p className="uppercase tracking-[6px] text-amber-400 mb-4">
                        Welcome To TreesFood
                    </p>

                    <h1 className="text-6xl font-bold mb-6">
                        ABOUT US
                    </h1>

                    <p className="max-w-3xl text-zinc-300 text-lg">
                        We believe great food brings people together. Every dish
                        is prepared with passion using fresh ingredients and
                        authentic recipes to create unforgettable dining
                        experiences.
                    </p>
                </div>
            </section>

            {/* Story */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid md:grid-cols-2 gap-16 items-center">

                    <img
                        src="/images/Chicken pasta.jpg"
                        alt="Restaurant"
                        className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                    />

                    <div>

                        <p className="uppercase tracking-[5px] text-amber-400 mb-3">
                            Our Story
                        </p>

                        <h2 className="text-5xl font-bold mb-6">
                            More Than Just A Restaurant
                        </h2>

                        <p className="text-zinc-400 leading-8 mb-6">
                            TreesFood started with one simple goal—to serve
                            delicious meals made from fresh ingredients while
                            providing exceptional customer service. We combine
                            traditional flavors with modern cooking techniques
                            to create dishes that our guests love.
                        </p>

                        <p className="text-zinc-400 leading-8">
                            Whether you're celebrating with family, dining with
                            friends, or enjoying a quick meal, we strive to
                            make every visit memorable.
                        </p>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="bg-zinc-950 py-24">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-16">

                        <p className="uppercase tracking-[5px] text-amber-400">
                            Why Choose Us
                        </p>

                        <h2 className="text-5xl font-bold mt-4">
                            What Makes Us Different
                        </h2>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                        <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 transition">

                            <UtensilsCrossed
                                size={50}
                                className="mx-auto text-amber-400 mb-5"
                            />

                            <h3 className="text-2xl font-semibold mb-3">
                                Fresh Ingredients
                            </h3>

                            <p className="text-zinc-400">
                                Every meal is prepared using carefully selected,
                                high-quality ingredients.
                            </p>

                        </div>

                        <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 transition">

                            <Award
                                size={50}
                                className="mx-auto text-amber-400 mb-5"
                            />

                            <h3 className="text-2xl font-semibold mb-3">
                                Quality Service
                            </h3>

                            <p className="text-zinc-400">
                                Friendly staff dedicated to making every visit
                                enjoyable.
                            </p>

                        </div>

                        <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 transition">

                            <Clock
                                size={50}
                                className="mx-auto text-amber-400 mb-5"
                            />

                            <h3 className="text-2xl font-semibold mb-3">
                                Fast Delivery
                            </h3>

                            <p className="text-zinc-400">
                                Fresh food delivered quickly without compromising
                                quality.
                            </p>

                        </div>

                        <div className="bg-zinc-900 rounded-3xl p-8 text-center hover:-translate-y-2 transition">

                            <Users
                                size={50}
                                className="mx-auto text-amber-400 mb-5"
                            />

                            <h3 className="text-2xl font-semibold mb-3">
                                Happy Customers
                            </h3>

                            <p className="text-zinc-400">
                                Thousands of satisfied guests continue to choose
                                TreesFood every day.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* Statistics */}

            <section className="py-24">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid md:grid-cols-4 gap-8 text-center">

                        <div>
                            <h2 className="text-5xl font-bold text-amber-400">
                                10+
                            </h2>
                            <p className="text-zinc-400 mt-3">
                                Years Experience
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-amber-400">
                                20K+
                            </h2>
                            <p className="text-zinc-400 mt-3">
                                Happy Customers
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-amber-400">
                                60+
                            </h2>
                            <p className="text-zinc-400 mt-3">
                                Signature Dishes
                            </p>
                        </div>

                        <div>
                            <h2 className="text-5xl font-bold text-amber-400">
                                4.9★
                            </h2>
                            <p className="text-zinc-400 mt-3">
                                Customer Rating
                            </p>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default AboutPage;