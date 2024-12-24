import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <div>
        <p>
          For enquiries please contact the email below or simply reach out to us
          using the 'Contact' form in the app
        </p>
        <a href="mailto:contact@hideousgifts.com">contact@hideousgifts.com</a>
      </div>
    </div>
  );
};

export default Contact;
