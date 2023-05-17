import React, { useEffect } from "react";
import "./generate.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAs } from "file-saver";

const Generate = () => {
  const history = useNavigate();
  const [url, setUrl] = useState();

  const [generatedMemeUrl, setGeneratedMemeUrl] = useState();

  const meme = JSON.parse(sessionStorage.getItem("memeSelected"));
  const [captions, setCaptions] = useState(Array(meme.box_count).fill(""));
  const formData = new FormData();
  formData.append("username", "giftyaustin");
  formData.append("password", "Nikka@c00lie");

  formData.append("template_id", meme.id);
  const arr = [];
  for (let i = 0; i < meme.box_count; i++) {
    arr.push("Text " + (i + 1));
  }
  arr.forEach((element, i) => {
    formData.append(`boxes[${i}][text]`, element);
  });

  //  = ====================== function to fetch meme from api ==================

  const fetchRawMeme = () => {
    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        try {
          setUrl(res.data.url);
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

  useEffect(() => {
    fetchRawMeme();
  }, []);

  // ==========================================================================

  // ================= meme generation ===================
  const generateMeme = () => {
    const memeFormData = new FormData();
    memeFormData.append("password", "Nikka@c00lie");
    memeFormData.append("username", "giftyaustin");
    memeFormData.append("template_id", meme.id);
    captions.forEach((c, i) => {
      memeFormData.append(`boxes[${i}][text]`, c);
    });
    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: memeFormData,
    }).then((res) => {
      res.json().then((res) => {
        try {
          setGeneratedMemeUrl(res.data.url);
        } catch (error) {
          console.log(error);
        }
      });
    });
  };
  // ============================

  //  ======================= download meme ========================

  const downloadMeme=()=>{
    const downloadUrl = generatedMemeUrl;
    const filename = meme.name+".jpg";
    saveAs(downloadUrl, filename)
  }
  return (
    <div className="container">
      <div className="back-btn-holder my-3 btn">
        <button
          className="back-btn btn btn-danger"
          onClick={() => {
            sessionStorage.clear();
            history("/");
          }}
        >
          Back
        </button>
      </div>
      <div className="template-holder gm-holder">
        {generatedMemeUrl ? (
          <img
            src={generatedMemeUrl}
            alt="Meme generated"
            className="meme-template-generate gm-o"
          />
        ) : (
          <img
            src={url ? url : ""}
            alt="Meme Template"
            className="meme-template-generate gm-o"
          />
        )}
      </div>

      {generatedMemeUrl ? (
        ""
      ) : (
        <div className="caption-boxes-holder">
          {Array(meme.box_count)
            .fill(0)
            .map((c, i) => {
              return (
                <div className="container-fluid text-center my-3" key={i}>
                  <div className="text-name mx-3">Text {i + 1}: </div>
                  <div className="caption-input-holder mx-3">
                    <input
                      type="text"
                      value={captions[i]}
                      onChange={(e) => {
                        setCaptions(
                          captions.map((ele, ind) => {
                            return ind === i ? e.target.value : ele;
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {generatedMemeUrl ? (
        <div className="text-center my-3">
          <button className="btn generate-btn" onClick={downloadMeme}>
            Download
          </button>
        </div>
      ) : (
        <div className="text-center my-3">
          <button className="btn generate-btn" onClick={generateMeme}>
            Generate
          </button>
        </div>
      )}
    </div>
  );
};

export default Generate;
