/* eslint-disable react/state-in-constructor */
// Basic Imports
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TabPanel } from 'react-tabs';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PageHeader from '../../components/PageHeader';
import CustomersTable from '../../containers/Customers/CustomersTable';
import CTAButton from '../../components/CTAButton';
import TabsWrapper from '../../components/TabsWrapper';

/* Data */
import { campaigns } from '../../consts/brandCampaigns';
import axios from 'axios';

const CustomerPage = (props: any) => {
	const [selectedTabList, setSelectedTabList] = React.useState<number>(0);
	const handleTabChange = (index: number) => {
		setSelectedTabList(index);
	};

	useEffect(() => {
		const customerId = props.match.params.id;

		const res = axios({
			url: `https://cuboid-backend.herokuapp.com/customers/${customerId}/orders`,
			method: 'get',
		}).then((res) => console.log(res.data));
	}, []);

	return (
		<>
			<main className='page-container'>
				<div className={styles.campaignPageHeaderRow}>
					<h2 className={styles.pageTitle}> Orders </h2>
					<div className={styles.buttonsRow}>
						<CTAButton
							colorScheme='brand'
							type='secondary'
							size='tiny'
							to='/brand/campaigns/new'
							disabled
						>
							<i className='bx bxs-download'></i>
							Export
						</CTAButton>
					</div>
				</div>
				<TabsWrapper
					handleTabChange={handleTabChange}
					selectedTab={selectedTabList}
					tabsDisplayList={['All', 'Current']}
				>
					<TabPanel>
						<CustomersTable campaigns={campaigns} />
					</TabPanel>

					<TabPanel>
						<CustomersTable campaigns={campaigns} />
					</TabPanel>
				</TabsWrapper>
			</main>
		</>
	);
};

export default CustomerPage;
