import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SignalVisualization = ({ analogData, digitalData, showDigital }) => {
  return (
    <div className="signal-container">
      <h3>信号の可視化</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            type="number"
            domain={[0, 1]}
            label={{ value: '時間 (秒)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            domain={[-1.5, 1.5]}
            label={{ value: '振幅', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line 
            data={analogData}
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
            name="アナログ信号"
          />
          {showDigital && (
            <Line
              data={digitalData}
              type="stepAfter"
              dataKey="value"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              name="デジタル信号"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalVisualization;