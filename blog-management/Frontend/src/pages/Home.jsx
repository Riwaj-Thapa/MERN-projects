// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   useEffect(()=>{
//     const fetchAllBlog = async()=>{
//       const res = await axios.get(
//         "http://localhost:8000/api/blogs/allBlogs",
//         {
//           headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`
//           },
//         }
//       );
//       setBlogs(res.data);

//     };
//     fetchAllBlog();

//   },[])
//   return (
//     <>
//       <main className="my-5">
//         <div className="container shadow-lg">
//           <section className="text-center">
//             <h2 className="mb-5 my-3">
//               <strong>Latest posts</strong>
//             </h2>

//             <div className="row">
//               {blogs && blogs.length>0
//               ? blogs.map((item)=>{
//                 return (<div className="col-lg-4 col-md-12 mb-4">
//                   <div className="card">
//                     <div
//                       className="bg-image hover-overlay ripple"
//                       data-mdb-ripple-color="light"
//                     >
//                       <img
//                         src={`http://localhost:8000/${item.thumbnail}`}
//                         className="img-fluid"
//                         alt="user icon"
//                       />
//                       <a href="#!">
//                         <div
//                           className="mask"
//                           style={{
//                             backgroundColor: 'rgba(251, 251, 251, 0.15)',
//                           }}
//                         ></div>
//                       </a>
//                     </div>
//                     <div className="card-body">
//                       <h5 className="card-title">{item.title}</h5>
//                       <p className="card-text">{item.description}</p>
//                       <Link to={`/blog/${item._id}`} className="btn btn-primary">
//                         Read More
//                       </Link>
//                     </div>
//                   </div>
//                 </div>)

//               }):
//               <h2>No Blogs yet :( </h2>}

//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/blogs/allBlogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched blogs data:", res.data); // Log data to check the structure
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlog();
  }, []);

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest posts</strong>
            </h2>

            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
                    <div className="card">
                      <div
                        className="bg-image hover-overlay ripple"
                        data-mdb-ripple-color="light"
                      >
                        <h5 className="card-title">{item.title}</h5>
                        <img
                          src={`http://localhost:8000/${item.thumbnail}`}
                          className="img-fluid"
                          alt="user icon"
                        />
                      </div>
                      <div className="card-body">
                        <p className="card-text">Description : {item.description}</p>
                        <Link
                          to={`/blog/${item._id}`}
                          className="btn btn-dark"
                        >
                          View more...
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>No Blogs yet :(</h2>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
