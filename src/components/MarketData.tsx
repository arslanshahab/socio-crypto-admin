import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { FilterDataType, GetTotalPlatformMetricsResults, TimeFilterOptions } from '../types';
import { GET_TOTAL_PLATFORM_METRICS } from '../operations/queries/platform';
import { PlatformGraph } from './PlatformGraph';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TimeFilter } from './TimeFilter';
import { DataFilter } from './DataFilter';
import { DateTimePicker } from '@material-ui/pickers';

export const MarketData: React.FC = () => {
  const initialEndDate = new Date();
  const initialStartDate = new Date();
  initialStartDate.setUTCDate(initialEndDate.getUTCDate() - 7);
  const [timeFilter, setTimeFilter] = useState<TimeFilterOptions>('hour');
  const [dataFilter, setDataFilter] = useState<FilterDataType>('totalConversions');
  const [startDate, setStartDate] = useState(initialStartDate.toISOString());
  const [endDate, setEndDate] = useState(initialEndDate.toISOString());
  const handleBeginDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (dateIsoString) setStartDate(dateIsoString);
  };
  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (dateIsoString) setEndDate(dateIsoString);
  };
  const { loading, data } = useQuery<GetTotalPlatformMetricsResults>(GET_TOTAL_PLATFORM_METRICS);
  return (
    <div className="market-layout">
      <Paper className="market-data-summary">
        <Grid container justify={'center'}>
          <Grid container item justify={'flex-end'} direction={'column'} xs={2}>
            <Grid item>
              <Typography component="div">
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.participantCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div">INFs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography component="div">
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.postCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div">POSTs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography component="div">
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.discoveryCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div">DAs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography component="div">
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.conversionCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div">CAs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography component="div">
                {loading ? (
                  <p>loading...</p>
                ) : (
                  <div>
                    {data && data.getTotalPlatformMetrics.conversionCount + data.getTotalPlatformMetrics.discoveryCount}
                  </div>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="div">Reach</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container justify={'center'} direction={'row'} spacing={3}>
        <Grid item>
          <TimeFilter value={timeFilter} setValue={setTimeFilter} />
        </Grid>
        <Grid item>
          <DataFilter value={dataFilter} setValue={setDataFilter} />
        </Grid>
        <Grid item>
          <DateTimePicker
            value={startDate}
            style={{ width: '250px' }}
            onChange={handleBeginDateChange}
            label="Start Date"
            showTodayButton
          />
        </Grid>
        <Grid item>
          <DateTimePicker
            value={endDate}
            style={{ width: '250px' }}
            onChange={handleEndDateChange}
            label="End Date"
            showTodayButton
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid container item xs={6} justify={'flex-end'}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography component="div" variant={'h5'}>
                Influencer Trends
              </Typography>
              {
                <PlatformGraph
                  dataType={'participantCount'}
                  timeFilter={timeFilter}
                  startDate={startDate}
                  endDate={endDate}
                />
              }
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography component="div" variant={'h5'}>
                Discovery Trends
              </Typography>
              <PlatformGraph
                dataType={'totalDiscoveries'}
                timeFilter={timeFilter}
                startDate={startDate}
                endDate={endDate}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid container item xs={6} justify={'flex-end'}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography component="div" variant={'h5'}>
                Conversion Trends
              </Typography>
              <PlatformGraph
                dataType={'totalConversions'}
                timeFilter={timeFilter}
                startDate={startDate}
                endDate={endDate}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography component="div" variant={'h5'}>
                Sharing Trends
              </Typography>
              <PlatformGraph dataType={'shareCount'} timeFilter={timeFilter} startDate={startDate} endDate={endDate} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
