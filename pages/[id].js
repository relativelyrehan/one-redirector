/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAndroid } from "react-device-detect";
import { isIOS } from "react-device-detect";
import { isMacOs } from "react-device-detect";
const Redirector = () => {
  const router = useRouter();
  const appStoreValidate = /apps.apple.com/;
  const playStoreValidate = /play.google.com/;
  const [urlArray, setUrlArray] = useState({
    android: "",
    ios: "",
  });

  const getURL = async (id) => {
    try {
      const response = await axios.get(
        `https://one-redirector-backend.onrender.com/api/url?id=${id}`
      );
      if (response.status == 200) {
        if (
          appStoreValidate.test(response.data.iosURL) &&
          playStoreValidate.test(response.data.androidURL)
        ) {
          setUrlArray({
            android: response.data.androidURL,
            ios: response.data.iosURL,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      getURL(id);
    }
  }, [router, router.query.id]);

  console.log(urlArray);

  useEffect(() => {
    if (urlArray.android || urlArray.ios) {
      if (isAndroid && urlArray.android && urlArray.ios) {
        window.location.href = urlArray.android;
      } else if (isIOS) {
        window.location.href = urlArray.ios;
      } else if (isMacOs) {
        window.location.href = urlArray.ios;
      } else {
        window.location.href = urlArray.android;
      }
    }
  }, [urlArray]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      Loading...
    </div>
  );
};

export default Redirector;
