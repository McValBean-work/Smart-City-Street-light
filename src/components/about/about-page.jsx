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
<h1>🌍 About the Smart Citizen Platform</h1>

<p>
   <h3>Public spaces are the heartbeat of every community. </h3>
    The parks we relax in, the roads we travel, the streetlights that guide us home—they’re all part of a shared space that connects us. But just like anything we care about, these spaces need attention, care, and action.
</p>
<p>
    That’s where the Smart Citizen Platform comes in.
</p>

<p>
    This platform empowers everyday people—neighbors, friends, and families—to take an active role in looking after the public infrastructure that shapes our daily lives. With just a few simple steps, anyone can report an issue they see, whether it’s a broken streetlight or something else that needs fixing.
</p>

<p>
    You don’t need to be an expert. You just need to care.
</p>
<p>
    When one person speaks up, it creates a ripple effect. Small actions, like reporting a faulty light or damaged property, can lead to safer streets, better neighborhoods, and a stronger sense of community. This platform is built on the belief that we all have a part to play—and that when we show up for each other, our cities become better for everyone.
</p>


<p>
    <strong>Together, we protect what’s ours.  
    Together, we keep the light on.</strong>
</p>

</div>
</Main>
<Footer />


        </div>
    )
}