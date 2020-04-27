import React, { useState } from 'react';

import { Dialog, Form, Select, Input, InputNumber, Button } from 'element-react';

function ItemModal(props) {
	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ amount, setAmount ] = useState(0);
	const [ category, setCategory ] = useState('');
	const { open, setVisibilityModal, selectedItem } = props;

	const handleSave = () => {};

	// TODO: CRUD category

	return (
		<Dialog
			title={selectedItem ? 'Edit Item' : 'Add Item'}
			size="tiny"
			visible={open}
			onCancel={() => setVisibilityModal(false)}
		>
			<Dialog.Body>
				<Form>
					<Form.Item label="Name" labelWidth="85">
						<Input value={name} autoFocus />
					</Form.Item>
					<Form.Item label="Amount" labelWidth="85">
						<InputNumber value={amount} className="w-full" />
					</Form.Item>
					<Form.Item label="Category" labelWidth="85">
						<Select value={category} placeholder="Please select a zone" className="w-full">
							<Select.Option label="Stationery" value="stationery" />
							<Select.Option label="Books" value="books" />
							<Select.Option label="Electronics" value="electronics" />
							<Select.Option label="Other" value="electronics" />
						</Select>
					</Form.Item>
					<Form.Item label="Description" labelWidth="85">
						<Input value={description} type="textarea" />
					</Form.Item>
				</Form>
			</Dialog.Body>

			<Dialog.Footer className="dialog-footer">
				<Button onClick={() => setVisibilityModal(false)}>Cancel</Button>
				<Button type="primary" onClick={handleSave}>
					Save
				</Button>
			</Dialog.Footer>
		</Dialog>
	);
}

export default ItemModal;
