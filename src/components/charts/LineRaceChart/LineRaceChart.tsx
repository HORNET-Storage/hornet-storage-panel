import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseChart } from '@app/components/common/charts/BaseChart';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/styles/themes/themeVariables';
import useLineChartData from '@app/hooks/useLineChartData';

export const LineRaceChart: React.FC = () => {
  const { data, isLoading } = useLineChartData();
  const { t } = useTranslation();

  const theme = useAppSelector((state) => state.theme.theme);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const noData = !data || data.length === 0;

  const seriesList = [
    {
      name: t('categories.npubs'),
      type: 'line',
      data: noData ? [] : data.map((item) => [item.month, item.profiles]),
      showSymbol: false,
      lineStyle: {
        color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color1'), // Set color for profiles line
      },
      endLabel: {
        show: !noData,
        formatter: (params: { value: string[] }) => `${t('categories.npubs')}: ${params.value[1]}`,
        color: themeObject[theme].textMain,
      },
      labelLayout: {
        moveOverlap: 'shiftY',
      },
      emphasis: {
        focus: 'series',
      },
      encode: {
        x: 'month',
        y: 'profiles',
        label: ['month', 'profiles'],
        itemName: 'month',
        tooltip: ['npubs'],
      },
    },
    {
      name: t('categories.lightningABV'),
      type: 'line',
      data: noData ? [] : data.map((item) => [item.month, item.lightning_addr]),
      showSymbol: false,
      lineStyle: {
        color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color3'), // Use dht_key color for lightning_addr line
      },
      endLabel: {
        show: !noData,
        formatter: (params: { value: string[] }) => `${t('categories.lightningABV')}: ${params.value[1]}`,
        color: themeObject[theme].textMain,
      },
      labelLayout: {
        moveOverlap: 'shiftY',
      },
      emphasis: {
        focus: 'series',
      },
      encode: {
        x: 'month',
        y: 'lightning_addr',
        label: ['month', 'lightning_addr'],
        itemName: 'month',
        tooltip: [''],
      },
    },
    {
      name: t('categories.bolt'),
      type: 'line',
      data: noData ? [] : data.map((item) => [item.month, item.dht_key]),
      showSymbol: false,
      lineStyle: {
        color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color2'), // Use lightning_addr color for dht_key line
      },
      endLabel: {
        show: !noData,
        // formatter: (params: { value: string[] }) => `${t('categories.dhtKey')}: ${params.value[1]}`,
        formatter: (params: { value: string[] }) => `${t('categories.bolt')}: ${params.value[1]}`,
        color: themeObject[theme].textMain,
      },
      labelLayout: {
        moveOverlap: 'shiftY',
      },
      emphasis: {
        focus: 'series',
      },
      encode: {
        x: 'month',
        y: 'dht_key',
        label: ['month', 'dht_key'],
        itemName: 'month',
        tooltip: ['dht_key'],
      },
    },
    {
      name: t('categories.lightningAndDHT'),
      type: 'line',
      data: noData ? [] : data.map((item) => [item.month, item.lightning_and_dht]),
      showSymbol: false,
      lineStyle: {
        color: getComputedStyle(document.documentElement).getPropertyValue('--chart-color4'), // Set color for lightning_and_dht line
      },
      endLabel: {
        show: !noData,
        formatter: (params: { value: string[] }) => `${t('categories.lightningAndDHT')}: ${params.value[1]}`,
        color: themeObject[theme].textMain,
      },
      labelLayout: {
        moveOverlap: 'shiftY',
      },
      emphasis: {
        focus: 'series',
      },
      encode: {
        x: 'month',
        y: 'lightning_and_dht',
        label: ['month', 'lightning_and_dht'],
        itemName: 'month',
        tooltip: ['lightning_and_dht'],
      },
    },
  ];

  const option = {
    animationDuration: 5000,
    dataset: [
      {
        id: 'dataset_raw',
        source: noData ? [] : data,
      },
    ],
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle',
      data: noData ? [] : data.map((item) => item.month),
      axisLabel: {
        interval: 0,
        rotate: 45,
        margin: 16,
        color: themeObject[theme].textLight,
        fontSize: 14,
      },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      // name: 'Count',
      axisLabel: {
        formatter: '{value}',
      },
    },
    grid: {
      left: 65,
      right: 78,
      top: 20,
      bottom: 60,
    },
    series: seriesList,
    graphic: noData
      ? {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: t('charts.noData'),
            fontSize: 16,
            fill: themeObject[theme].textMain,
          },
        }
      : null,
  };

  return (
    <BaseCard padding="0 0 1.875rem" title={t('charts.protocols')}>
      <BaseChart key={JSON.stringify(data)} option={option} height="24rem" />
    </BaseCard>
  );
};

// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
// import { BaseChart } from '@app/components/common/charts/BaseChart';
// import { useAppSelector } from '@app/hooks/reduxHooks';
// import { themeObject } from '@app/styles/themes/themeVariables';
// import useLineChartData from '@app/hooks/useLineChartData';

// export const LineRaceChart: React.FC = () => {
//   const { data, isLoading } = useLineChartData();
//   const { t } = useTranslation();

//   const theme = useAppSelector((state) => state.theme.theme);

//   if (isLoading || !data) {
//     return <div>Loading...</div>;
//   }

//   const seriesList = [
//     {
//       name: t('categories.profiles'),
//       type: 'line',
//       data: data.map((item) => [item.month, item.profiles]),
//       showSymbol: false,
//       endLabel: {
//         show: true,
//         formatter: (params: { value: string[] }) => `${t('categories.profiles')}: ${params.value[1]}`,
//         color: themeObject[theme].textMain,
//       },
//       labelLayout: {
//         moveOverlap: 'shiftY',
//       },
//       emphasis: {
//         focus: 'series',
//       },
//       encode: {
//         x: 'month',
//         y: 'profiles',
//         label: ['month', 'profiles'],
//         itemName: 'month',
//         tooltip: ['profiles'],
//       },
//     },
//     {
//       name: t('categories.lightningAddr'),
//       type: 'line',
//       data: data.map((item) => [item.month, item.lightning_addr]),
//       showSymbol: false,
//       endLabel: {
//         show: true,
//         formatter: (params: { value: string[] }) => `${t('categories.lightningAddr')}: ${params.value[1]}`,
//         color: themeObject[theme].textMain,
//       },
//       labelLayout: {
//         moveOverlap: 'shiftY',
//       },
//       emphasis: {
//         focus: 'series',
//       },
//       encode: {
//         x: 'month',
//         y: 'lightning_addr',
//         label: ['month', 'lightning_addr'],
//         itemName: 'month',
//         tooltip: ['lightning_addr'],
//       },
//     },
//     {
//       name: t('categories.dhtKey'),
//       type: 'line',
//       data: data.map((item) => [item.month, item.dht_key]),
//       showSymbol: false,
//       endLabel: {
//         show: true,
//         formatter: (params: { value: string[] }) => `${t('categories.dhtKey')}: ${params.value[1]}`,
//         color: themeObject[theme].textMain,
//       },
//       labelLayout: {
//         moveOverlap: 'shiftY',
//       },
//       emphasis: {
//         focus: 'series',
//       },
//       encode: {
//         x: 'month',
//         y: 'dht_key',
//         label: ['month', 'dht_key'],
//         itemName: 'month',
//         tooltip: ['dht_key'],
//       },
//     },
//     {
//       name: t('categories.lightningAndDHT'),
//       type: 'line',
//       data: data.map((item) => [item.month, item.lightning_and_dht]),
//       showSymbol: false,
//       endLabel: {
//         show: true,
//         formatter: (params: { value: string[] }) => `${t('categories.lightningAndDHT')}: ${params.value[1]}`,
//         color: themeObject[theme].textMain,
//       },
//       labelLayout: {
//         moveOverlap: 'shiftY',
//       },
//       emphasis: {
//         focus: 'series',
//       },
//       encode: {
//         x: 'month',
//         y: 'lightning_and_dht',
//         label: ['month', 'lightning_and_dht'],
//         itemName: 'month',
//         tooltip: ['lightning_and_dht'],
//       },
//     },
//   ];

