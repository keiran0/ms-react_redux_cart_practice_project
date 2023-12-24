import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    title: 'Test',
    price: 6,
    description:'This is a first product - amazing!'
  },
  {
    title: 'Book',
    price: 12,
    description:'This is a book'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product)=> <ProductItem key={product.title} title={product.title} price={product.price} description={product.description}/>)}
      </ul>
    </section>
  );
};

export default Products;
