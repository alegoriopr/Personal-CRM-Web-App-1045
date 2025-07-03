import React from 'react';
import ReactECharts from 'echarts-for-react';

function ContactsChart({ contacts }) {
  const categoryData = contacts.reduce((acc, contact) => {
    acc[contact.category] = (acc[contact.category] || 0) + 1;
    return acc;
  }, {});

  const option = {
    title: {
      text: 'Contacts by Category',
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
        name: 'Contacts',
        type: 'pie',
        radius: '70%',
        center: ['50%', '60%'],
        data: Object.entries(categoryData).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value
        })),
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
    color: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#6366F1']
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <ReactECharts option={option} style={{ height: '300px' }} />
    </div>
  );
}

export default ContactsChart;