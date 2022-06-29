import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from '../components/Footer';
import { client } from "../lib/client";

export default function IndexPage({ pd, bd }) {
  return (
    <div>
      <Banner bannerData={bd[0]} />

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <div className="products-container">
          {pd.map((val) => (
            <ProductCard key={val._id} val={val} />
          ))}
        </div>
      </div>

    </div>
  );
}

export const getServerSideProps = async () => {
  const pd = await client.fetch('*[_type == "product"]');
  const bd = await client.fetch('*[_type == "banner"]');

  return {
    props: { pd, bd }
  };
};