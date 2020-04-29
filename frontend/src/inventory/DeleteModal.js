import React from 'react';
import { connect } from 'react-redux';

import { Dialog, Button } from 'element-react';
import { inventory } from '../store/actions';

function DeleteModal(props) {
	const { selectedItem, isRequestingDeleteItem, isOpen, setModalVisibility, deleteItem } = props;

	return (
		<Dialog
			title={selectedItem ? 'Edit Item' : 'Add Item'}
			size="tiny"
			visible={isOpen}
			onCancel={() => setModalVisibility('deleteModal')}
		>
			<Dialog.Body>
				<p>Are you sure you want to delete "{selectedItem.name}"?</p>
			</Dialog.Body>

			<Dialog.Footer className="dialog-footer">
				<Button onClick={() => setModalVisibility('deleteModal')}>Cancel</Button>
				<Button type="danger" onClick={() => deleteItem(selectedItem.id)} loading={isRequestingDeleteItem}>
					Delete
				</Button>
			</Dialog.Footer>
		</Dialog>
	);
}

const mapStateToProps = ({ inventory }) => ({
	selectedItem: (inventory && inventory.selectedItem) || {},
	isOpen: (inventory && inventory.isOpen && inventory.isOpen.deleteModal) || false,
	isRequestingDeleteItem: (inventory && inventory.isRequestingDeleteItem) || false,
});

const mapDispatchToProps = {
	deleteItem: inventory && inventory.deleteItem,
	setModalVisibility: inventory && inventory.setModalVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
