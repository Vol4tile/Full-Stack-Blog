import { useEffect, useMemo, useState } from "react";
import { HTTP } from "../axios";
import { useNavigate } from "react-router-dom";
import hljs from "highlight.js";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import "../../node_modules/highlight.js/styles/github-dark.css";
import CreatePostCSS from "../css/CreatePost.module.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePostPage = () => {
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Paylaş");
  const [formData, setFormData] = useState({
    baslik: "",
    yazi: "Birşey yaz",
  });
  const quillRef = useRef();

  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      var file = input && input.files ? input.files[0] : null;
      var formData = new FormData();
      formData.append("file", file);
      let quillObj = quillRef.current.getEditor();

      await HTTP.post("post/uploadImage", formData)
        .then((res) => {
          const range = quillObj.getSelection();

          quillObj.insertEmbed(
            range.index,
            "image",
            `http://127.0.0.1:5000/${res.data}`

            // cross-origin özelliği etkinleştirildi
          );

          quillObj.root.querySelectorAll("img").forEach((img) => {
            img.setAttribute("crossOrigin", "anonymous");
          });
        })
        .catch((err) => {
         
          if (err.response.status === 500) {
            toast.error(
              "Sadece JPEG, PNG ve GIF dosyalarına izin veriliyor. ",
              {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }

          return false;
        });
    };
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    ,
    "link",
    "image",
    "code-block",
  ];
  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          // [{ header: [1, 2, false] }],

          //  ['bold', 'italic', 'underline', 'strike', 'blockquote','code-block'],
          ["code-block"],
          //  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          //  ['link', 'image'],
          ["image"],
          // ['clean']
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const submitHandler = () => {
    const editedFormData = {
      ...formData,
      yazi: quillRef.current.editor.root.innerHTML,
    };

    const createPost = async () => {
      try {
        setButtonText("Paylaşılıyor...");
        const response = await AxiosPrivate.post(
          "/post/createPost",
          editedFormData
        );
        setButtonText("Paylaş");
        toast.success("Paylaşım yapıldı. Anasayfaya yönlendiriliyorsunuz.", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const Interval = setInterval(() => {
          navigate("/");
          clearInterval(Interval);
        }, 1500);
      } catch (err) {
        if (err.response.status === 500) {
          toast.error(
            "Yazı limitini aşıyorsunuz. Biraz kısaltmayı deneyebilirsiniz",
            {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
        setButtonText("Paylaş");
      }
    };
    createPost();
  };

  return (
    <div className={CreatePostCSS.container}>
      <div className={CreatePostCSS.innerContainer}>
        <div className={CreatePostCSS.titleContainer}>
          <input
            className={CreatePostCSS.title}
            type="text"
            placeholder="Başlık"
            onChange={(e) => {
              setFormData({ ...formData, baslik: e.target.value });
            }}
          />
        </div>

        <ReactQuill
          theme="snow"
          ref={quillRef}
          modules={modules}
          formats={formats}
          placeholder="Bir şeyler yaz..."
          style={{
            width: "98%",
            marginLeft: "1%",
            minHeight: "300px",
            overflow: "hidden",
            boxShadow: "  var(--editorBorderColor) 0px 0px 0px 3px",
            color: "1f2833",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              yazi: quillRef.current.value,
            });
          }}
        />
        <div className={CreatePostCSS.btnContainer}>
          <div className={CreatePostCSS.btn} onClick={submitHandler}>
            {buttonText}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePostPage;
