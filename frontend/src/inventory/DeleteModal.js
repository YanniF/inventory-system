import React from 'react';
import { connect } from 'react-redux';

import { Dialog, Button, Alert } from 'element-react';
import { inventory } from '../store/actions';

function DeleteModal(props) {
	const { selectedItem, isRequestingDeleteItem, isOpen, setModalVisibility, deleteItem, error, clearErrors } = props;

	return (
		<Dialog
			title={selectedItem ? 'Edit Item' : 'Add Item'}
			visible={isOpen}
			onCancel={() => setModalVisibility('deleteModal')}
			className="xl:w-5/12 lg:w-7/12 md:w-9/12 sm:w-full"
		>
			<Dialog.Body>
				{error && <Alert title={error.message} type="error" showIcon={true} className="mb-4" onClose={clearErrors} />}
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
	error: (inventory && inventory.error) || '',
});

const mapDispatchToProps = {
	deleteItem: inventory && inventory.deleteItem,
	setModalVisibility: inventory && inventory.setModalVisibility,
	clearErrors: inventory && inventory.clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
