export async function onRequestpost(context) {
    const formData = await context.request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const body = `
        New Contact Request:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}

        Message: 
        ${message}
    `;

    // For now, just jog it (we will wire it to email next)
    console.log(body);

    return new Response("Form submitted successfully! Thank you for reaching out to us. We will get back to you as soon as possible.", { status: 200});
    }