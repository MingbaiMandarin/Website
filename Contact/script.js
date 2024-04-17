function sendEmail() {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Validate email format
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    
    // Validate email, subject, and message fields
    if (!email || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    Email.send({    
        Host: "smtp.elasticemail.com",
        Username: "mingbaimandarin@gmail.com",
        Password: "A3F971B721CD848F845029164C80D09740C6",
        //secureToken: "b3823e6c-f2f0-4996-a4d7-4843668ba3e1",
        To: 'mingbaimandarin@gmail.com',
        From: 'mingbaimandarin@gmail.com',
        Subject: subject,
        Body: "Name: " + name
               + "<br> Email: " + email
               + "<br> Message: " 
               + "<br>" + message 
    }).then(
        message => {
            console.log(message);
            alert("Message Sent Successfully");
        }
    ).catch(
        error => {
            console.error(error);
            alert("An error occurred. Please try again later.");
        }
    );

    function isValidEmail(email) {
        // Regular expression for basic email validation
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }
}
