import emailjs from "emailjs-com";

export function sendEmail(username, email) {
  const templateId = "template_4rjr7qp"; // Reemplaza con el ID de tu plantilla de correo electrónico
  const serviceId = "service_u3x4khe"; // Reemplaza con el ID de tu servicio de emailjs
  const userId = "fkGNKhOBs70Hqf1AL"; // Reemplaza con tu ID de usuario de emailjs

  const templateParams = {
    to_name: username,
    message: "your account in Gambet was created successfully! ",
    from_name: "Gambet",
    to_email: email,
  };

  emailjs
    .send(serviceId, templateId, templateParams, userId)
    .then((response) => {
      console.log("Email sent", response.status, response.text);
    })
    .catch((error) => {
      console.log("Error while sending the email", error);
    });
}
