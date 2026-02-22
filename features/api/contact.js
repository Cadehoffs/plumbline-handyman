export async function onRequestPost(context) {
    const formData = await context.request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    const emailBody = `
        New Contact Request:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}

        Message: 
        ${message}
    `;

        // Send email using Resend API
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: "Contact Form <onboarding@resend.dev>",
                to: ["plhandymansolutions@gmail.com"],
                subject: "New Contact Form Submission",
                text: emailBody
            })
        });

        if (!response.ok) {
            return new Response("Email failed to send. Please try again later.", { status: 500 });
        }

        return new Response("Form submitted successfully! Thank you for reaching out to us. We will get back to you as soon as possible.", { status: 200});
    }