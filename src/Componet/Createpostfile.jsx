import { useState, useEffect, useContext } from 'react';
import './Createpostfile.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';
import loader from '../assets/cat Mark loading.gif';
import { ModeContext } from '../Cotext/ModeContext';

const Createpostfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
     const ctx = useContext(ModeContext);
  const [createPostFormData, setcreatePostFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const [error, seterror] = useState({});
  const [loading, setLoading] = useState(false);

  const editPostId = location.state?.id || null;

  // ================= EDIT MODE =================
  useEffect(() => {
    if (!editPostId) return;

    const post = JSON.parse(localStorage.getItem("postData")) || [];
    const postTOEdit = post.find((p) => p.id === editPostId);

    if (postTOEdit) {
      setcreatePostFormData({
        title: postTOEdit.title,
        body: postTOEdit.body,
        image: postTOEdit.image,
      });
    }
  }, [editPostId]);

  // ================= INPUT CHANGE =================
  const handaleChange = (field, value) => {
    seterror((e) => ({ ...e, [field]: "" }));
    setcreatePostFormData({ ...createPostFormData, [field]: value });
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (file) => {
    if (!file) return;

    const allowedType = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedType.includes(file.type)) {
      seterror((e) => ({
        ...e,
        image: "only PNG,JPG,JPEG image are allowed",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setcreatePostFormData({ ...createPostFormData, image: reader.result });
      seterror((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  // ================= SUBMIT =================
  const handaleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // ✅ LOADER START

    const newError = {};
    if (!createPostFormData.title.trim()) newError.title = "title is required";
    if (!createPostFormData.body.trim()) newError.body = "body is required";
    if (!createPostFormData.image.trim()) newError.image = "image is required";

    seterror(newError);

    if (Object.keys(newError).length > 0) {
      setLoading(false); // ❌ validation fail
      return;
    }

    const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

    // ===== EDIT POST =====
    if (editPostId) {
      const updatedPosts = existingPosts.map((p) =>
        p.id === editPostId ? { ...p, ...createPostFormData } : p
      );

      localStorage.setItem("postData", JSON.stringify(updatedPosts));
      setLoading(false);
      navigate("/");
      return;
    }

    // ADD NEW POST
    const updatedPosts = [
      ...existingPosts,
      { id: uuidv4(), ...createPostFormData },
    ];

    localStorage.setItem("postData", JSON.stringify(updatedPosts));

    toast.success("Post Added Successfully");

    setTimeout(() => {
      setLoading(false); 
      navigate("/");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      {/* LOADER */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "88vh",
            backgroundColor: "rgba(15, 14, 14, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img src={loader} alt="Loading..." style={{ width: 180 }} />
          <p style={{ color: "#fff", marginTop: 10 }}>Processing...</p>
        </div>
      )}

      <ToastContainer />

      <div className={`body ${ctx.mode }`}>
        <div className={`post ${ctx.mode }`}>
        <form onSubmit={handaleSubmit}>
          <h1>{editPostId ? "EDIT POST" : "Let's create New post"}</h1><br />

          <input
            className="input"
            type="text"
            placeholder="Enter Title"
            value={createPostFormData.title}
            onChange={(e) => handaleChange("title", e.target.value)}
          /><br/>
          {error.title && <span className='error'>{error.title}</span>}

          <textarea
            className="textarea"
            placeholder="Enter Body"
            value={createPostFormData.body}
            onChange={(e) => handaleChange("body", e.target.value)}
          /><br/>
          {error.body && <span className='error'>{error.body}</span>}

          <input
            className="input"
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            onChange={(e) => handleImageChange(e.target.files[0])}
          /><br/>
          {error.image && <span className='error'>{error.image}</span>}

          {createPostFormData.image && (
            <img
              src={createPostFormData.image}
              alt="preview"
              className="img"
              style={{ width: 200, borderRadius: 10 }}
            />
          )}<br/>

          <button className="btnadd">
            {editPostId ? "UPDATE POST" : "ADD POST"}
          </button>

          {editPostId && (
            <button
              className="btnadd"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
      </div>
    </>
  );
};

export default Createpostfile;
