import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { updateCampaignState } from '../../redux/slices/campaign';

export const PostsAndTags: React.FC = () => {
  const numOfPosts = useSelector((state: RootState) => state.newCampaign.config.numOfSuggestedPosts);
  const dispatch = useDispatch();
  const handlePostsChange = (event: any) => {
    event.persist();
    dispatch(
      updateCampaignState({
        cat: 'info',
        key: event.target.name,
        val: event.target.value,
        index: Number(event.target.id),
      }),
    );
  };
  const handleTagsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    dispatch(updateCampaignState({ cat: 'info', key: event.target.name, val: event.target.value }));
  };
  const renderSuggestedPosts = () => {
    const suggestedPosts: JSX.Element[] = [];
    for (let i = 0; i < numOfPosts; i++) {
      const label = `Suggested Post #${i + 1}`;
      suggestedPosts.push(
        <Grid container justify={'center'}>
          <Grid item className="form-item">
            <TextField
              style={{ width: '300px', paddingTop: '2em' }}
              id={`${i}`}
              label={label}
              name="suggestedPosts"
              multiline
              rows={5}
              defaultValue="Suggested Post"
              variant="filled"
              onChange={handlePostsChange}
            />
          </Grid>
        </Grid>,
      );
    }
    return suggestedPosts;
  };

  return (
    <Grid container justify={'center'}>
      {renderSuggestedPosts().map((item) => item)}
      <Grid container justify={'center'}>
        <Grid item className="form-item">
          <TextField
            style={{ width: '500px' }}
            label={'Suggested Tags (comma separated w/o hashtags)'}
            name={'suggestedTags'}
            placeholder={'Suggested tags'}
            margin={'normal'}
            onChange={handleTagsChange}
            className="text-field"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
