const STORAGE_KEY = 'wechat_editor_articles';

// 获取所有文章
export const getAllArticles = () => {
  const articlesJSON = localStorage.getItem(STORAGE_KEY);
  if (!articlesJSON) {
    return [];
  }
  
  try {
    const articles = JSON.parse(articlesJSON);
    return Array.isArray(articles) ? articles : [];
  } catch (error) {
    console.error('获取文章失败:', error);
    return [];
  }
};

// 根据ID获取文章
export const getArticleById = (id) => {
  const articles = getAllArticles();
  return articles.find(article => article.id === id) || null;
};

// 保存文章
export const saveArticle = (article) => {
  const articles = getAllArticles();
  const existingIndex = articles.findIndex(a => a.id === article.id);
  
  if (existingIndex >= 0) {
    // 更新现有文章
    articles[existingIndex] = article;
  } else {
    // 添加新文章
    articles.push(article);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  return article;
};

// 删除文章
export const deleteArticle = (id) => {
  const articles = getAllArticles();
  const filteredArticles = articles.filter(article => article.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArticles));
};

// 清空所有文章
export const clearAllArticles = () => {
  localStorage.removeItem(STORAGE_KEY);
}; 