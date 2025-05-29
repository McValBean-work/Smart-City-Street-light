import './contact-us.css'

function ContactUsForm(){
    return(
        <>
        <form action="" className='contact-us-form'>
            <h1 className='form-header'>Reach Out To Us</h1>
            <label htmlFor="FirstName">First Name</label>
            <input type="text" placeholder='Enter Your First Name' required/>
            <label htmlFor="LastName">Last Name</label>
            <input type="text" placeholder='Enter Your Last Name' required/>
            <label htmlFor="EmailAddress">Email Address</label>
            <input type="text" placeholder='Enter Email Address' required/>
            <label htmlFor="PhoneNumber">Phone Number</label>
            <input type="text" name="" id="" placeholder='Enter Your Phone Number' required/>
            <label htmlFor="Message">Message</label>
            <textarea name="" id="" placeholder="Enter message" required/>
            <input type="submit" className='submit' />
        </form>
        </>
    )
}
export default ContactUsForm;