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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!svgCode.trim()) {
      setError('请输入SVG代码');
      return;
    }

    // 简单验证是否为SVG代码
    if (!svgCode.includes('<svg') || !svgCode.includes('</svg>')) {
      setError('请输入有效的SVG代码');
      return;
    }

    onInsert(svgCode);
  };

  return (
    <div style={modalStyle}>
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
              onChange={(e) => {
                setSvgCode(e.target.value);
                setError('');
              }}
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
            >
              取消
            </button>
            <button type="submit" className="wx-btn">
              插入
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SvgUploader; 