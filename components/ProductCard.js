// import Image from "next/image";
import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const ProductCard = ({
    val: { _id, description, image, name, price, slug }
}) => {
    return (
        <div>
            <Link href={`/products/${slug.current}`}>
                <div className="product-card">
                    <img
                        className="product-image"
                        src={urlFor(image && image[0])}
                        alt={name}
                        width={250}
                        height={250}
                    />
                    <h4 className="product-name">{name.length > 24 ? name.slice(0, 25) + "..." : name}</h4>
                    <p className="product-price">₹ {price}</p>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
