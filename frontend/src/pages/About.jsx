import React from "react";

// CLASS COMPONENT (required by the rubric).
// It uses a constructor, this.state, this.setState, componentDidMount and render().
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      stats: [
        { value: "120+", label: "Properties Listed" },
        { value: "80+", label: "Happy Customers" },
        { value: "5+", label: "Years of Experience" },
      ],
      services: [
        { title: "Buy Property", text: "Find the best properties to buy." },
        { title: "Rent Property", text: "Choose from various rental options." },
        { title: "Property Consultation", text: "Get expert advice and guidance." },
      ],
    };
    // bind so "this" works inside the click handler
    this.toggleMore = this.toggleMore.bind(this);
  }

  // Lifecycle method: runs once after the page is shown
  componentDidMount() {
    document.title = "About - EstateHub";
  }

  // Event handler: show / hide the mission text
  toggleMore() {
    this.setState({ showMore: !this.state.showMore });
  }

  render() {
    return (
      <div className="container section">
        <h1 className="page-title">About EstateHub</h1>
        <p className="page-subtitle">We help people find their dream homes with ease and trust.</p>

        <div className="about-top">
          <div>
            <p>
              EstateHub is a simple and reliable real estate platform that connects buyers and
              renters with the right properties. Our goal is to make property searching easy,
              transparent and convenient for everyone.
            </p>

            <button className="btn btn-outline" onClick={this.toggleMore}>
              {this.state.showMore ? "Hide Mission" : "Read Our Mission"}
            </button>

            {this.state.showMore && (
              <p className="mission">
                <strong>Our Mission:</strong> To help every family find a home that fits their
                budget, with honest information and no hidden surprises.
              </p>
            )}
          </div>
          <img
            className="about-image"
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80"
            alt="Modern house"
          />
        </div>

        <div className="stats">
          {this.state.stats.map((stat) => (
            <div className="stat-box" key={stat.label}>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <h2>Our Services</h2>
        <div className="services">
          {this.state.services.map((service) => (
            <div className="service-box" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default About;
