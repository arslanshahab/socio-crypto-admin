import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Paper, Typography } from '@material-ui/core';
import { CampaignListVars, FilterDataType, PaginatedCampaignResults, TimeFilterOptions } from '../types';
import { CampaignCard } from './CampaignCard';
import { LIST_CAMPAIGNS } from '../operations/queries/campaign';
import { CampaignGraph } from './CampaignGraph';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DataFilter } from './DataFilter';
import { TimeFilter } from './TimeFilter';

export const CampaignsList: React.FC = () => {
  const initialEndDate = new Date();
  const initialStartDate = new Date();
  initialStartDate.setUTCDate(initialEndDate.getUTCDate() - 7);
  const [checkedIndex, setChecked] = useState(0);
  const [dataFilter, setDataFilter] = useState<FilterDataType>('totalConversions');
  const [timeFilter, setTimeFilter] = useState<TimeFilterOptions>('day');
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
  const { loading, data } = useQuery<PaginatedCampaignResults, CampaignListVars>(LIST_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 10, sort: true },
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
              <DataFilter value={dataFilter} setValue={setDataFilter} />
            </Grid>
            <Grid item>
              <TimeFilter value={timeFilter} setValue={setTimeFilter} />
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
            <Typography>Tier</Typography>
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
          <Grid item container xs={1}>
            <Typography>Status</Typography>
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
