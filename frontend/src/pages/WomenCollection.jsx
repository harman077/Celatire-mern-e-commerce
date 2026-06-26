// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const WomenCollection = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setTimeout(() => {
//       const fetchProducts = [
//         {
//           id: 1,
//           name: "Stylish Leather Jacket",
//           image: "https://picsum.photos/300/300?random=1",
//           description: "Classic Denim Jacket",
//           price: "$59.99",
//         },
//         {
//           id: 2,
//           name: "Slim Fit T-Shirt",
//           image: "https://picsum.photos/300/300?random=2",
//           description: "Slim Fit T-Shirt",
//           price: "$19.99",
//         },
//         {
//           id: 3,
//           name: "Casual Chino Pants",
//           image: "https://picsum.photos/300/300?random=3",
//           description: "Casual Chino Pants",
//           price: "$39.99",
//         },
//         {
//           id: 4,
//           name: "Leather Boots",
//           image: "https://picsum.photos/300/300?random=4",
//           description: "Leather Boots",
//           price: "$89.99",
//         },
//       ];
//       setProducts(fetchProducts);
//     }, 1000);
//   }, []);

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">Women's Collection</h2>
//       <div className="row">
//         {products.map((product) => (
//           <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
//             <Link
//               to={`/product/${product.id}`}
//               className="text-decoration-none text-dark"
//             >
//               <div className="card h-100 shadow-sm">
//                 <img
//                   src={product.image}
//                   alt={product.description}
//                   className="card-img-top"
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{product.description}</h5>
//                   <p className="card-text text-success fw-bold">
//                     {product.price}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WomenCollection;
