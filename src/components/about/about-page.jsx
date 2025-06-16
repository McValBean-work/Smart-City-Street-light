import LandingHeader from "../landing-page/landing-header";
import './about-page.css'
import Main from '../layout/main'
import Footer from '../layout/footer'
import '../layout/user-layout.css'

 export default function AboutPage() {
    return (
<div className='user-grid-layout'>
<LandingHeader />
<Main>
<div className="about-section">

            <h2 class="about-title"> About Smart City Platform </h2>
        <div class="content-section">
            <h3 class="section-heading">Our Mission</h3>
            <p class="section-text">
                Smart City Platform is dedicated to enhancing community living by providing a streamlined platform for reporting and resolving public property maintenance issues. Our mission is to empower citizens to actively participate in maintaining their neighborhoods, ensuring a safe and well-kept environment for everyone.
            </p>
        </div>
        <div class="content-section">
            <h3 class="section-heading">How It Works</h3>
            <p class="section-text">
            Smart City Platform simplifies the process of reporting issues such as potholes, graffiti, or damaged street signs. Users can easily submit reports with detailed descriptions and photos, track the progress of their reports, and receive updates on resolutions. Our platform connects citizens with the relevant city departments, fostering transparency and accountability in public property maintenance.
            </p>
        </div>
        <div class="content-section">
            <h3 class="section-heading">Our Team</h3>
            <p class="section-text">
                Smart City Platform is developed and maintained by a dedicated team of urban planners, software engineers, and community advocates. We are passionate about leveraging technology to improve civic engagement and create more livable cities. Our team collaborates closely with city officials and community groups to ensure the platform meets the needs of all stakeholders.
            </p>
        </div>
        <div class="content-section">
            <h3 class="section-heading">Contact Us</h3>
            <p class="section-text">
                For questions, feedback, or support, please reach out to us at support@smartcityplatform.com. We value your input and are committed to continuously improving Smart City Platform to better serve our community.
            </p>
        </div>
        </div>
</Main>
<Footer />
</div>
  )
}