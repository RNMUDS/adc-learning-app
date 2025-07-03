import React from 'react';

const SignalControls = ({ 
  frequency, 
  amplitude, 
  signalType,
  onFrequencyChange, 
  onAmplitudeChange,
  onSignalTypeChange 
}) => {
  return (
    <div className="control-panel">
      <h3>入力信号の設定</h3>
      
      <div className="control-group">
        <label>信号タイプ:</label>
        <select value={signalType} onChange={(e) => onSignalTypeChange(e.target.value)}>
          <option value="sine">正弦波</option>
          <option value="square">矩形波</option>
          <option value="triangle">三角波</option>
          <option value="sawtooth">のこぎり波</option>
        </select>
      </div>

      <div className="slider-container">
        <label>
          周波数: {frequency} Hz
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={frequency}
          onChange={(e) => onFrequencyChange(Number(e.target.value))}
          className="slider"
        />
      </div>

      <div className="slider-container">
        <label>
          振幅: {amplitude.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={amplitude}
          onChange={(e) => onAmplitudeChange(Number(e.target.value))}
          className="slider"
        />
      </div>
    </div>
  );
};

export default SignalControls;