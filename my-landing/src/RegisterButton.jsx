import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterButton = ({ className = "btn", label = "Register Now At ₹7999/- Only", targetPath = "/session-booking" }) => {
  const navigate = useNavigate();

  const openSessionBooking = () => {
    navigate(targetPath);
  };

  const baseBtnClasses = `relative text-black font-extrabold rounded-3xl bg-gradient-to-r from-[#FFD700] to-[#FFB300] shadow-[0_0_15px_rgba(255,200,0,0.8)] hover:shadow-[0_0_30px_rgba(255,200,0,1)] transition-all duration-300 hover:scale-105 animate-pulseGlow overflow-hidden`;
  const mergedClass = `${className ? className + ' ' : ''}${baseBtnClasses}`;

  return (
    <>
      <button
        onClick={openSessionBooking}
        className={mergedClass}
      >
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rotate-12 animate-shine" />

          <span className="flex items-center gap-2 relative z-10">
            {label}
            <span className="text-sm font-semibold px-2 py-0.5 bg-red-600 text-yellow-300 rounded-md animate-priceBlink">Book Session</span>
            <span className="text-xl animate-arrowMove">👈</span>
          </span>
        </>
      </button>

      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 12px rgba(255,200,0,0.35); }
          50% { box-shadow: 0 0 22px rgba(255,200,0,0.6); }
          100% { box-shadow: 0 0 12px rgba(255,200,0,0.35); }
        }
        .animate-pulseGlow { animation: pulseGlow 2.2s ease-in-out infinite; }

        @keyframes shine {
          0% { transform: translateX(-120%) rotate(12deg); opacity: 0; }
          50% { transform: translateX(120%) rotate(12deg); opacity: 0.7; }
          100% { transform: translateX(240%) rotate(12deg); opacity: 0; }
        }
        .animate-shine { animation: shine 1.8s linear infinite; }

        @keyframes priceBlink {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-2px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-priceBlink { animation: priceBlink 1.6s ease-in-out infinite; }

        @keyframes arrowMove {
          0% { transform: translateX(0); }
          50% { transform: translateX(6px); }
          100% { transform: translateX(0); }
        }
        .animate-arrowMove { display: inline-block; animation: arrowMove 1s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default RegisterButton;