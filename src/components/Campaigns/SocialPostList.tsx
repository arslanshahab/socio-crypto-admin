import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import tableStyles from '../../assets/styles/table.module.css';
import { apiURI } from '../../clients/raiinmaker-api';
import { useParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { CircularProgress } from '@material-ui/core';

type MediaUrls = {
  expanded_url: string;
};
type SocialPostTypes = {
  id: string;
  text: string;
  entities: any;
  user: {
    screen_name: string;
    followers_count: number;
  };
};

const SocialPostList: FC = () => {
  const { id }: { id: string } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`${apiURI}/v1/social/posts?campaignId=${id}&skip=${skip}&take=${take}`, {
          withCredentials: true,
        });
        setPosts(data.data.socialPosts);
        setTotal(data.data.count);
        setIsLoading(false);
      };
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, [skip]);

  // Take paginated value from Pagination component
  const getValue = (skip: number) => {
    setSkip(skip);
  };

  return (
    <div>
      <div className={tableStyles.tableWrapper}>
        {isLoading ? (
          <div className={tableStyles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <table className={tableStyles.table}>
            <thead>
              <tr className={tableStyles.tableHeadRow}>
                <th className={tableStyles.tableColumn}>Twitter Username</th>
                <th className={tableStyles.tableColumn}>Description</th>
                <th className={tableStyles.tableColumn}>Followers</th>
                <th className={tableStyles.tableColumn}>Media Url</th>
              </tr>
            </thead>
            <tbody>
              {posts ? (
                posts.map((post: SocialPostTypes) => (
                  <tr className={tableStyles.tableRow} key={post.id}>
                    <td className={tableStyles.tableColumn}>
                      <a
                        href={`https://twitter.com/${post.user.screen_name}`}
                        target="_blank"
                        rel="noreferrer"
                        className="no-underline text-blue-400 hover:text-denimBlue"
                      >
                        {post.user.screen_name}
                      </a>
                    </td>
                    <td className={tableStyles.tableColumn}>{post.text}</td>
                    <td className={tableStyles.tableColumn}>{post.user.followers_count}</td>
                    <td className={tableStyles.tableColumn}>
                      <a
                        href={`${post.entities?.urls?.map((x: MediaUrls) => x.expanded_url)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline text-blue-400 hover:text-denimBlue"
                      >
                        {post.entities?.urls?.map((x: MediaUrls) => x.expanded_url)}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="p-2">No posts found for this campaign</p>
              )}
            </tbody>
          </table>
        )}
      </div>
      <Pagination skip={skip} take={take} total={total} getValue={getValue} />
    </div>
  );
};

export default SocialPostList;
