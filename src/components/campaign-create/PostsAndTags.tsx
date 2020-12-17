import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { updateCampaignState } from '../../redux/slices/campaign';
import { Fade } from 'react-awesome-reveal';

export const PostsAndTags: React.FC = () => {
  const campaign = useSelector((state: RootState) => state.newCampaign);
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
        <div className="margin-bottom">
          <Grid container justify={'center'} xs={12}>
            <Grid item className="form-item" xs={12} spacing={2}>
              <TextField
                id={`${i}`}
                label={label}
                name="suggestedPosts"
                multiline
                fullWidth
                value={campaign.suggestedPosts[i]}
                rows={5}
                placeholder={`Check out ${campaign.name}...`}
                variant="outlined"
                onChange={handlePostsChange}
              />
            </Grid>
          </Grid>
        </div>,
      );
    }
    return suggestedPosts;
  };

  const getTagValue = () => {
    let tagString = '';
    campaign.suggestedTags.forEach((item, i) => {
      if (i == campaign.suggestedTags.length - 1) {
        tagString += `${item}`;
      } else {
        tagString += `${item},`;
      }
    });
    return tagString;
  };
  return (
    <div className="init-campaign-container padding-top">
      <Fade>
        {renderSuggestedPosts().map((item) => item)}
        <Grid container justify={'center'} xs={12}>
          <Grid item className="form-item" xs={12} spacing={2}>
            <TextField
              fullWidth
              label={'Suggested Tags (comma separated w/o hashtags)'}
              name={'suggestedTags'}
              value={getTagValue()}
              placeholder={'Suggested tags'}
              onChange={handleTagsChange}
              variant="outlined"
              className="text-field"
            />
          </Grid>
        </Grid>
      </Fade>
    </div>
  );
};
