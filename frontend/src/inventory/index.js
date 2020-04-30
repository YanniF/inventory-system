import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { auth, inventory } from '../store/actions';
import { Loading, Table, Button } from 'element-react';
import ItemModal from './ItemModal';
import DeleteModal from './DeleteModal';

function Inventory(props) {
	const {
		isRequestingGetAllItems,
		items,
		selectItem,
		getAllItems,
		setModalVisibility,
		isItemModalOpen,
		logout,
	} = props;

	useEffect(() => {
		getAllItems();
	}, []);

	const handleClickActionTable = (id, modal) => {
		selectItem(id);
		setModalVisibility(modal, true);
	};

	const columns = [
		{
			label: 'Name',
			prop: 'name',
			width: 400,
		},
		{
			label: 'Description',
			prop: 'description',
			width: 400,
		},
		{
			label: 'Category',
			prop: 'category',
			width: 240,
		},
		{
			label: 'Amount',
			prop: 'amount',
			width: 100,
		},
		{
			label: 'Actions',
			width: 135,
			render: function(props) {
				return (
					<span>
						<Button
							type="info"
							size="small"
							icon="edit"
							onClick={() => handleClickActionTable(props.id, 'itemModal')}
						/>
						<Button
							type="danger"
							size="small"
							icon="delete"
							onClick={() => handleClickActionTable(props.id, 'deleteModal')}
						/>
					</span>
				);
			},
		},
	];

	return (
		<div className="container mx-auto my-16">
			{isRequestingGetAllItems ? (
				<Loading fullscreen style={loaderStyles} />
			) : (
				<React.Fragment>
					<div className="flex justify-between">
						<Button
							type="primary"
							icon="plus"
							size="large"
							className="mb-8"
							onClick={() => setModalVisibility('itemModal', true)}
						>
							Add an Item
						</Button>
						<Button size="large" type="info" className="mb-8" onClick={logout}>
							Logout
						</Button>
					</div>
					<Table style={{ width: '100%' }} columns={columns} data={items} stripe={true} />
					{isItemModalOpen && <ItemModal />}
					<DeleteModal />
				</React.Fragment>
			)}
		</div>
	);
}

const loaderStyles = { top: '50%', left: '50%', right: 'unset', transform: 'translate(-50%, -50%)' };

const mapStateToProps = ({ inventory }) => ({
	items: (inventory && inventory.items) || [],
	isRequestingGetAllItems: (inventory && inventory.isRequestingGetAllItems) || false,
	isItemModalOpen: (inventory && inventory.isOpen && inventory.isOpen.itemModal) || false,
});

const mapDispatchToProps = {
	getAllItems: inventory && inventory.getAllItems,
	selectItem: inventory && inventory.selectItem,
	setModalVisibility: inventory && inventory.setModalVisibility,
	logout: auth && auth.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
