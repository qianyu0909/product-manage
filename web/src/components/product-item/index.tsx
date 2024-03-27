import './index.css'

import React from 'react';
import { Product } from '../../type'
import { Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

interface Props {
  product: Product,
  onEdit: any
  onDelete: any
  onClick: any
}

const statusMap = ['', 'Purchased', 'Used', 'Given Away']
const ProductItem: React.FC<Props> = ({ product, onEdit, onDelete, onClick }) => {

  const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9']

  const renderTags = () => {
    if (product.tags) {
      const arr = product.tags.split(',')
      return arr.map((item, index) => {
        const len = index % colors.length;
        return <Tag color={colors[len]}>{item}</Tag>
      })
    } else {
      return <></>
    }
  }

  return (
    <div className="c-product-item" onClick={onClick}>
      <div className="cover" style={{ backgroundImage: `url(http://localhost:3001/${product.image})` }}></div>
      <div className='title ellipsis'>{product.name}</div>
      <div className="desc ellipsis">{product.description}</div>
      <div className="tag-wrap">
        {renderTags()}
      </div>

      <Tag className='status' color="#f50">{statusMap[Number(product.status)]}</Tag>
      <Tag className='date' color="#ffc107">{product.storage}</Tag>

      <div className='icon-wrap' onClick={(e) => {
        e.stopPropagation()
      }}>
        <EditOutlined style={{ marginRight: 12, cursor: 'pointer' }} onClick={() => {
          onEdit(product)
        }} />
        <Popconfirm
          title="Delete the product"
          description="Are you sure to delete this product?"
          onConfirm={() => {
            onDelete(product)
          }}
          onCancel={() => { }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined style={{ cursor: 'pointer' }} />
        </Popconfirm>
      </div>

    </div>
  );
};

export default ProductItem;
