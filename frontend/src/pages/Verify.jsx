import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'fail', or null

  const verifyPayment = async () => {
    if (!token) {
      toast.warning("Please login first!");
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        setVerificationStatus('success');
        setTimeout(() => navigate('/orders'), 2000); // Auto-redirect
      } else {
        setVerificationStatus('fail');
        setTimeout(() => navigate('/cart'), 3000);
      }

    } catch (error) {
      console.error(error);
      toast.error("Payment verification failed");
      setVerificationStatus('fail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      {loading && (
        <>
          <p className="text-lg font-medium mb-3">Verifying payment...</p>
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-700"></div>
        </>
      )}

      {!loading && verificationStatus === 'success' && (
        <div className="text-green-600">
          <h2 className="text-xl font-semibold mb-2">✅ Payment Verified Successfully!</h2>
          <p className="text-gray-600">Redirecting to your orders...</p>
        </div>
      )}

      {!loading && verificationStatus === 'fail' && (
        <div className="text-red-600">
          <h2 className="text-xl font-semibold mb-2">❌ Payment Verification Failed</h2>
          <p className="text-gray-600 mb-3">You’ll be redirected to the cart. Please try again.</p>
          <button onClick={verifyPayment} className="btn-primary">Retry</button>
        </div>
      )}
    </div>
  );
};

export default Verify;
