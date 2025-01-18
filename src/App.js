import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        { name: "Elegant Silk Saree 1", description: "A beautiful blend of tradition and modernity." },
        { name: "Vibrant Polyester Saree 2", description: "Perfect for any occasion." },
        { name: "Classic Silk Saree 3", description: "Timeless elegance in every thread." },
        { name: "Modern Polyester Saree 4", description: "Contemporary design meets comfort." },
        { name: "Luxurious Silk Saree 5", description: "The epitome of luxury and grace." },
        { name: "Chic Polyester Saree 6", description: "Stylish and easy to maintain." }
      ]
    };
  }

  render() {
    const { products } = this.state;

    return (
      <div>
        <section id="hero" className="section" style={{ background: 'linear-gradient(135deg, #8a2be2, #ff69b4)', color: 'white', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1>JK Traders</h1>
          <p>Exquisite Silk & Polyester Sarees</p>
        </section>

        <section id="about" className="section" style={{ backgroundColor: '#f8e5ff', textAlign: 'center' }}>
          <h2 style={{ color: '#8a2be2' }}>Our Legacy of Elegance</h2>
          <p>At JK Traders, we blend tradition with innovation to create sarees that are both timeless and contemporary. Our skilled artisans craft each piece with meticulous attention to detail, ensuring that every saree tells a unique story.</p>
          <div className="fabric-types" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <div className="fabric-type" style={{ backgroundColor: '#8a2be2', color: 'white' }}>Silk</div>
            <div className="fabric-type" style={{ backgroundColor: '#ff69b4', color: 'white' }}>Polyester</div>
          </div>
        </section>

        <section id="products" className="section" style={{ backgroundColor: 'white', textAlign: 'center' }}>
          <h2 style={{ color: '#8a2be2' }}>Our Exquisite Collection</h2>
          <div className="product-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
            {products.map((product, index) => (
              <div key={index} className="product-card" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', width: '300px' }}>
                <img src="/placeholder.svg?height=200&width=300" alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div className="product-info" style={{ padding: '15px' }}>
                  <h3 style={{ color: '#8a2be2', marginTop: '0' }}>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer style={{ backgroundColor: '#4b0082', color: 'white', textAlign: 'center', padding: '20px' }}>
          <p>JK Traders - Weaving Dreams into Reality</p>
          <p>&copy; 2023 JK Traders. All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
