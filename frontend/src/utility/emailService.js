import emailjs from "emailjs-com";

export const sendContactEmail = async (formRef) => {
  try {
    const result = await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    return { success: true, result };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, error };
  }
};
