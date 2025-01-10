import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Uncomment this useEffect to navigate to the "time" page after 5 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => navigate("/time"), 5000);
  //   return () => clearTimeout(timer);
  // }, [navigate]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <ConfettiExplosion
          force={0.8}
          duration={4000}
          particleCount={250}
          width={1600}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Framer-motion fade-in effect */}
        <motion.h1
          style={{
            fontSize: "5rem",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            color: "#ff69b4",
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 6 }}
        >
          Happy Birthday
          <br />
          Koky!
        </motion.h1>
      </div>
    </>
  );
};

export default HomePage;
