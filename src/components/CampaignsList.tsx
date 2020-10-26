import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { CampaignListVars, FilterDataType, PaginatedCampaignResults, TimeFilter } from '../types';
import { CampaignCard } from './CampaignCard';
import { LIST_CAMPAIGNS } from '../operations/queries/campaign';
import { CampaignGraph } from './CampaignGraph';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

export const CampaignsList: React.FC = () => {
  const initialEndDate = new Date();
  const initialStartDate = new Date();
  initialStartDate.setUTCDate(initialEndDate.getUTCDate() - 7);
  const [checkedIndex, setChecked] = useState(0);
  const [openDataFilter, setOpenDataFilter] = useState(false);
  const [openTimeFilter, setOpenTimeFilter] = useState(false);
  const [dataFilter, setDataFilter] = useState<FilterDataType>('totalConversions');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('day');
  const [startDate, setStartDate] = useState(initialStartDate.toISOString());
  const [endDate, setEndDate] = useState(initialEndDate.toISOString());
  const handleDataFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDataFilter(event.target.value as FilterDataType);
  };
  const handleTimeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimeFilter(event.target.value as TimeFilter);
  };
  const handleDataFilterClick = () => {
    setOpenDataFilter((prevState) => !prevState);
  };
  const handleTimeFilterClick = () => {
    setOpenTimeFilter((prevState) => !prevState);
  };
  const handleBeginDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (dateIsoString) setStartDate(dateIsoString);
  };
  const handleEndDateChange = (date: MaterialUiPickersDate) => {
    const dateIsoString = date?.toISOString();
    if (dateIsoString) setEndDate(dateIsoString);
  };
  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, open: true, skip: 0, take: 10 },
  });

  return (
    <div className="campaign-list">
      <Paper className="campaign-graph">
        <Grid container justify={'center'} direction={'row'} spacing={8} style={{ height: '440px' }}>
          <Grid item xs={7}>
            {loading ? (
              <p>loading...</p>
            ) : (
              <div>
                {data && (
                  <CampaignGraph
                    campaign={data.listCampaigns.results[checkedIndex]}
                    dataType={dataFilter}
                    timeFilter={timeFilter}
                    startDate={startDate}
                    endDate={endDate}
                  />
                )}
              </div>
            )}
          </Grid>
          <Grid container item xs={5} justify={'center'} direction={'column'}>
            <Grid item style={{ marginBottom: '15px' }}>
              <Button
                size={'small'}
                variant={'contained'}
                color={'primary'}
                style={{ margin: '10px' }}
                className="campaign-filter-button"
                onClick={handleDataFilterClick}
              >
                Select Data Filter
              </Button>
              <FormControl className="campaign-filter-formControl">
                <InputLabel id="data-filter-type-label">Data Filter</InputLabel>
                <Select
                  labelId="data-type-label"
                  id="data-type-select"
                  open={openDataFilter}
                  onClick={handleDataFilterClick}
                  value={dataFilter}
                  style={{ margin: '15px' }}
                  onChange={handleDataFilterChange}
                >
                  <MenuItem value={'postCount'}>Post Count</MenuItem>
                  <MenuItem value={'participantCount'}>Participant Count</MenuItem>
                  <MenuItem value={'clickCount'}>Click Count</MenuItem>
                  <MenuItem value={'viewCount'}>View Count</MenuItem>
                  <MenuItem value={'submissionCount'}>Submission Count</MenuItem>
                  <MenuItem value={'likeCount'}>Like Count</MenuItem>
                  <MenuItem value={'shareCount'}>Share Count</MenuItem>
                  <MenuItem value={'commentCount'}>Comment Count</MenuItem>
                  <MenuItem value={'totalDiscoveries'}>Total Discoveries</MenuItem>
                  <MenuItem value={'totalConversions'}>Total Conversions</MenuItem>
                  <MenuItem value={'averagePostCost'}>Average Cost Per Post</MenuItem>
                  <MenuItem value={'averageDiscoveryCost'}>Average Discovery Cost</MenuItem>
                  <MenuItem value={'averageConversionCost'}>Average Conversion Cost</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                size={'small'}
                variant={'contained'}
                color={'primary'}
                style={{ margin: '15px' }}
                className="campaign-filter-button"
                onClick={handleTimeFilterClick}
              >
                Select Time Filter
              </Button>
              <FormControl className="campaign-filter-formControl">
                <InputLabel id="time-filter-type-label">Time Filter</InputLabel>
                <Select
                  labelId="time-type-label"
                  id="time-type-select"
                  open={openTimeFilter}
                  onClick={handleTimeFilterClick}
                  value={timeFilter}
                  onChange={handleTimeFilterChange}
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
            <Grid item>
              <DateTimePicker
                value={startDate}
                style={{ width: '300px' }}
                onChange={handleBeginDateChange}
                label="Start Date"
                showTodayButton
              />
            </Grid>
            <Grid item>
              <DateTimePicker
                value={endDate}
                style={{ width: '300px' }}
                onChange={handleEndDateChange}
                label="End Date"
                showTodayButton
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className="campaign-row">
        <Grid container spacing={5}>
          <Grid item container xs={1}>
            <Typography>Select</Typography>
          </Grid>
          <Grid item container xs={3}>
            <Typography className="campaign-name">Campaign</Typography>
          </Grid>
          <Grid item container xs={1}>
            <Typography>Budget</Typography>
          </Grid>
          <Grid item container xs={1}>
            <Typography>Status</Typography>
          </Grid>
          <Grid item container xs={1}>
            <Typography>Discovery Actions</Typography>
          </Grid>
          <Grid item container xs={1}>
            <Typography>Conversion Actions</Typography>
          </Grid>
          <Grid item container xs={1}>
            <Typography>Cost</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ marginTop: '40px' }}>
        {loading ? (
          <p>loading ...</p>
        ) : (
          <div>
            {data &&
              data.listCampaigns.results.map((campaign, index) => {
                return (
                  <CampaignCard
                    key={index}
                    campaign={campaign}
                    setChecked={setChecked}
                    index={index}
                    checkedIndex={checkedIndex}
                  />
                );
              })}
          </div>
        )}
      </Paper>
    </div>
  );
};
