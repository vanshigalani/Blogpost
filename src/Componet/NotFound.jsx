import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import loader from '../assets/Images/Error 404.gif';

export default function NotFound() {
  const [loading, setLoading] = useState(true);



  return (
    <>
      <Navbar />

      {loading && (
              <div
                style={{
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
    </>
  );
}
