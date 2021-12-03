import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { BsHandIndexThumbFill, BsFillShareFill, BsFillFileBarGraphFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import { SiCashapp } from 'react-icons/si';
import LineChart from './Charts/LineChart';
import SelectField from './SelectField/SelectField';
import DatePicker from './DatePicker';
import { Button, IconButton } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import AutoCompleteDropDown from './AutoCompleteDropDown';
import { useQuery } from '@apollo/client';
import { CampaignListVars, PaginatedCampaignResults, UserCampaignSingle } from '../types';
import { GET_ALL_USER_CAMPAIGNS, GET_USER_CAMPAIGN_ANALYTICS } from '../operations/queries/campaign';
import { GetUserAllCampaigns } from './../types';
import BarChart from './BarChart';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const cardType: { [key: number]: string } = {
  0: 'clicksCard',
  1: 'viewsCard',
  2: 'sharesCard',
  3: 'participationsCard',
  4: 'rewardsCard',
};
//! Select Fields Data
const searchWithDate = ['7 Days', '15 Days', '30 Days', '60 Days', '90 Days', 'One Year'];

export const DashboardHome: React.FC = () => {
  //! Use State Hook
  const [expanded, setExpanded] = useState(false);
  const [currentDate, setCurrentDate] = useState<string | undefined>();
  const [campaignId, setCamapignId] = useState('-1');
  const [campaignsAnalytics, setCampaignsAnalytics] = useState<any>();
  const [campaignsClicks, setCampaignsClicks] = useState<any>();

  //! ApolloClient Query Hook
  const { data } = useQuery<GetUserAllCampaigns>(GET_ALL_USER_CAMPAIGNS, {
    variables: { scoped: true, skip: 0, take: 50, sort: true, approved: true, open: true },
    fetchPolicy: 'cache-and-network',
  });
  const { data: userCamapign } = useQuery(GET_USER_CAMPAIGN_ANALYTICS, {
    variables: { id: campaignId },
  });

  //! Use Effect Hook
  useEffect(() => {
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    setCurrentDate(`${year}-${month}-${day}`);
  }, []);
  useEffect(() => {
    const campaignsParticipationScore = userCamapign?.getUserCampaign?.dailyMetrics?.participationScore;
    const campaignsClicks = userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount;
    const updated = campaignsParticipationScore?.slice(0, 30);
    const updatedClicks = campaignsClicks?.slice(0, 30);
    setCampaignsAnalytics(updated);
    setCampaignsClicks(updatedClicks);
  }, [userCamapign]);
  //! Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getCampaingData = () => {
    return [{ name: 'All', id: '-1' }, ...(data?.getUserAllCampaign || [])];
  };
  const getCampaignId = (id: any) => {
    setCamapignId(id);
  };

  //! Card Data
  const statCardData: StateCardDataType[] = [
    {
      title: 'Clicks',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.clickCount}`,
      icon: <BsHandIndexThumbFill />,
    },
    {
      title: 'Views',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.viewCount}`,
      icon: <FaEye />,
    },
    {
      title: 'Shares',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.shareCount}`,
      icon: <BsFillShareFill />,
    },
    {
      title: 'Participation Score',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.totalParticipationScore}`,
      icon: <BsFillFileBarGraphFill />,
    },
    {
      title: 'Rewards',
      numbers: `${userCamapign?.getUserCampaign?.dailyMetrics?.rewards}`,
      icon: <SiCashapp />,
    },
  ];

  const hanldePrevious = () => {
    const updated = userCamapign?.getUserCampaign?.dailyMetrics?.participationScore;
    const preCampaigns = updated.slice(0, 30);
    const campaignsClicks = userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount;
    const updatedClicks = campaignsClicks?.slice(0, 30);
    setCampaignsAnalytics(preCampaigns);
    setCampaignsClicks(updatedClicks);
  };
  const handleNext = () => {
    const updated = userCamapign?.getUserCampaign?.dailyMetrics?.participationScore;
    const nextCampaigns = updated.slice(30, updated?.length);
    const campaignsClicks = userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount;
    const updatedClicks = campaignsClicks?.slice(30, campaignsClicks?.length);
    setCampaignsAnalytics(nextCampaigns);
    setCampaignsClicks(updatedClicks);
  };
  console.log('Campaigns', campaignsAnalytics);
  return (
    <div>
      <h1 className="text-center py-4 mb-8 text-blue-800 text-4xl font-semibold border-b-2">Campaign Analytics</h1>
      <div className="flex justify-between gap-4 px-4 xs:flex-wrap">
        {statCardData?.map((x, index) => (
          <StatCard key={index} compaignData={x} cardType={cardType[index]} />
        ))}
      </div>
      <div className="w-4/5 mt-12 mx-auto flex gap-4">
        {getCampaingData().length > 1 && (
          <AutoCompleteDropDown
            options={getCampaingData()}
            label="Campaign"
            getCampaignId={(id) => getCampaignId(id)}
          />
        )}
        <IconButton size="medium" onClick={hanldePrevious}>
          <IoIosArrowBack />
        </IconButton>
        <IconButton size="medium" onClick={handleNext}>
          <IoIosArrowForward />
        </IconButton>
      </div>
      {/* <div className="px-4">
        <div className="flex gap-14 flex-wrap mt-12 justify-start">
          {getCampaingData().length > 1 && (
            <AutoCompleteDropDown
              options={getCampaingData()}
              label="Campaign"
              getCampaignId={(id) => getCampaignId(id)}
            />
          )}
          <SelectField searchFieldData={searchWithDate} title="Select Timeline" />
          <Button variant="contained" color="primary" onClick={handleExpandClick}>
            Custom Date Search
          </Button>
        </div>
        <div>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="flex gap-12 pt-8">
              <DatePicker title="Start" date={currentDate} />
              <DatePicker title="End" date={currentDate} />
            </div>
          </Collapse>
        </div>
      </div> */}
      {campaignId == '-1' ? (
        <div>
          <BarChart
            name={userCamapign?.getUserCampaign?.name}
            // participationScore={userCamapign?.getUserCampaign?.dailyMetrics?.participationScore}
            // allCampaignsClicks={userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric?.clickCount}
            participationScore={campaignsAnalytics}
            allCampaignsClicks={campaignsClicks}
            rewards={userCamapign?.getUserCampaign?.dailyMetrics?.rewards}
          />
        </div>
      ) : (
        <div>
          <LineChart
            name={userCamapign?.getUserCampaign?.name}
            singleDailyMetrics={userCamapign?.getUserCampaign?.dailyMetrics?.singleDailyMetric}
            participationScore={userCamapign?.getUserCampaign?.dailyMetrics?.participationScore}
          />
        </div>
      )}
    </div>
  );
};

export type StateCardDataType = {
  title: string;
  numbers: string;
  icon: JSX.Element;
};
