import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getArticleById } from '../utils/storage';

function Preview() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const fetchArticle = () => {
      // 尝试从URL参数中获取文章内容
      const searchParams = new URLSearchParams(location.search);
      const titleFromURL = searchParams.get('title');
      const contentFromURL = searchParams.get('content');
      const dateFromURL = searchParams.get('date');

      if (titleFromURL && contentFromURL) {
        // 如果URL中有文章内容，则使用URL中的内容
        setArticle({
          id,
          title: decodeURIComponent(titleFromURL),
          content: decodeURIComponent(contentFromURL),
          createdAt: dateFromURL ? decodeURIComponent(dateFromURL) : new Date().toISOString()
        });
        
        // 设置完整的分享URL（包括参数）
        setShareUrl(window.location.href);
        setLoading(false);
        return;
      }

      // 如果URL中没有内容，则从localStorage中获取
      const foundArticle = getArticleById(id);
      if (foundArticle) {
        setArticle(foundArticle);
        
        // 生成带有文章内容的分享链接
        const encodedTitle = encodeURIComponent(foundArticle.title);
        const encodedContent = encodeURIComponent(foundArticle.content);
        const encodedDate = encodeURIComponent(foundArticle.createdAt);
        const shareUrlWithParams = `${window.location.origin}/preview/${id}?title=${encodedTitle}&content=${encodedContent}&date=${encodedDate}`;
        
        setShareUrl(shareUrlWithParams);
      } else {
        alert('文章不存在或已被删除');
        navigate('/');
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id, navigate, location.search]);

  const handleCopyLink = () => {
    try {
      // 使用临时DOM元素作为替代方法
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // 显示成功消息
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      
      alert('链接已复制到剪贴板');
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制链接失败，请手动复制: ' + shareUrl);
    }
  };

  if (loading) {
    return <div className="preview-container">加载中...</div>;
  }

  if (!article) {
    return <div className="preview-container">文章不存在</div>;
  }

  return (
    <div className="preview-container">
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="wx-btn wx-btn-secondary" onClick={() => navigate('/')}>
          返回编辑
        </button>
        <div>
          <button className="wx-btn" onClick={handleCopyLink}>
            {copySuccess ? '已复制' : '复制分享链接'}
          </button>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          {article.title}
        </h1>
        <div style={{ color: '#999', fontSize: '14px' }}>
          {new Date(article.createdAt).toLocaleDateString('zh-CN', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div 
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
        style={{ lineHeight: 1.8 }}
      />

      <div style={{ marginTop: '40px', borderTop: '1px solid #e8e8e8', paddingTop: '20px' }}>
        <p style={{ textAlign: 'center', color: '#999', fontSize: '14px' }}>
          本文由微信风格编辑器生成
        </p>
      </div>
    </div>
  );
}

export default Preview; 