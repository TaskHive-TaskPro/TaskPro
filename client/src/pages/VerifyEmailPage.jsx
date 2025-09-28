import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authAPI from "../api/auth";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay"; 

const VerifyEmailPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("E-posta doğrulanıyor...");
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setMessage("Doğrulama tokeni bulunamadı.");
            setLoading(false);
            return;
        }

        const verifyAndLogin = async () => {
            const minDelay = new Promise(resolve => setTimeout(resolve, 2500)); 

            const apiCall = (async () => {
                try {
                    const response = await authAPI.verifyEmail(token);

                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            token: response.token,
                            ...response.user,
                        })
                    );

                    setMessage(response.message || "Doğrulama başarılı!");
                    setVerificationSuccess(true);
                    return true;
                } catch (err) {
                    console.error(err);
                    const errorMessage =
                        err?.response?.data?.message || err.message || "Doğrulama başarısız";

                    setMessage(errorMessage);
                    setVerificationSuccess(false);
                    return false; 
                }
            })();

            try {
                const [isSuccessful] = await Promise.all([apiCall, minDelay]);

                setLoading(false);
                
                if (isSuccessful) {
                    navigate("/home");
                }
                
            } catch (error) {
                setLoading(false);
            }
        };

        verifyAndLogin();
    }, [token, navigate]);

    return (
        <>
            {loading && <LoadingOverlay />} 
            
            <div style={{ 
                textAlign: "center", 
                marginTop: "100px", 
                opacity: loading ? 0 : 1,
                transition: "opacity 0.5s" 
            }}>
                {verificationSuccess ? "✅" : "❌"} {message}
            </div>
        </>
    );
};

export default VerifyEmailPage;