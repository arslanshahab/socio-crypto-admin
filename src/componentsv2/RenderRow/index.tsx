import React, { FC, useEffect, useState } from 'react';
import { ApiClient } from '../../services/apiClient';
import { showErrorAlert } from '../../store/actions/alerts';
import { Campaign, CampaignMetricTypes } from '../../types';
import '../CampaignsTable/campaignsTable.scss';
import { useDispatch } from 'react-redux';

interface Props {
  campaign: Campaign;
}

const RenderRow: FC<Props> = ({ campaign }: Props) => {
  const dispatch = useDispatch();
  const [campaignMetric, setCampaignMetric] = useState<CampaignMetricTypes>();
  const [metricLoading, setMetricLoading] = useState<boolean>(false);

  useEffect(() => {
    setMetricLoading(true);
    ApiClient.getCampaignMetrics(campaign.id)
      .then((res) => setCampaignMetric(res))
      .catch((err) => dispatch(showErrorAlert((err as Error).message)))
      .finally(() => setMetricLoading(false));
  }, []);

  return (
    <tr key={campaign.name}>
      <td>{campaign.name}</td>
      <td>{campaign.totalParticipationScore}</td>
      <td>{campaign.participant.length}</td>
      <td>
        {metricLoading
          ? 'loading...'
          : campaignMetric
          ? campaignMetric.clickCount + campaignMetric.viewCount + campaignMetric.submissionCount
          : 0}
      </td>
      <td>
        {new Date(campaign.endDate) > new Date() ? (
          <p className="openStatus">In Progress</p>
        ) : (
          <p className="closedStatus">Ended</p>
        )}
      </td>
    </tr>
  );
};

export default RenderRow;