//   const option = {
//     animationDuration: 5000,
//     dataset: [
//       {
//         id: 'dataset_raw',
//         source: data,
//       },
//     ],
//     tooltip: {
//       order: 'valueDesc',
//       trigger: 'axis',
//     },
//     xAxis: {
//       type: 'category',
//       nameLocation: 'middle',
//       data: data.map((item) => item.month),
//     },
//     yAxis: {
//       type: 'value',
//       minInterval: 1,
//       // name: 'Count',
//       axisLabel: {
//         formatter: '{value}',
//       },
//     },
//     grid: {
//       left: 65,
//       right: 150,
//       top: 20,
//       bottom: 30,
//     },
//     series: seriesList,
//   };

//   return (
//     <BaseCard padding="0 0 1.875rem" title={t('charts.protocols')}>
//       <BaseChart option={option} height="24rem" />
//     </BaseCard>
//   );
// };

// import React, { useState, useEffect, useCallback } from 'react';
// import { useTranslation } from 'react-i18next';
// import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
// import { BaseChart } from '@app/components/common/charts/BaseChart';
// import Data from './data.json';
// import { useAppSelector } from '@app/hooks/reduxHooks';
// import { themeObject } from '@app/styles/themes/themeVariables';

// interface DataRow {
//   id: string;
//   fromDatasetId: string;
//   transform: {
//     type: string;
//     config: { and: [{ dimension: string; gte: number }, { dimension: string; '=': string }] };
//   };
// }

// interface SeriesRow {
//   type: string;
//   datasetId: string;
//   showSymbol: boolean;
//   name: string;
//   endLabel: {
//     show: boolean;
//     formatter: (params: { value: string }) => string;
//     color?: string;
//   };
//   labelLayout: {
//     moveOverlap: string;
//   };
//   emphasis: {
//     focus: string;
//   };
//   encode: {
//     x: string;
//     y: string;
//     label: [string, string];
//     itemName: string;
//     tooltip: [string];
//   };
// }

// export const LineRaceChart: React.FC = () => {
//   const [data, setData] = useState<DataRow[]>([]);
//   const [series, setSeries] = useState<SeriesRow[]>([]);
//   const rawData = JSON.parse(JSON.stringify(Data));
//   const { t } = useTranslation();

//   const theme = useAppSelector((state) => state.theme.theme);

//   const runAnimation = useCallback(() => {
//     const countries = ['Finland', 'Germany', 'Iceland', 'Norway', 'United Kingdom'];
//     const datasetWithFilters: DataRow[] = [];
//     const seriesList: SeriesRow[] = [];

//     countries.forEach((country) => {
//       const datasetId = `dataset_${country}`;
//       datasetWithFilters.push({
//         id: datasetId,
//         fromDatasetId: 'dataset_raw',
//         transform: {
//           type: 'filter',
//           config: {
//             and: [
//               { dimension: 'Year', gte: 1950 },
//               { dimension: 'Country', '=': country },
//             ],
//           },
//         },
//       });
//       seriesList.push({
//         type: 'line',
//         datasetId: datasetId,
//         showSymbol: false,
//         name: country,
//         endLabel: {
//           show: true,
//           formatter: (params) => `${params.value[3]}: ${params.value[0]}`,
//           color: themeObject[theme].textMain,
//         },
//         labelLayout: {
//           moveOverlap: 'shiftY',
//         },
//         emphasis: {
//           focus: 'series',
//         },
//         encode: {
//           x: 'Year',
//           y: 'Income',
//           label: ['Country', 'Income'],
//           itemName: 'Year',
//           tooltip: ['Income'],
//         },
//       });
//     });
//     setData(datasetWithFilters);
//     setSeries(seriesList);
//   }, [theme]);

//   useEffect(() => {
//     setTimeout(() => {
//       runAnimation();
//     }, 200);
//   }, [runAnimation]);

//   const option = {
//     animationDuration: 10000,
//     dataset: [
//       {
//         id: 'dataset_raw',
//         source: rawData,
//       },
//       ...data,
//     ],
//     tooltip: {
//       order: 'valueDesc',
//       trigger: 'axis',
//     },
//     xAxis: {
//       type: 'category',
//       nameLocation: 'middle',
//     },
//     yAxis: {
//       name: '',
//     },
//     grid: {
//       left: 65,
//       right: 150,
//       top: 20,
//       bottom: 30,
//     },
//     series: series,
//   };

//   return (
//     <BaseCard padding="0 0 1.875rem" title={t('charts.protocols')}>
//       <BaseChart option={option} height="24rem" />
//     </BaseCard>
//   );
// };
