import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Dialog, Form, Select, Input, InputNumber, Button } from 'element-react';
import { inventory } from '../store/actions';

function ItemModal(props) {
	const { isOpen, setModalVisibility, selectedItem, addItem, editItem, isRequestingSaveItem } = props;

	const [ name, setName ] = useState(selectedItem.name || '');
	const [ description, setDescription ] = useState(selectedItem.description || '');
	const [ amount, setAmount ] = useState(selectedItem.amount || 0);
	const [ category, setCategory ] = useState(selectedItem.category || '');

	const isAdd = Object.keys(selectedItem).length === 0;

	const handleSave = () => {
		if (isAdd) {
			addItem({ name, description, amount, category });
		}
		else {
			editItem({ id: selectedItem.id, name, description, amount, category });
		}
	};

	// TODO: CRUD category
	return (
		<Dialog
			title={isAdd ? 'Add Item' : 'Edit Item'}
			size="tiny"
			visible={isOpen}
			onCancel={() => setModalVisibility('itemModal', false)}
		>
			<Dialog.Body>
				<Form>
					<Form.Item label="Name" labelWidth="85">
						<Input value={name} onChange={setName} autoFocus />
					</Form.Item>
					<Form.Item label="Amount" labelWidth="85">
						<InputNumber defaultValue={amount} onChange={setAmount} className="w-full" />
					</Form.Item>
					<Form.Item label="Category" labelWidth="85">
						<Select value={category} onChange={setCategory} placeholder="Please select a category" className="w-full">
							<Select.Option label="Stationery" value="Stationery" />
							<Select.Option label="Books" value="Books" />
							<Select.Option label="Electronics" value="Electronics" />
							<Select.Option label="Other" value="Other" />
						</Select>
					</Form.Item>
					<Form.Item label="Description" labelWidth="85">
						<Input value={description} onChange={setDescription} type="textarea" />
					</Form.Item>
				</Form>
			</Dialog.Body>

			<Dialog.Footer className="dialog-footer">
				<Button onClick={() => setModalVisibility('itemModal', false)}>Cancel</Button>
				<Button type="primary" onClick={handleSave} loading={isRequestingSaveItem}>
					Save
				</Button>
			</Dialog.Footer>
		</Dialog>
	);
}

const mapStateToProps = ({ inventory }) => ({
	selectedItem: (inventory && inventory.selectedItem) || false,
	isOpen: (inventory && inventory.isOpen && inventory.isOpen.itemModal) || false,
	isRequestingSaveItem: (inventory && inventory.isRequestingSaveItem) || false,
});

const mapDispatchToProps = {
	setModalVisibility: inventory && inventory.setModalVisibility,
	addItem: inventory && inventory.addItem,
	editItem: inventory && inventory.editItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);
