import React from 'react'
import ProductCard from './ProductCard';

const MayAlsoLike = ({ products, slug }) => {
    return (
        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>

            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map(val => {
                        if (val.slug.current != slug) {
                            return <ProductCard key={val._id} val={val} />;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default MayAlsoLike