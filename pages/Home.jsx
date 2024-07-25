import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        console.log(response.data); // Log the response data to check its structure
        setBooks(response.data.data || response.data); // Adjust based on the actual structure
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className=''>
    
      <div className="flex justify-around items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
        <h1 className="text-5xl my-8 text-white">Books List</h1>
        
        <div className="flex gap-x-5">
        <button
          className="bg-sky-100 hover:bg-sky-300 px-4 py-2 mt-4 rounded-md"
          onClick={() => {
            setShowType("table");
          }}
        >
          TABLE
        </button>

        <button
          className="bg-sky-100 hover:bg-sky-300 px-5 py-1 mt-4 rounded-lg"
          onClick={() => {
            setShowType("card");
          }}
        >
          CARD
        </button>

        </div>
        
        <Link to="/books/create">
          <MdOutlineAddBox className="text-white text-4xl" />
        </Link>
        
      </div>
      <div className=' flex justify-center p-1 text-white fixed bottom-0 right-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...'>Book Management System</div>


      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
    
  );
};

export default Home;
