import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

function InteractionsChart({ interactions }) {
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date()
  });

  const dailyData = last7Days.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd');
    const count = interactions.filter(interaction => 
      format(new Date(interaction.date), 'yyyy-MM-dd') === dayStr
    ).length;
    
    return {
      date: format(day, 'MMM dd'),
      count
    };
  });

  const option = {
    title: {
      text: 'Interactions (Last 7 Days)',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: dailyData.map(d => d.date),
      axisLabel: {
        color: '#6B7280'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#6B7280'
      }
    },
    series: [
      {
        data: dailyData.map(d => d.count),
        type: 'bar',
        itemStyle: {
          color: '#10B981',
          borderRadius: [4, 4, 0, 0]
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <ReactECharts option={option} style={{ height: '300px' }} />
    </div>
  );
}

export default InteractionsChart;