import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { FilterDataType, GetTotalPlatformMetricsResults, TimeFilter } from '../types';
import { GET_TOTAL_PLATFORM_METRICS } from '../operations/queries/platform';
import { PlatformGraph } from './PlatformGraph';

export const MarketData: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('hour');
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prevState) => !prevState);
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeFilter(event.target.value as TimeFilter);
  };
  const { loading, data } = useQuery<GetTotalPlatformMetricsResults>(GET_TOTAL_PLATFORM_METRICS);
  return (
    <div className="market-layout">
      <Paper className="market-data-summary">
        <Grid container justify={'center'}>
          <Grid container item justify={'flex-end'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.participantCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>INFs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.postCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>POSTs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.discoveryCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>DAs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>
                {loading ? <p>loading...</p> : <div>{data && data.getTotalPlatformMetrics.conversionCount}</div>}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>CAs</Typography>
            </Grid>
          </Grid>
          <Grid container item justify={'center'} direction={'column'} xs={2}>
            <Grid item>
              <Typography>
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
              <Typography>Reach</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid container justify={'center'}>
        <Grid item>
          <Button
            size={'small'}
            variant={'contained'}
            color={'primary'}
            style={{ margin: '5px' }}
            className="campaign-filter-button"
            onClick={handleClick}
          >
            Select Time Filter
          </Button>
          <FormControl className="campaign-filter-formControl">
            <InputLabel id="time-filter-type-label">Time Filter</InputLabel>
            <Select
              labelId="time-type-label"
              id="time-type-select"
              open={isOpen}
              onClick={handleClick}
              value={timeFilter}
              onChange={handleChange}
              style={{ margin: '15px' }}
            >
              <MenuItem value={'hour'}>Hour</MenuItem>
              <MenuItem value={'day'}>Day</MenuItem>
              <MenuItem value={'week'}>Week</MenuItem>
              <MenuItem value={'month'}>Month</MenuItem>
              <MenuItem value={'year'}>Year</MenuItem>
              <MenuItem value={'all'}>All</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid container item xs={6} justify={'flex-end'}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography variant={'h5'}>Influencer Trends</Typography>
              {<PlatformGraph dataType={'participantCount'} timeFilter={timeFilter} />}
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography variant={'h5'}>Discovery Trends</Typography>
              {<PlatformGraph dataType={'totalDiscoveries'} timeFilter={timeFilter} />}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid container item xs={6} justify={'flex-end'}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography variant={'h5'}>Conversion Trends</Typography>
              {<PlatformGraph dataType={'totalConversions'} timeFilter={timeFilter} />}
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper className="market-data-tile">
              <Typography variant={'h5'}>Sharing Trends</Typography>
              <PlatformGraph dataType={'shareCount'} timeFilter={timeFilter} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
