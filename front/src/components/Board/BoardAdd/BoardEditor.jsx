import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { styled } from "styled-components";
import axios from "axios";

const EditorContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TitleInput = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const QuillWrapper = styled.div`
  .ql-toolbar {
    margin-bottom: 10px;
  }
  .ql-container {
    min-height: 500px; /* 텍스트 부분의 최소 높이 */
  }
`;

const BoardEditor = ({
  title = "",
  content = "",
  onTitleChange,
  onEditorChange,
}) => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (quillRef.current && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      });

      // editorRef.current.getModule('toolbar').addHandler('image', () => {
      //   selectLocalImage();
      // });

      editorRef.current.on("text-change", () => {
        onEditorChange(editorRef.current.root.innerHTML);
      });
    }
  }, [content, onEditorChange]);

  useEffect(() => {
    if (editorRef.current) {
      const currentContent = editorRef.current.root.innerHTML;
      if (content !== currentContent) {
        editorRef.current.root.innerHTML = content;
      }
    }
  }, [content]);

  // const selectLocalImage = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append('file', file);

  //       try {
  //         const response = await axios.post('http://localhost:8080/files', formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         });

  //         const imageUrl = response.data.url;
  //         insertToEditor(imageUrl);
  //       } catch (error) {
  //         console.error('Failed to upload image', error);
  //       }
  //     }
  //   };
  // };

  const insertToEditor = (url) => {
    const range = editorRef.current.getSelection();
    editorRef.current.insertEmbed(range.index, 'image', url);
  };

  const handleTitleChange = (event) => {
    onTitleChange(event);
  };

  return (
    <EditorContainer>
      <TitleInput>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleTitleChange}
          value={title}
        />
      </TitleInput>
      <QuillWrapper>
        <div ref={quillRef} />
      </QuillWrapper>
    </EditorContainer>
  );
};

export default BoardEditor;