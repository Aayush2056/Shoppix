import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProductCard from '../components/ProductCard';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          'http://localhost:3000/api/products'
        );

        setProducts(res.data.slice(0, 4));

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchProducts();

  }, []);


  return (

    <div className="home-container">

      <div className="hero-banner">

        <h1>Welcome to Shoppix</h1>

        <p>
          Discover quality products at great prices.
        </p>

      </div>


      <h2>Featured Products</h2>


      {loading ? (

        <div>Loading...</div>

      ) : (

        <div className="product-grid">

          {products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Home;

