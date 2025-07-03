import React from 'react';

const QuantizationDemo = ({ quantizationBits, onQuantizationChange }) => {
  const levels = Math.pow(2, quantizationBits);
  const stepSize = 2 / levels;

  return (
    <div className="control-panel">
      <h3>量子化レベル</h3>
      <div className="slider-container">
        <label>
          ビット数: {quantizationBits} bit ({levels} レベル)
        </label>
        <input
          type="range"
          min="1"
          max="8"
          value={quantizationBits}
          onChange={(e) => onQuantizationChange(Number(e.target.value))}
          className="slider"
        />
      </div>
      <div className="quantization-grid">
        <div className="level-visualization">
          {[...Array(Math.min(levels, 16))].map((_, i) => (
            <div 
              key={i} 
              className="level-bar"
              style={{ 
                height: `${100 / Math.min(levels, 16)}%`,
                backgroundColor: `hsl(${(i * 360) / levels}, 70%, 60%)`
              }}
            />
          ))}
          {levels > 16 && <div className="more-levels">+{levels - 16} レベル</div>}
        </div>
      </div>
      <div className="info-box">
        <p>
          <strong>量子化ステップサイズ：</strong> {stepSize.toFixed(4)}
        </p>
        <p>
          <strong>分解能：</strong> {quantizationBits}ビットで{levels}段階の値を表現
        </p>
        <p>
          ビット数が多いほど、より細かく信号を表現できます。
        </p>
      </div>
    </div>
  );
};

export default QuantizationDemo;