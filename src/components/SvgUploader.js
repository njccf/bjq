import React, { useState } from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const contentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '500px',
  maxWidth: '90%',
  maxHeight: '90%',
  overflow: 'auto'
};

function SvgUploader({ onInsert, onClose }) {
  const [svgCode, setSvgCode] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const validateSvgCode = (code) => {
    // 检查是否包含基本的SVG标签
    if (!code.includes('<svg') || !code.includes('</svg>')) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    if (!svgCode.trim()) {
      setError('请输入SVG代码');
      setIsProcessing(false);
      return;
    }

    // 验证是否为SVG代码
    if (!validateSvgCode(svgCode)) {
      setError('请输入有效的SVG代码');
      setIsProcessing(false);
      return;
    }

    // 使用setTimeout确保UI能够更新
    setTimeout(() => {
      try {
        onInsert(svgCode);
      } catch (err) {
        console.error('插入SVG时出错:', err);
        setError('插入SVG时出错');
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const handleSvgChange = (e) => {
    setSvgCode(e.target.value);
    setError('');
  };

  return (
    <div style={modalStyle} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={contentStyle}>
        <h3 style={{ marginTop: 0 }}>插入SVG图像</h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="svg-code" style={{ display: 'block', marginBottom: '5px' }}>
              SVG代码:
            </label>
            <textarea
              id="svg-code"
              value={svgCode}
              onChange={handleSvgChange}
              style={{
                width: '100%',
                height: '200px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
              placeholder="请粘贴SVG代码..."
            />
            {error && <p style={{ color: 'red', margin: '5px 0 0' }}>{error}</p>}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="wx-btn wx-btn-secondary"
              style={{ marginRight: '10px' }}
              disabled={isProcessing}
            >
              取消
            </button>
            <button 
              type="submit" 
              className="wx-btn"
              disabled={isProcessing}
            >
              {isProcessing ? '处理中...' : '插入'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SvgUploader; 