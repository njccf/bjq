import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar from '../components/EditorToolbar';
import SvgUploader from '../components/SvgUploader';
import { saveArticle } from '../utils/storage';

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showSvgUploader, setShowSvgUploader] = useState(false);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        'insertSvg': () => setShowSvgUploader(true)
      }
    },
    clipboard: {
      matchVisual: false
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background',
    'align', 'code-block'
  ];

  const handleSvgInsert = (svgCode) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      if (range) {
        editor.insertEmbed(range.index, 'html', svgCode);
        editor.setSelection(range.index + 1);
      } else {
        editor.insertEmbed(0, 'html', svgCode);
        editor.setSelection(1);
      }
      setShowSvgUploader(false);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('请输入文章标题');
      return;
    }

    if (!content.trim()) {
      alert('请输入文章内容');
      return;
    }

    const article = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString()
    };

    saveArticle(article);
    navigate(`/preview/${article.id}`);
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('请输入标题和内容');
      return;
    }

    const article = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      published: true
    };

    // 保存到localStorage
    saveArticle(article);

    // 同时创建一个带有内容的URL
    const encodedTitle = encodeURIComponent(title);
    const encodedContent = encodeURIComponent(content);
    const encodedDate = encodeURIComponent(article.createdAt);
    
    // 将文章内容编码到URL参数中
    navigate(`/preview/${article.id}?title=${encodedTitle}&content=${encodedContent}&date=${encodedDate}`);
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h2>微信风格编辑器</h2>
        <div>
          <button className="wx-btn wx-btn-secondary" onClick={() => navigate('/articles')}>
            文章列表
          </button>
          <button className="wx-btn wx-btn-secondary" style={{ marginLeft: '10px' }} onClick={handleSave}>
            保存草稿
          </button>
          <button className="wx-btn" style={{ marginLeft: '10px' }} onClick={handlePublish}>
            发布
          </button>
        </div>
      </div>
      
      <div className="editor-content">
        <div className="editor-main">
          <div className="editor-toolbar">
            <EditorToolbar />
          </div>
          
          <div className="editor-workspace">
            <input
              type="text"
              placeholder="请输入标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                fontSize: '24px',
                padding: '10px',
                marginBottom: '20px',
                border: 'none',
                borderBottom: '1px solid #e8e8e8',
                outline: 'none',
                backgroundColor: 'transparent'
              }}
            />
            
            <div className="quill-editor-container" style={{ height: 'calc(100% - 80px)' }}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="请输入正文内容..."
                style={{ height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {showSvgUploader && (
        <SvgUploader 
          onInsert={handleSvgInsert} 
          onClose={() => setShowSvgUploader(false)} 
        />
      )}
    </div>
  );
}

export default Editor; 