import React from 'react';
import ReactECharts from 'echarts-for-react';

function TasksChart({ tasks }) {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.filter(task => !task.completed).length;

  const option = {
    title: {
      text: 'Task Status Overview',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#374151'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: 'Tasks',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        data: [
          { value: completed, name: 'Completed' },
          { value: pending, name: 'Pending' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        }
      }
    ],
    color: ['#10B981', '#F59E0B']
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <ReactECharts option={option} style={{ height: '300px' }} />
    </div>
  );
}

export default TasksChart;