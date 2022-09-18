import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAndroid } from "react-device-detect";
import { isIOS } from "react-device-detect";
import { isMacOs } from "react-device-detect";
const Redirector = () => {
  const router = useRouter();

  const [urlArray, setUrlArray] = useState({
    android:
      "https://play.google.com/store/apps/details?id=com.openinapp&utm_source=website&utm_campaign=footer&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",
    ios: "https://apps.apple.com/us/app/openinapp-native-app-opener/id1619980097?itsct=apps_box_link&itscg=30200",
  });

  //   useEffect(() => {
  //     (async () => {
  //       const id = router.query.id;
  //       const o = window.localStorage.getItem("url");
  //       const obj = JSON.parse(o);

  //       const a = obj?.[id];
  //       if (a && Object.keys(a) && Object.keys(a)?.length) {
  //         setUrlArray(a);
  //       } else {
  //         router.back();
  //       }
  //     })();
  //   }, [router, router.query.id]);

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
  }, []);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      Loading...
    </div>
  );
};

export default Redirector;
