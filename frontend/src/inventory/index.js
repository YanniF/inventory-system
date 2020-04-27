import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { inventory } from '../store/actions';
import { Loading, Table, Button } from 'element-react';
import ItemModal from './ItemModal';

function Inventory(props) {
	const [ open, setOpen ] = useState(false);
	const { loading, items, getAllItems } = props;

	useEffect(() => {
		getAllItems();
	}, []);

	const columns = [
		{
			label: 'Name',
			prop: 'name',
		},
		{
			label: 'Description',
			prop: 'description',
		},
		{
			label: 'Category',
			prop: 'category',
		},
		{
			label: 'Amount',
			prop: 'amount',
		},
	];

	return (
		<div className="container mx-auto my-16">
			{loading ? (
				<Loading fullscreen style={loaderStyles} />
			) : (
				<React.Fragment>
					<div>
						<Button type="primary" icon="plus" size="large" className="mb-8" onClick={() => setOpen(true)}>
							Add an Item
						</Button>
						{/* <Button type="primary" size="large" className="mb-8">
							Logout
						</Button> */}
					</div>
					<Table style={{ width: '100%' }} columns={columns} data={items} stripe={true} />
					<ItemModal open={open} setVisibilityModal={(isOpen) => setOpen(isOpen)} selectedItem={null} />
				</React.Fragment>
			)}
		</div>
	);
}

const loaderStyles = { top: '50%', left: '50%', right: 'unset', transform: 'translate(-50%, -50%)' };

const mapStateToProps = ({ inventory }) => ({
	items: (inventory && inventory.items) || [],
	loading: (inventory && inventory.loading) || false,
});

const mapDispatchToProps = {
	getAllItems: inventory && inventory.getAllItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
