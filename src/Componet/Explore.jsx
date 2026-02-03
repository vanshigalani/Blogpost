import { useState, useEffect, useContext } from "react";
import "./Explore.css";
import { IoSearchSharp } from "react-icons/io5";
import Card from "./Card";
import Pagination from "./Pagination";
import ConfirmationModel from "./ConfirmationModel";
import { FaArrowCircleUp } from "react-icons/fa";
import { ModeContext } from "../Cotext/ModeContext";


const Explore = () => {

  const [Explore, setExplore] = useState({
    title: "",
    body: "",
    image:"",
  });

  const [error, seterror] = useState({
    title: "",
    body: "",
    image:"",
  });
       const ctx = useContext(ModeContext);

  const [postId, setPostId] = useState(null);
  const [postdata, setPostdata] = useState([]);
  const [FilterPost, setFilterPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 
  const [search, setSearch] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(10);
  const [showform, setshowform] = useState(false);


  const handelSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);

    const result = postdata.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.body.toLowerCase().includes(value.toLowerCase())
    );

    setFilterPost(result);
  };


  const handaleChange = (field, value) => {
    seterror((e) => ({ ...e, [field]: "" }));
    setExplore({ ...Explore, [field]: value });
  };
  const handaleCalncel = () => {
    setExplore({
      title: "",
      body: "",
      image:"",
    });
    seterror({});
    setshowform(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        
        "https://696b4bc2624d7ddccaa0bec3.mockapi.io/explorepost"
      );
      
      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }

      const data = await response.json();
      const reversedData = [...data].reverse();
    setPostdata(reversedData);
    setFilterPost(reversedData);
      
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startIndex = (CurrentPage - 1) * PostPerPage;
  const totalPages = Math.ceil(FilterPost.length / PostPerPage);

  
  const scrollTosection = (id) => {
    const element = document.getElementById(id);
    if(element){
      element.scrollIntoView({ behavior:'smooth'});
    }
  };


const handaleSubmit = async (e) => {
  e.preventDefault();
 console.log("SUBMITTED DATA:", Explore);
  const newError = {};
  if (!Explore.title.trim()) newError.title = "Title is required";
  if (!Explore.body.trim()) newError.body = "Body is required";

  seterror(newError);
  if (Object.keys(newError).length > 0) return;

  try {
    setLoading(true);

    const response = await fetch(
     postId?`https://696b4bc2624d7ddccaa0bec3.mockapi.io/explorepost/${postId}`: "https://696b4bc2624d7ddccaa0bec3.mockapi.io/explorepost",
      {
        method: postId ? "PUT":"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: Explore.title,
          body: Explore.body,
          image:postId ? Explore.image: `https://picsum.photos/200/300?random=${Date.now()}`,
        }),
      }
    );

    const data = await response.json();
    setPostdata((prev) => [data, ...prev]);
    setFilterPost((prev) => [data, ...prev]);
    
    setExplore({ title: "", body: "" });
    seterror({});
  } catch (err) {
    console.log("Error:", err);
  } finally {
    setLoading(false);
  }
};

const postDataGetById = async (id) => {
  try{
    setLoading(true);
    setPostId(id);
    const response =await fetch(
      `https://696b4bc2624d7ddccaa0bec3.mockapi.io/explorepost/${id}`,
      { method:"GET"}

    )
    if (!response.ok){
      throw new error("Failed to fetch post by id");
    }
    const data =await response.json();
    setExplore({
      title:data.title || "",
      body:data.body || "",
      image:data.image || "",
    });
    setshowform(true);
}catch (error){
  console.error("GET BY ID API Error", error.message);
  }finally{
    setLoading(false);
  }
};
  function openDeleteModel(index) {
    console.log("Opening modal for index:", index);
    setPostId(index);
    setShowModal(true);
  }
const deletePostByID = async () => {
  try{
    setLoading(true);
    
    const response =await fetch(

      `https://696b4bc2624d7ddccaa0bec3.mockapi.io/explorepost/${postId}`,
      {
         method:"DELETE",
        }

    );
    if (!response.ok){
      Toaster.error("failed to delete post");
    }
   await response.json();
   alert("post delet successfully");
   //refresh list
   setShowModal(false)
   fetchData();
  
}catch (error){
  console.error("DELET API Error", error.message);
  }finally{
    setLoading(false);
  }
};


  return (
    <>
      <span id ="top"></span>
      <div className={`explore-header ${ctx.mode}`}>
        <h2 className={`h2 ${ctx.mode}`}>Explore Post</h2>

       
        <div className="search-box">
          <IoSearchSharp className="search-icon" />
          <input
            type="text"
            placeholder="Search post..."
            value={search}
            onChange={handelSearch}
          />
        </div>
       
      
        </div>
     
     <div className={`create-form ${ctx.mode}`}>
      <button type="button" 
          onClick={() => setshowform(true)}
          className="page-btn1">
            Create Form
          </button> </div>
     
      
      {showform && (
      <div>
          
        <form
        className={`frm ${ctx.mode}`} onSubmit={handaleSubmit}>
          <br />
          <br />

          <input
            className="input1"
            type="text"
            placeholder="Enter Title"
            value={Explore.title}
            onChange={(e) => handaleChange("title", e.target.value)}
          />
          {error.title && <span className="error">{error.title}</span>}
          <br />
       

          <textarea
            className="input1"
            placeholder="Enter Body"
            value={Explore.body}
            onChange={(e) => handaleChange("body", e.target.value)}
          ></textarea>
          {error.body && <span className="error">{error.body}</span>}
          <br />
         
<div className="btn-class">
          <button type="submit" className="page-btn1">
            Submit
          </button>
          <button type="button" className="page-btn2"
          onClick={handaleCalncel}
          >
            Cancel
          </button></div>
          
        </form>
    
          </div>
        )}

      {/* POSTS */}
      <div className={`explore-container ${ctx.mode }`}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          FilterPost.slice(startIndex, startIndex + PostPerPage)
         .map((item, index) => (
        <Card key={index} data={item} 
           title={item.title}
                desc={item.body}
                id={item.id}
                from="explore"
                onEdit={() => postDataGetById(item.id)}
                onDelete={() => openDeleteModel(item?.id)}
              />
            )
          )
        )}
      </div>

      {showModal && (
        <ConfirmationModel
        title="delete?"
        desc="you are sure you want to delete this post? 
        this action cannot be undone"
        onConfirm={deletePostByID}
        onclose={() => {setShowModal(false); setPostId(null) }}
        confirmBtnText="Delete"
        />
      )}

   
      <Pagination
        CurrentPage={CurrentPage}
        totalPages={totalPages}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
        PostPerPage={PostPerPage}
        setPostPerPage={setPostPerPage}
      />

      <span className="arrow" onClick ={()=>{scrollTosection ("top")}} ><FaArrowCircleUp /></span>
    </>
  );
};

export default Explore;


