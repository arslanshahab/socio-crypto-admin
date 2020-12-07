import React from 'react';

import {
  Campaign,
  FilterDataType,
  GetHourlyCampaignMetrics,
  GetHourlyCampaignMetricsVars,
  GetHourlyPlatformMetrics,
  GetHourlyPlatformMetricsVars,
  TimeFilterOptions,
} from '../types';
import { useQuery } from '@apollo/client';
import { GET_HOURLY_CAMPAIGN_METRICS } from '../operations/queries/campaign';
import { Grid } from '@material-ui/core';
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryTheme, VictoryLine } from 'victory';
import { GET_HOURLY_PLATFORM_METRICS } from '../operations/queries/platform';

interface Props {
  dataType: FilterDataType;
  timeFilter: TimeFilterOptions;
  startDate: string;
  endDate: string;
}

interface MetricItem {
  x: string;
  y: number;
}

export const PlatformGraph: React.FC<Props> = ({ dataType, timeFilter, startDate, endDate }) => {
  const { loading, data } = useQuery<GetHourlyPlatformMetrics, GetHourlyPlatformMetricsVars>(
    GET_HOURLY_PLATFORM_METRICS,
    {
      variables: { filter: timeFilter, startDate, endDate },
    },
  );
  const getFriendlyDate = (timeFilter: TimeFilterOptions, dateString: string) => {
    const date = new Date(dateString);
    let friendlyDate = '';
    switch (timeFilter) {
      case 'hour':
        friendlyDate = date.toLocaleTimeString('en-US');
        break;
      case 'day':
        friendlyDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        break;
      case 'week':
        const endDate = new Date(dateString);
        endDate.setUTCDate(date.getUTCDate() + 7);
        const beginningOfWeek = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        const endOfWeek = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        friendlyDate = `${beginningOfWeek}-${endOfWeek}`;
        break;
      case 'month':
        friendlyDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        break;
      case 'year':
        friendlyDate = date.toLocaleDateString('en-US', { month: 'short' });
        break;
      case 'all':
        friendlyDate = date.toLocaleDateString('en-US', { month: 'short' });
        break;
    }
    return friendlyDate;
  };
  const renderGraph = () => {
    if (data && data.getHourlyPlatformMetrics) {
      const metricItems: MetricItem[] = [];
      data.getHourlyPlatformMetrics.map((metric) => {
        const newMetric: MetricItem = { x: metric.interval, y: metric[dataType] };
        metricItems.push(newMetric);
      });
      return (
        <Grid container>
          <Grid item>
            <VictoryChart
              width={800}
              theme={VictoryTheme.material}
              padding={{ bottom: 70, left: 70, top: 70, right: 70 }}
            >
              <VictoryAxis
                scale="time"
                standalone={false}
                theme={VictoryTheme.material}
                tickFormat={(date) => getFriendlyDate(timeFilter, date)}
                tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
              />
              <VictoryAxis
                dependentAxis
                theme={VictoryTheme.material}
                tickFormat={(num) => {
                  if (!Number.isInteger(num)) {
                    return num.toFixed(2);
                  }
                  return num;
                }}
              />

              <VictoryLine
                scale={{ x: 'time', y: 'log' }}
                interpolation={'bundle'}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                style={{
                  data: { stroke: '#c43a31' },
                  parent: { border: '1px solid #ccc' },
                }}
                data={metricItems}
              />
            </VictoryChart>
          </Grid>
        </Grid>
      );
    }
  };
  return <div>{loading ? <p>loading...</p> : <div>{renderGraph()}</div>}</div>;
};
