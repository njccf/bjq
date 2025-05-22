import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllArticles, deleteArticle } from '../utils/storage';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const allArticles = getAllArticles();
    setArticles(allArticles);
  };

  const handleDelete = (id) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      deleteArticle(id);
      loadArticles();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>文章列表</h2>
        <button className="wx-btn" onClick={() => navigate('/')}>
          新建文章
        </button>
      </div>

      {articles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
          <p>暂无文章</p>
          <button 
            className="wx-btn" 
            style={{ marginTop: '10px' }} 
            onClick={() => navigate('/')}
          >
            创建第一篇文章
          </button>
        </div>
      ) : (
        <div>
          {articles.map(article => (
            <div 
              key={article.id} 
              style={{ 
                backgroundColor: 'white', 
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>
                  {article.title}
                </h3>
                <div>
                  {article.published && (
                    <span 
                      style={{ 
                        backgroundColor: 'var(--wx-green)', 
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        marginRight: '10px'
                      }}
                    >
                      已发布
                    </span>
                  )}
                </div>
              </div>
              
              <div style={{ color: '#999', fontSize: '14px', marginBottom: '15px' }}>
                创建于: {formatDate(article.createdAt)}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  className="wx-btn wx-btn-secondary" 
                  style={{ marginRight: '10px', fontSize: '14px' }}
                  onClick={() => navigate(`/preview/${article.id}`)}
                >
                  预览
                </button>
                <button 
                  className="wx-btn wx-btn-secondary" 
                  style={{ marginRight: '10px', fontSize: '14px' }}
                  onClick={() => navigate(`/?edit=${article.id}`)}
                >
                  编辑
                </button>
                <button 
                  className="wx-btn wx-btn-secondary" 
                  style={{ fontSize: '14px', color: '#ff4d4f', borderColor: '#ff4d4f' }}
                  onClick={() => handleDelete(article.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticleList; 