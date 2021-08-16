import React, { ChangeEvent, useState, useEffect } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { updateCampaignState } from '../../redux/slices/campaign';
import { Fade } from 'react-awesome-reveal';
import Modal from 'react-modal';

interface Tier {
  threshold: string;
  totalCoiins: string;
}

export const Algorithm: React.FC = () => {
  const campaign = useSelector((state: RootState) => state.newCampaign);
  // const numOfTiers = useSelector((state: RootState) => state.newCampaign.config.numOfTiers);
  // const initialOffering = useSelector((state: RootState) => state.newCampaign.config.initialTotal);
  const [agreementChecked, handleAgreementChecked] = useState(campaign.config.agreementChecked || false);
  const [modalOpen, toggleModal] = useState(false);
  const dispatch = useDispatch();
  // const handleTierChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   dispatch(
  //     updateCampaignState({ cat: 'algoTiers', tier: event.target.id, key: event.target.name, val: event.target.value }),
  //   );
  // };
  const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(updateCampaignState({ cat: 'algoValues', key: event.target.name, val: event.target.value }));
  };
  // const coiinBudget = campaign.config.coiinBudget ? parseFloat(campaign.config.coiinBudget.toString()) : 0;
  // const initMaxThresh = 100;

  // const initThresh = () => {
  //   const tiersObject: Tier[] = [];
  //   for (let i = 1; i <= numOfTiers; i++) {
  //     const dataObject: Tier = { threshold: '', totalCoiins: '' };
  //     dataObject.threshold = ((i / numOfTiers) * initMaxThresh).toString();
  //     dataObject.totalCoiins = ((i / numOfTiers) * coiinBudget).toString();
  //     tiersObject.push(dataObject);
  //   }
  //   dispatch(updateCampaignState({ cat: 'initAlgoTiers', initialTiers: tiersObject, key: '', val: null }));
  // };

  // useEffect(initThresh, []);

  // const renderTiers = () => {
  //   const tiers: JSX.Element[] = [];
  //   for (let i = 1; i <= numOfTiers; i++) {
  //     const label = `Tier ${i}`;
  //     const id = `${i}`;
  //     tiers.push(
  //       <div className="margin-bottom">
  //         <div>
  //           <Typography component="div">{label}</Typography>
  //         </div>
  //         <Grid container xs={12} spacing={3} direction={'row'} justify={'center'}>
  //           <Grid item xs={6}>
  //             <TextField
  //               fullWidth
  //               label={'Threshold'}
  //               id={id}
  //               name={'threshold'}
  //               placeholder={'Threshold'}
  //               value={campaign.algorithm.tiers[id] ? campaign.algorithm.tiers[id].threshold : ''}
  //               onChange={handleTierChange}
  //               className="text-field"
  //               defaultValue={i === 0 ? 0 : undefined}
  //             />
  //           </Grid>
  //           <Grid item xs={6}>
  //             <TextField
  //               label={'Total Coiins'}
  //               id={id}
  //               name={'totalCoiins'}
  //               placeholder={'Total Coiins'}
  //               fullWidth
  //               value={campaign.algorithm.tiers[id] ? campaign.algorithm.tiers[id].totalCoiins : ''}
  //               disabled={i == numOfTiers}
  //               onChange={handleTierChange}
  //               className="text-field"
  //               defaultValue={i === 0 ? initialOffering : undefined}
  //             />
  //           </Grid>
  //         </Grid>
  //       </div>,
  //     );
  //   }
  //   return tiers;
  // };

  const renderAgreementModal = () => {
    return (
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => toggleModal(false)}
        className="requirement-modal"
        overlayClassName="requirement-modal-overlay"
      >
        <div className="modal-content">
          <p className="big-title">Terms of Service and Brand Agreement</p>

          <p className="big-title">About the Program</p>
          <p className="title">Membership Eligibility</p>
          <p className="copy">
            The Applications/Services are strictly for your commercial use. You may use the Applications/Services only
            when and as available. The Application/Services are only available to individuals who are eighteen (18)
            years of age or older. Only one (1) account per brand. Brands are only allowed to represent their respective
            companies or corporations.
          </p>

          <p className="title">Use of the Application/Services</p>
          <p className="copy">
            The Applications/Services are for commercial use. You may use the Applications/Services only when and as
            available. Raiinmaker reserves the right to change, modify or eliminate, and/or restrict or block access to,
            all or any part of the Applications/Services, without notice, at any time, for any reason or for no reason.
          </p>
          <p className="copy">
            Raiinmaker provides members with the opportunity to participate in marketing campaigns and brands to create
            marketing campaigns. Participation in marketing campaigns is voluntary. By agreeing to become a member, you
            agree to receive invitations to participate in marketing campaigns. You may unsubscribe from membership at
            any time.
          </p>

          <p className="title">Coiin Reward Points</p>
          <p className="copy">
            Coiin Reward Points are a part of the in-app ledger system that is used in the Services and have no
            “real-world” monetary value.
          </p>
          <p className="copy">
            Coiin Reward Points are not your property. You can&apos;t transfer points to any other person or program
            account. Additionally, points can&apos;t be transferred by operation of law, such as by inheritance, in
            bankruptcy or in connection with a divorce.
          </p>
          <p className="copy">
            A user cannot remove or transfer Coiin from their account, provided that, for clarity: (a) as discussed
            further below, we may remove Coiin from a user’s account in connection with the termination or suspension of
            their access to the Services, and (b) Coiin may be transferred by the Company from one account to another in
            connection with account migration, where permitted by the Company, in its sole discretion. If not withdrawn,
            Coiin will “expire” and be removed from a user’s account after two (2) years from the last earning or
            withdrawal activity within an account. Additionally, upon termination of a user’s account, any and all Coiin
            associated with a user’s account will be automatically and irrevocably removed and deleted.
          </p>
          <p className="copy">
            A company who deposits Coiin from their account into Raiinmaker agrees to the following: (a) we may remove
            their credits at any time, and (b) Coiin may be transferred in and out of their wallet Raiinmaker deems fit.
            Raiinmaker has full discretion to move, transfer, repossess, credit, or modify Coiin balances as desired.
          </p>

          <p className="big-title">Raiinmaker Rewards System</p>
          <p className="title">How It Works</p>
          <p className="copy">
            Raiinmaker members earn Coiin reward points that are distributed upon the end of a marketing campaign. The
            amount is based upon a user influence score in relation to the influence score of all participating users,
            against the total amount of Coiin reward points staked to the enrolled marketing campaign. Raiinmaker
            members terms and conditions and user agreement can be found
            <a href="https://www.raiinmaker.com/terms/"> here</a>.
          </p>
          <p className="copy">
            The user influence score earns a point for every digital value interaction tracked for the life span of an
            eligible campaign, depending on the weighted earn rate determined by the enrolled marketing campaign. As a
            brand, you can set the amount of rewards in a given campaign when creating a campaign.{' '}
          </p>

          <p className="title">Campaign Creation System </p>
          <p className="copy">
            Brands are able to create marketing campaigns. These campaigns are then checked by Raiinmaker and approved
            or denied on any basis whatsoever. Raiinmaker can reject, approve, remove, or change your campaign at any
            time. Raiinmaker can make edits and changes as desired as well.
          </p>

          <p className="title">Tiering System </p>
          <p className="copy">
            Participants of campaigns are eligible to earn additional points provisioned by a campaign which will be
            based on the user’s influence score.
          </p>

          <p className="title">Updates</p>
          <p className="copy">
            Raiinmaker may modify, alter, delete or add new terms and conditions for marketing campaigns, data metrics,
            the reward program or the application/services at any time without notice. For Raiinmaker this includes, but
            is not limited to, modifying, altering, adding or deleting redemption levels, conversion ratios, conditions
            for status, conditions for membership and conditions for earning incentives or rewards, at any time without
            notice. In addition, Raiinmaker may terminate or cease offering any incentive or reward in connection with
            Raiinmaker’s rewards program, at any time without notice. Raiinmaker can reject or approve any campaign at
            any time.
          </p>

          <p className="title">Personal Information</p>
          <p className="copy">
            Personal information may have to be collected, processed and/or disclosed in connection with Raiinmaker’s
            rewards program and/or any request to redeem a reward or incentive. By agreeing to these Terms, you hereby
            agree to the collection, processing and/or disclosure of your personal information for such purpose(s) and
            all such personal information shall be subject to the terms set forth in Raiinmaker’s privacy policy.
          </p>

          <p className="big-title">Influence and Taxes</p>
          <p className="title">How to Pay for a Campaign</p>
          <p className="copy">
            You can pay for an account via the Raiinmaker Brand application. A manual payment is when You send Coiin to
            Your campaign funding address on a one-time basis. You can manually pay for Your Campaigns in the following
            ways:
          </p>

          <p className="title">PayPal</p>
          <p className="copy">
            You must provide an eligible account paypal account with Raiinmaker. You also must pay any service fees or
            required taxes and fees that the Supplier must collect. The amount You pay for associated taxes and fees may
            be different than the actual payment the Supplier receives. The amount You are charged is a fee for services
            and covers the costs of Your redemption. The charge for taxes and fees varies based on a number of factors,
            including but not limited to, (1) how much payment the Supplier receives, and (2) the location of the
            Supplier where you will be staying(?). Fees also may include profit for the Supplier. Coiin
          </p>
          <p className="copy">You must send Coiin to Raiinmaker via an Ethereum ERC-20 address. </p>

          <p className="title">Rewards and Taxes</p>
          <p className="copy">
            Some Rewards You receive may qualify as taxable income to You. When laws require Us to do so, We will report
            Your Rewards’ value as income to the Internal Revenue Service, as well as state and local tax authorities.
            By using this Program, You are responsible for paying any federal, state, or local taxes You owe, or other
            connected fees or gratuities. If You have other questions about Your tax liability, please consult Your tax
            advisor.
          </p>
          <p className="copy">
            In the United States, Raiinmaker has an obligation to: (i) provide a W-9 tax form to individuals who receive
            payments (whether via the redemption of points or dollars or other means) of $600 or more in a tax year and
            (ii) file a 1099-Misc form with the United States Internal Revenue Service (“IRS”) for such payments. In
            addition, Raiinmaker will provide you with a completed 1099-Misc form for your tax compliance purposes. As a
            result, please see the following:
          </p>
          <p className="copy">
            (1) If you have received payments of $599 during a tax year, your account will be suspended (i.e., you will
            not be able to receive further payments and will not be able to complete or participate in marketing
            campaigns) for the remainder of the applicable tax year unless and until you provide Raiinmaker with a
            completed and verified W-9 form.
          </p>
          <p className="copy">
            (2) If you have received payments of $600 or more during a tax year, your account will be suspended
            indefinitely (i.e., you will not be able to receive further payments and will not be able to complete or
            participate in marketing campaigns) unless and until you provide Raiinmaker with a completed and verified
            W-9 form. In this case, your account will not be reinstated at the beginning of the next tax year, unless or
            until you provide Raiinmaker with a completed and verified W-9 form.
          </p>

          <p className="title">Influence Data and Metrics</p>
          <p className="copy">
            Some Influence data, metrics and graphs may not be accurate. Raiinmaker can make changes to the data at any
            time. You may receive and download the information.
          </p>

          <p className="title">Disclaimer of Warranties</p>
          <p className="copy">
            COIIN AND ANY THIRD-PARTY PROVIDERS MAKE NO WARRANTY OF ANY KIND REGARDING THIS SITE AND/OR ANY DATA OR
            CONTENT PROVIDED ON THIS SITE, ALL OF WHICH ARE PROVIDED ON AN “AS IS” “AS AVAILABLE” BASIS. COIIN AND ANY
            THIRD-PARTY PROVIDERS DO NOT WARRANT THE ACCURACY, COMPLETENESS, CURRENCY OR RELIABILITY OF ANY OF THE
            CONTENT OR DATA FOUND ON THIS SITE AND SUCH PARTIES EXPRESSLY DISCLAIM, TO THE FULLEST EXTENT PROVIDED BY
            LAW, ALL WARRANTIES AND CONDITIONS, INCLUDING IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT, AND THOSE ARISING BY STATUTE OR OTHERWISE IN LAW OR FROM
            COURSE OF DEALING OR USAGE OF TRADE. NEITHER COIIN NOR ANY THIRD-PARTY PROVIDERS WARRANT THAT THIS SITE, ITS
            SERVERS OR ANY EMAIL SENT FROM COIIN AFFILIATE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. SOME STATES
            DO NOT ALLOW THE DISCLAIMER OF IMPLIED WARRANTIES, SO THE FOREGOING DISCLAIMER MAY NOT APPLY TO YOU.
            NOTWITHSTANDING THIS DISCLAIMER OF WARRANTIES, YOU MAY HAVE SPECIFIC WARRANTY RIGHTS, WHICH VARY FROM STATE
            TO STATE.
          </p>

          <p className="title">Limitation of Liability</p>
          <p className="copy">
            TO THE FULLEST EXTENT PROVIDED BY LAW, COIIN ASSUMES NO RESPONSIBILITY, AND SHALL NOT BE LIABLE FOR, ANY
            LOSS OR DAMAGES CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES OR OTHER TECHNOLOGICALLY HARMFUL
            MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA OR OTHER PROPRIETARY MATERIAL DUE
            TO YOUR ACCESS TO, USE OF, OR BROWSING IN THIS SITE OR YOUR DOWNLOADING OF ANY MATERIALS, DATA, TEXT,
            IMAGES, VIDEO OR AUDIO FROM THE SITE.
          </p>
          <p className="copy">
            IN NO EVENT SHALL COIIN, ITS EMPLOYEES, AGENTS OR ANY THIRD PARTY PROVIDERS BE LIABLE FOR ANY INJURY, LOSS,
            CLAIM, DAMAGE, LOSS OF PROFITS, SALES, BUSINESS OR REVENUE, BUSINESSS INTERPRETATION, LOSS OF ANTICIPATED
            SAVINGS, LOSS OF BUSINESS OPPORTUNITY, GOODWILL OR REPUTATION, OR ANY SPECIAL, EXEMPLARY, PUNITIVE,
            INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES OF ANY KIND, WHETHER BASED IN CONTRACT, TORT (INCLUDING
            NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, WHICH ARISES OUT OF OR IS IN ANY WAY CONNECTED WITH (I) ANY USE
            OF THIS SITE OR CONTENT, (II) ANY FAILURE OR DELAY (INCLUDING, BUT NOT LIMITED TO THE USE OF OR INABILITY TO
            USE ANY COMPONENT OF THIS SITE) OR (III) THE PERFORMANCE OR NONPERFORMANCE BY CJ AFFILIATE OR ANY THIRD
            PARTY PROVIDERS, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES TO SUCH PARTIES OR ANY
            OTHER PARTY.
          </p>

          <p className="title">Governing Law &amp; Jurisdiction</p>
          <p className="copy">
            These Terms and Conditions, their subject matter and their formation (and any non-contractual disputes or
            claims) are governed by laws of the United States of America and of the State of Wyoming. The state and
            federal courts located in Wyoming, shall have exclusive jurisdiction.
          </p>

          <p className="title"> Information and Press Releases</p>
          <p className="copy">
            The Site may contain interviews, discussions, press releases and other information (collectively,
            “Raiinmaker Campaign Information”) about Coiin, its business and its services, including links to
            third-party websites that contain such Raiinmaker Campaign Information, which are being provided as a
            convenience to visitors of the Site. While all Raiinmaker Campaign Information prepared by Coiin was
            believed to be accurate as of the date prepared, Coiin disclaims any duty or obligation to update any
            Raiinmaker Campaign Information. Statements concerning companies other than Coiin that are contained in any
            such Raiinmaker Campaign Information should not be relied upon as being provided or endorsed by Coiin. The
            opinions expressed in any Raiinmaker Campaign Information, including by employees and agents of Coiin, are
            solely those of the author(s) and do not necessarily reflect those of Coiin.
          </p>

          <p className="title">Export Control</p>
          <p className="copy">
            Any text, logos, designs, graphics, images, sounds, information, documents, or other materials
            (collectively, “Materials”) available from or through the Site are or may be subject to United States export
            controls. No such Materials from this Site may be downloaded or otherwise exported or re-exported (1) into
            (or to a national or resident of) any country to which the United States has embargoed goods; or (2) to
            anyone on the U.S. Treasury Department&apos;s list of Specially Designated Nationals or the U.S. Commerce
            Department&apos;s Table of Denial Orders or other similar list (each, a &quot;Restricted List&quot;). By
            using or downloading any Materials from the Site, you are warranting that you are not located in, under the
            control of, or a national or resident of any such country or on any Restricted List.
          </p>

          <p className="title">Visitors’ Communications</p>
          <p className="copy">
            Except where expressly provided otherwise by Coiin, all comments, feedback, information, or materials that
            you submit through or in association with the Site shall be treated by you as confidential. By submitting
            such comments, feedback, information, or materials to Coiin:
          </p>
          <p className="copy">
            You represent and warrant that Coiin’s use of your submission does not and will not breach any agreement,
            violate any law, or infringe any third party’s rights;
          </p>
          <p className="copy">
            You represent and warrant that you have all rights to enter into these Terms and Conditions; Coiin is free
            to use in any manner all or part of the content of any such communications on an unrestricted basis without
            the obligation to notify, identify or compensate you or anyone else; and
          </p>
          <p className="copy">
            You grant Coiin all necessary rights, including a waiver of all privacy and moral rights, to use all
            comments, feedback, information, or materials, in whole or in part, or as a derivative work, without any
            duty by Coiin to anyone whatsoever. Coiin does not accept unsolicited ideas, works, or other materials, and
            you acknowledge that you are responsible for and bear all risk as to the use or distribution of any such
            ideas, works, or materials.
          </p>
          <p className="copy">
            Coiin expressly prohibits the scraping of email addresses from this Site and expressly opts out of receiving
            commercial electronic mail messages to Raiinmaker domain email addresses that were obtained in violation of
            the foregoing or by use of automatic address-generation software.
          </p>

          <p className="title">Brand Communications</p>
          <p className="copy">
            Except where expressly provided otherwise by Coiin, all comments, feedback, information, or materials that
            you submit through or in association with the Site shall be treated by you as confidential. By submitting
            such comments, feedback, information, or materials to Coiin:
          </p>
        </div>
      </Modal>
    );
  };
  const renderBrandAgreement = () => {
    return (
      <div className="margin-top padding-top center">
        <FormControlLabel
          control={
            <Checkbox
              checked={agreementChecked as boolean}
              onChange={(e, checked) => {
                dispatch(updateCampaignState({ cat: 'config', key: 'agreementChecked', val: checked }));
                handleAgreementChecked(checked);
              }}
              style={{ color: '#3f51b5' }}
              name="Brand Agreement"
            />
          }
          label=""
        />
        <p
          className="inline"
          onClick={() => {
            toggleModal(true);
          }}
        >
          I have read and accepted the <strong>Brand Agreement</strong>
        </p>
      </div>
    );
  };

  return (
    <Fade>
      <div className="init-campaign-container padding-top">
        <div className="margin-bottom">
          <Grid container justify={'flex-start'}>
            <Grid item xs={6} spacing={3} className="form-item">
              <Typography component="div" style={{ textAlign: 'center' }} variant={'h5'}>
                Values
              </Typography>
              <div className="text-card">
                <p>Define the rate campaign participants will be rewarded for the following actions.</p>
              </div>
            </Grid>
            <Grid item xs={6} spacing={3} className="form-item">
              <Typography component="div" style={{ textAlign: 'center' }} variant={'h5'}>
                Rewards
              </Typography>
              <div className="text-card">
                <p>
                  Use multiple reward tiers to incentivize participation on your campaign. When the global influence
                  reaches the defined thresholds the campaign reward payout will updated.
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container direction={'row'} justify={'space-evenly'} alignItems={'flex-start'}>
          <Grid container item xs={6} justify={'flex-start'} direction={'column'} alignItems={'stretch'} spacing={3}>
            <Grid item xs={11}>
              <TextField
                label={'Click Value'}
                name={'clicks'}
                defaultValue={1}
                placeholder={'Click Value'}
                onChange={handleValueChange}
                className="text-field"
                fullWidth
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'View Value'}
                name={'views'}
                placeholder={'View Value'}
                defaultValue={2}
                fullWidth
                onChange={handleValueChange}
                className="text-field"
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'Submission Value'}
                fullWidth
                defaultValue={6}
                name={'submissions'}
                placeholder={'Submission Value'}
                onChange={handleValueChange}
                className="text-field"
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'Share Value'}
                name={'shares'}
                fullWidth
                defaultValue={9}
                placeholder={'Share Value'}
                onChange={handleValueChange}
                className="text-field"
              />
            </Grid>
            <Grid xs={11} item>
              <TextField
                label={'Like Value'}
                name={'likes'}
                defaultValue={3}
                placeholder={'Like Value'}
                onChange={handleValueChange}
                className="text-field"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={3} direction={'column'} justify={'flex-start'}>
            {/* {renderTiers().map((element) => element)} */}
          </Grid>
          <Grid container item xs={12} spacing={3} direction={'column'} justify={'flex-start'}>
            {renderBrandAgreement()}
          </Grid>
          {renderAgreementModal()}
        </Grid>
      </div>
    </Fade>
  );
};
