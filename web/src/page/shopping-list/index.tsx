// 
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
import './index.css';
import axios from 'axios'
import { User, ShoppingList } from '../../type';

const host = 'http://localhost:3001'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: ShoppingList;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ShoppingListPage: React.FC = () => {
  const [form] = Form.useForm();
  const [classify, setShoppingList] = useState([] as ShoppingList[]);
  const [editingKey, setEditingKey] = useState('');
  const [userInfo, setUserInfo] = useState({} as User)

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
      fetchShoppingListList(uInfo)
    } else {
      window.location.href = '/#/login'
    }
  }, [])

  const fetchShoppingListList = async (uInfo: User) => {
    const { data }: any = await axios.get(`${host}/shoppinglist`)
    if (data.code === 200) {
      setShoppingList(data.data.filter((elem: ShoppingList) => Number(uInfo?.id) === Number(elem.user_id)).map((elem: any) => {
        return {
          ...elem,
          key: elem.id
        }
      }))
    }
  }

  const isEditing = (record: ShoppingList) => record.key === editingKey;

  const edit = (record: Partial<ShoppingList> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const del = async (record: Partial<ShoppingList> & { key: React.Key }) => {
    await axios.delete(`${host}/shoppinglist/${record.key}`)
    fetchShoppingListList(userInfo)
  }

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    const row = (await form.validateFields()) as ShoppingList;

    if (key === '0') {
      await axios.post(`${host}/shoppinglist`, {
        ...row,
        user_id: userInfo.id
      })
    } else {
      await axios.put(`${host}/shoppinglist/${key}`, row)
    }
    fetchShoppingListList(userInfo)
    setEditingKey('');
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: 'name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'number',
      dataIndex: 'num',
      editable: true,
    },
    {
      title: 'description',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: ShoppingList) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Typography.Link style={{ marginLeft: 16 }} onClick={() => del(record)}>
              Delete
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ShoppingList) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const createShoppingList = () => {
    const newShoppingList = [...classify]
    newShoppingList.unshift({
      id: '0',
      key: '0',
      user_id: '1',
      name: 'name',
      num: '1',
      description: 'description',
    });
    setShoppingList(newShoppingList)
  }

  return (
    <div>
      <h1>ShoppingList</h1>

      <Button style={{ marginBottom: 16 }} onClick={createShoppingList}>Create</Button>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={classify}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default ShoppingListPage;