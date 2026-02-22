export async function onRequestPost(context) {
  console.log("Contact form endpoint hit");

  try {
    const formData = await context.request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    console.log("Form data received:", name, email);

    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.log("Missing RESEND_API_KEY");
      return new Response("Server configuration error", { status: 500 });
    }

    const emailBody = `
New Contact Request:

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Contact Form <webform@contact.plhandymansolutions.com>",
        to: ["plhandymansolutions@gmail.com"],
        subject: "New Contact Form Submission",
        text: emailBody
      })
    });

    const result = await response.text();
    console.log("Resend response:", result);

    if (!response.ok) {
      return new Response("Email failed to send", { status: 500 });
    }

    return new Response("Success", { status: 200 });

  } catch (err) {
    console.log("Function error:", err);
    return new Response("Server error", { status: 500 });
  }
}