import React, { FC } from 'react';
import styles from './campaignsTable.module.css';

interface ITableProps {
  headers: string[];
  data: any;
}

const CampaignsTable: FC<ITableProps> = ({ headers, data }: ITableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Status</th>
            <th>Participation Score</th>
            <th>Users</th>
            <th>Conversion Actions</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>I Love Congo &#38; Raiinmaker</td>
            <td>&uarr;</td>
            <td>6,443,195</td>
            <td>30,701</td>
            <td>505,262</td>
            <td>
              <progress id="file" value="70" max="100" className={styles.progress} />
            </td>
          </tr>
          <tr>
            <td>I Love Congo &#38; Raiinmaker</td>
            <td>&uarr;</td>
            <td>6,443,195</td>
            <td>30,701</td>
            <td>505,262</td>
            <td>
              <progress id="file" value="100" max="100" className={styles.progress} />
            </td>
          </tr>
          <tr>
            <td>I Love Congo &#38; Raiinmaker</td>
            <td>&uarr;</td>
            <td>6,443,195</td>
            <td>30,701</td>
            <td>505,262</td>
            <td>
              <progress id="file" value="50" max="100" className={styles.progress} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CampaignsTable;
