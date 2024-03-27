import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, message, Upload, DatePicker } from 'antd';
import moment from 'moment';
import { Classify, Product, User } from '../../type'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import axios from 'axios'

const host = 'http://localhost:3001'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface ProductFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  product?: Product; // 当前编辑的任务, 如果没有，则表示是创建新任务
}

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const ProductFormModal: React.FC<ProductFormModalProps> = ({ visible, onClose, onSubmit, product }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [classifys, setClassifys] = useState([] as Classify[]);
  const [userInfo, setUserInfo] = useState({} as User)

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        num: 1,
        storage: moment(product.storage),
      });
    } else {
      form.resetFields();
    }
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
      fetchClassifyList(uInfo)
    }
  }, [product, form]);

  const fetchClassifyList = async (uInfo: User) => {
    const { data }: any = await axios.get(`${host}/classify`)
    if (data.code === 200) {
      setClassifys(data.data.filter((elem: Classify) => Number(elem.user_id) === Number(uInfo?.id)).map((elem: Classify) => {
        return {
          ...elem,
          key: elem.id
        }
      }))
    }
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        id: product?.id,
        storage: values.storage.format('YYYY-MM-DD'),
      });
      onClose();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      form.setFieldsValue({
        ...product,
        image: info.file.response
      });
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Modal title={product ? 'Edit Product' : 'Create Product'} visible={visible} onOk={handleOk} onCancel={onClose} footer={[
      <Button key="back" onClick={onClose}>
        Cancel
      </Button>,
      <Button key="submit" type="primary" onClick={handleOk}>
        Submit
      </Button>,
    ]}>
      <Form form={form} layout="vertical" initialValues={{ classify_id: '', status: '1' }}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please input the image!' }]}>
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://localhost:3001/product/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="num" label="Number" rules={[{ required: true, message: 'Please input the number!' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="storage" label="Date" rules={[{ required: true, message: 'Please select the date!' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="classify_id" label="Classify">
          <Select>
            <Select.Option value={''}>Unclassified</Select.Option>
            {
              classifys.map(item => (
                <Select.Option key={item.key} value={`${item.id}`}>{item.name}</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
          <Select>
            <Select.Option value={'1'}>Purchased</Select.Option>
            <Select.Option value={'2'}>Used</Select.Option>
            <Select.Option value={'3'}>Given Away</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="tags" label="tags">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
