import { Box } from '@material-ui/core';
import React from 'react';
import { Campaign, PaginatedCampaignResultsV2 } from '../../types';
import Pagination from '../Pagination/Pagination';
import RenderRow from './RenderRow';

interface Props {
  data: PaginatedCampaignResultsV2;
  paginationData: {
    skip: number;
    take: number;
    total: number;
    getValue: (skip: number) => void;
  };
}

const CampaignTable: React.FC<Props> = ({ data, paginationData }) => {
  const { skip, take, total, getValue } = paginationData;
  return (
    <Box className="w-full pb-10 overflow-scroll">
      <table className="w-full table-auto bg-gray-50">
        <thead>
          <tr className="font-semibold bg-gray-100">
            <th className="px-7 py-5 text-left">Campaign Name</th>
            <th className="px-7 py-5 text-left">Budget</th>
            <th className="px-7 py-5 text-left">Tier</th>
            <th className="px-7 py-5 text-left">Discovery Actions</th>
            <th className="px-7 py-5 text-left">TiConversion Actionser</th>
            <th className="px-7 py-5 text-left">Cost</th>
            <th className="px-7 py-5 text-left">Status</th>
            <th className="px-7 py-5 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.items.map((campaign: Campaign, index: number) => {
              return <RenderRow key={index} campaign={campaign} />;
            })}
        </tbody>
      </table>
      {total > 10 && (
        <div className="mt-6">
          <Pagination skip={skip} take={take} total={total} getValue={getValue} />
        </div>
      )}
    </Box>
  );
};

export default CampaignTable;
