import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import SignalVisualization from './components/SignalVisualization';
import SamplingRateDemo from './components/SamplingRateDemo';
import QuantizationDemo from './components/QuantizationDemo';
import SignalControls from './components/SignalControls';

function App() {
  const [samplingRate, setSamplingRate] = useState(100);
  const [quantizationBits, setQuantizationBits] = useState(4);
  const [frequency, setFrequency] = useState(10);
  const [amplitude, setAmplitude] = useState(1);
  const [signalType, setSignalType] = useState('sine');
  const [showDigital, setShowDigital] = useState(true);

  const generateSignal = (type, freq, amp, time) => {
    const omega = 2 * Math.PI * freq;
    switch (type) {
      case 'sine':
        return amp * Math.sin(omega * time);
      case 'square':
        return amp * Math.sign(Math.sin(omega * time));
      case 'triangle':
        return amp * (2 / Math.PI) * Math.asin(Math.sin(omega * time));
      case 'sawtooth':
        return amp * (2 * (time * freq - Math.floor(time * freq + 0.5)));
      default:
        return amp * Math.sin(omega * time);
    }
  };

  const analogData = useMemo(() => {
    const points = 1000;
    return Array.from({ length: points }, (_, i) => {
      const time = i / (points - 1);
      return {
        time,
        value: generateSignal(signalType, frequency, amplitude, time)
      };
    });
  }, [frequency, amplitude, signalType]);

  const digitalData = useMemo(() => {
    const sampleCount = Math.floor(samplingRate);
    const levels = Math.pow(2, quantizationBits);
    
    return Array.from({ length: sampleCount }, (_, i) => {
      const time = i / samplingRate;
      const analogValue = generateSignal(signalType, frequency, amplitude, time);
      
      const normalizedValue = (analogValue + 1) / 2;
      const quantizedLevel = Math.round(normalizedValue * (levels - 1));
      const quantizedValue = (quantizedLevel / (levels - 1)) * 2 - 1;
      
      return {
        time,
        value: quantizedValue
      };
    });
  }, [samplingRate, quantizationBits, frequency, amplitude, signalType]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>アナログ-デジタル変換（ADC）学習アプリ</h1>
        <p>インタラクティブにADCの仕組みを学ぼう！</p>
      </header>

      <main className="app-main">
        <section className="visualization-section">
          <SignalVisualization 
            analogData={analogData}
            digitalData={digitalData}
            showDigital={showDigital}
          />
          <div className="toggle-container">
            <label>
              <input
                type="checkbox"
                checked={showDigital}
                onChange={(e) => setShowDigital(e.target.checked)}
              />
              デジタル信号を表示
            </label>
          </div>
        </section>

        <section className="controls-section">
          <SignalControls
            frequency={frequency}
            amplitude={amplitude}
            signalType={signalType}
            onFrequencyChange={setFrequency}
            onAmplitudeChange={setAmplitude}
            onSignalTypeChange={setSignalType}
          />
          
          <SamplingRateDemo
            samplingRate={samplingRate}
            onSamplingRateChange={setSamplingRate}
          />
          
          <QuantizationDemo
            quantizationBits={quantizationBits}
            onQuantizationChange={setQuantizationBits}
          />
        </section>

        <section className="education-section">
          <h2>ADC（アナログ-デジタル変換）とは？</h2>
          <div className="education-content">
            <div className="concept-card">
              <h3>基本概念</h3>
              <p>
                ADCは、連続的なアナログ信号を離散的なデジタル信号に変換する装置です。
                この変換には主に2つのステップがあります：
              </p>
              <ol>
                <li><strong>サンプリング：</strong> 一定の時間間隔で信号の値を取得</li>
                <li><strong>量子化：</strong> 連続値を有限個の離散値に丸める</li>
              </ol>
            </div>

            <div className="concept-card">
              <h3>サンプリングレートの重要性</h3>
              <p>
                ナイキスト定理により、元の信号を正確に再現するには、
                信号の最高周波数成分の2倍以上のサンプリング周波数が必要です。
              </p>
              <p className="formula">
                f<sub>s</sub> ≥ 2 × f<sub>max</sub>
              </p>
            </div>

            <div className="concept-card">
              <h3>量子化の影響</h3>
              <p>
                量子化ビット数が多いほど、より細かく信号を表現できます：
              </p>
              <ul>
                <li>4ビット = 16レベル</li>
                <li>8ビット = 256レベル</li>
                <li>16ビット = 65,536レベル</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App
