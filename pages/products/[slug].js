import React, { useState } from 'react'
import { useRouter } from "next/router";
import { client, urlFor } from '../../lib/client';
import { AiFillStar, AiOutlineStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import MayAlsoLike from '../../components/MayAlsoLike';
import { useStateContext } from '../../context/MyStateContext';

const Slug = ({ products, product: { _id, description, image, name, price } }) => {

    const { qty, manageQty, addItemToCart } = useStateContext();

    const [currentImage, setCurrentImage] = useState(0);

    const resp = useRouter();
    const { slug } = resp.query;

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <img src={urlFor(image[currentImage].asset._ref)} alt={name} className="product-detail-image" />
                    <div className="small-images-container">
                        {image.map((val, index) => (
                            <img key={index} onClick={() => setCurrentImage(index)} className={index == currentImage ? "small-image selected-image" : "small-image"} src={urlFor(val.asset._ref)} alt={name} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="product-detail-desc">
                        <h1>{name}</h1>
                        {/* <p>{description}</p> */}
                        <div className="reviews">
                            <div>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiOutlineStar />
                            </div>
                            <p>(8)</p>
                        </div>
                        {/* <h4>Details: </h4> */}
                        <p>{description}</p>
                        <p className="price">₹ {price}</p>

                        <div className="quantity">
                            <h4>Quantity : </h4>
                            <p className="quantity-desc">
                                <span className="minus" onClick={() => manageQty('dec')}><AiOutlineMinus /></span>
                                <span className="num">{qty}</span>
                                <span className="plus" onClick={() => manageQty('inc')}><AiOutlinePlus /></span>
                            </p>
                        </div>

                        <div className="buttons">
                            <button type="button" className='add-to-cart' onClick={() => addItemToCart(name, _id, qty, price, image[0].asset._ref, 'add')}>Add to cart</button>
                            <button type="button" className='buy-now'>Buy now</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* slug is passed, so that the main product is not shown in may also like section  */}
            <MayAlsoLike products={products} slug={slug} />
        </div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
}

export default Slug