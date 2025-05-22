import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../utils/storage';

function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const fetchArticle = () => {
      const foundArticle = getArticleById(id);
      if (foundArticle) {
        setArticle(foundArticle);
        // 生成分享链接 - 在实际部署时这将是真实的URL
        setShareUrl(`${window.location.origin}/preview/${id}`);
      } else {
        alert('文章不存在或已被删除');
        navigate('/');
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        alert('链接已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败:', err);
        alert('复制链接失败，请手动复制');
      });
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
            复制分享链接
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