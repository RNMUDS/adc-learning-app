import React from 'react';

const SamplingRateDemo = ({ samplingRate, onSamplingRateChange }) => {
  return (
    <div className="control-panel">
      <h3>サンプリングレート</h3>
      <div className="slider-container">
        <label>
          サンプリング周波数: {samplingRate} Hz
        </label>
        <input
          type="range"
          min="10"
          max="1000"
          value={samplingRate}
          onChange={(e) => onSamplingRateChange(Number(e.target.value))}
          className="slider"
        />
      </div>
      <div className="info-box">
        <p>
          <strong>ナイキスト定理：</strong> 
          正確な信号再現には、元の信号の最高周波数の2倍以上のサンプリング周波数が必要です。
        </p>
        <p>
          現在の設定では、最大 {Math.floor(samplingRate / 2)} Hz までの信号を正確に再現できます。
        </p>
      </div>
    </div>
  );
};

export default SamplingRateDemo;