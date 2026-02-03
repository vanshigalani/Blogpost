import './PostDeatilPage.css'
import { useContext, useEffect, useState } from 'react';
import ConfirmationModel from './ConfirmationModel';
import { useParams, useNavigate } from 'react-router-dom';
import { ModeContext } from '../Cotext/ModeContext';


const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const loggedInuser = JSON.parse(localStorage.getItem("logindata")) || {};
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const postData = JSON.parse(localStorage.getItem("postData")) || [];
       const ctx = useContext(ModeContext);

  useEffect(() => {
    const filtered = postData.find(
      item => String(item.id) === String(postId)
    );
    console.log({ postData, postId, filtered });

    if (filtered) setCurrentPost(filtered);

  }, [postId, localStorage]);

  const confirmDelete = () => {
    const updatedData = postData.filter(
      item => String(item.id) !== String(postId)
    );

    localStorage.setItem("postData", JSON.stringify(updatedData));
    setShowModal(false);
    navigate("/");
  };

  if (!currentPost) return <h2>Post not found</h2>;
  const handleEdit =(id)=> {
    console.log("id",id);
    navigate("/Post", {state:{id : postId}})
  }

  return (
    <>
  
  <div className={`body ${ctx.mode}`}>
  <div className={`post-container ${ctx.mode}`}>
        <div className='post-left'>
          <img className='img' src={currentPost.image} alt='post' />
        </div>

        <div className='post-right'>
          <h1>{currentPost.title}</h1>
          <p>{currentPost.body}</p>
          {loggedInuser?.role === "Admin" ? 
          <div className={`btnpost ${ctx.mode}`}>

            <button className="btnedit" onClick={handleEdit} >Edit</button>
            <button
              className='btndelet'
              onClick={() => setShowModal(true)}>
              Delete
            </button>
            
          </div>
        :<></>}
        </div>
      </div></div>

      {showModal && (
        <ConfirmationModel
          title="Delete?"
          desc="Are you sure you want to delete this post?"
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
          confirmBtnText="Delete"
          

        />
      )}
    </>
  );
};

export default PostDetail;
