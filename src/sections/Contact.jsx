import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
    const formRef = useRef();

    const { alert, showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .send(
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: 'Dinesh Peram',
                    from_email: form.email,
                    to_email: 'pdreddy972@gmail.com',
                    message: form.message,
                },
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
            )
            .then(
                () => {
                    setLoading(false);
                    showAlert({
                        show: true,
                        text: 'Thank you for your message 😃',
                        type: 'success',
                    });

                    setTimeout(() => {
                        hideAlert(false);
                        setForm({
                            name: '',
                            email: '',
                            message: '',
                        });
                    }, [3000]);
                },
                (error) => {
                    setLoading(false);
                    console.error(error);

                    showAlert({
                        show: true,
                        text: "I didn't receive your message 😢",
                        type: 'danger',
                    });
                },
            );
    };

    return (
        <section className="c-space my-20" id="contact">
            {alert.show && <Alert {...alert} />}

            <div className="relative min-h-screen flex items-center justify-center flex-col">
                {/* Adjusting the image to act as a background */}
                <img
                    src="/assets/terminal.png"
                    alt="terminal-bg"
                    className="absolute inset-0 w-full h-full object-cover" // Ensures the image covers the entire section
                />

                {/* Wrapping the content in a container to position it over the image */}
                <div
                    className="relative z-10 contact-container bg-opacity-80 p-8 rounded-lg max-w-3xl w-full">
                    <h3 className="head-text text-center text-white">Let&apos;s talk</h3>
                    <p className="text-lg text-white mt-3 text-center">
                        Whether you’re looking to build a new website, improve your existing platform, or bring a unique
                        project to
                        life, I’m here to help.
                    </p>

                    {/* Form container */}
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="mt-12 flex flex-col space-y-7"
                    >
                        <label className="space-y-3">
                            <span className="field-label text-white">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input bg-white/80 text-black p-3 rounded-md"
                                placeholder="ex., John Doe"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label text-white">Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input bg-white/80 text-black p-3 rounded-md"
                                placeholder="ex., johndoe@gmail.com"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label text-white">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input bg-white/80 text-black p-3 rounded-md"
                                placeholder="Share your thoughts or inquiries..."
                            />
                        </label>

                        <button
                            className="field-btn bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}

                            <img src="/assets/arrow-up.png" alt="arrow-up" className="inline ml-2"/>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;