import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
const Home = () => {
  const [modal, showModal] = useState(false);
  const [urlArray, setUrlArray] = useState({
    ios: "",
    android: "",
  });
  const [id, setId] = useState("");
  useEffect(() => {
    if (id) {
      const o = {};
      o[id] = urlArray;
      window.localStorage.setItem("url", JSON.stringify(o));
      showModal(true);
    }
  }, [id, urlArray]);
  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      ?.toDataURL("image/png")
      ?.replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `one-redirector-${id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div className="max-w-6xl mx-auto h-screen">
      <NextSeo
        title="1 Redirector"
        description="One QR Code for both appstore and playstore"
      />
      {/* MODAL */}
      {modal ? (
        <div className="fixed top-0 left-0 bg-primary bg-opacity-20 backdrop-blur-lg h-screen w-full flex justify-center items-center">
          <div className="mx-auto h-96 w-4/5 lg:w-1/3 bg-white rounded-lg px-6 py-8 flex flex-col items-center relative">
            <button
              className="absolute top-0 right-1 p-2"
              onClick={() => showModal(false)}
            >
              X
            </button>
            <p className="text-center text-lg">Download QR Code</p>
            <p className="text-sm text-center mt-1">
              To install the app, scan the QR code with your phone&apos;s camera
            </p>
            <div className="mt-8">
              <QRCode
                id="qr-gen"
                size={150}
                value={`https://one-redirector.vercel.app/${id}`}
                level={"H"}
              />
            </div>
            <button
              className="bg-primary text-white text-lg rounded-xl mt-4 py-1 px-3 text-center w-40"
              type="button"
              onClick={downloadQRCode}
            >
              Download
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* PAGE */}
      <nav className="flex flex-1 p-4 justify-between items-center">
        <h1 className="font-semibold text-lg">1-Redirector</h1>
        <button className="bg-primary text-white text-sm lg:text-lg rounded-xl py-3 px-3 text-center w-40">
          Login
        </button>
      </nav>
      <div className="w-full flex flex-col justify-center items-center mt-32">
        <h1 className="text-primary text-3xl lg:text-6xl font-bold p-4 max-w-5xl text-center">
          Generate one url for both App Store and Play Store
        </h1>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setId(Math.floor(Math.random() * 1000 + 1));
          }}
          className="flex flex-col w-4/5 lg:w-1/2 mt-12"
        >
          <div className="w-full flex-1 mb-4">
            <label htmlFor="urlAndroid">PlayStore URL</label>
            <input
              autoComplete="off"
              required
              placeholder="https://play.google.com/store/"
              type="url"
              name="urlAndroid"
              id="urlAndroid"
              className="flex-1 w-full focus:outline-none py-3 px-2 rounded-xl shadow-sm border text-sm font-semibold"
              value={urlArray.android}
              onChange={(e) =>
                setUrlArray({ ...urlArray, android: e.target.value })
              }
            />
          </div>
          <div className="w-full flex-1">
            <label htmlFor="urlAndroid">AppStore URL</label>
            <input
              autoComplete="off"
              required
              placeholder="https://apps.apple.com/"
              type="url"
              name="url"
              id="url"
              className="flex-1 w-full focus:outline-none py-3 px-2 rounded-xl shadow-sm border text-sm font-semibold"
              value={urlArray.ios}
              onChange={(e) =>
                setUrlArray({ ...urlArray, ios: e.target.value })
              }
            />
          </div>
          <button className="bg-primary text-white rounded-xl py-3 px-3 text-center w-40 mt-4 mx-auto">
            Generate &rarr;
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
