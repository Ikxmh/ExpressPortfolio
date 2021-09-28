function checkValueMissing()
{
    let name = document.forms["contact-form"]["name"].value;
    let email = document.forms["contact-form"]["email"].value;
    let subject = document.forms["contact-form"]["subject"].value;

    try
    {
        if ((name === '') || (name === null))
        {
            throw Error ('Name must be filled out');
        }

        if ((email === '') || (email === null))
        {
            throw Error ('Email must be filled out');
        }
        if((subject === '') || (subject === null))
        {
            throw Error ('Subject must be filled out');
        }
        window.alert("Thanks for the registration, your email has been sent successfully");
        return true;
    }

    catch(msgError)
    {
        window.alert(msgError.message);
        return false;
    }

}




console.log("hello");