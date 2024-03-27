import './index.css'

import React, { useEffect, useState } from 'react';
import { Button, Select, Empty, Tag } from 'antd';
import { User, Product } from '../../type'
import ProductItem from '../../components/product-item';
import ProductFormModal from '../../components/product-form-modal';
import { Classify } from '../../type/index'
import axios from 'axios';

interface Filter {
  status: string
  classify_id: string
}

const host = 'http://localhost:3001'

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User)
  const [products, setProducts] = useState([] as Product[])
  const [filterForm, setFilterForm] = useState({
    status: '-1',
    classify_id: '-1'
  } as Filter)
  const [classifys, setClassifys] = useState([] as Classify[]);

  useEffect(() => {
    const ui = window.localStorage.getItem('userInfo')
    if (ui) {
      const uInfo: User = JSON.parse(ui)
      setUserInfo(uInfo)
      getProducts(uInfo)
      fetchClassifyList(uInfo)
    } else {
      window.location.href = '/#/login'
    }
  }, [])

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

  const getProducts = async (uInfo: User) => {
    const { data }: any = await axios.get(`${host}/product`)
    if (data.code === 200) {
      setProducts(data.data.filter((item: Product) => Number(item.user_id) === Number(uInfo?.id)))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('userInfo')
    window.location.href = '/#/login'
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({} as Product | undefined);

  const handleOpenNewProductModal = () => {
    setCurrentProduct(undefined);
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (product: Product) => {
    await axios.delete(`${host}/product/${product.id}`)
    getProducts(userInfo)
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitProduct = async (product: Product) => {
    if (product.id) { // 编辑
      await axios.put(`${host}/product/${product.id}`, product)
    } else { // 新增
      await axios.post(`${host}/product`, {
        ...product,
        user_id: userInfo.id
      })
    }
    getProducts(userInfo)
    setIsModalVisible(false);
  };

  const changeFilter = (e: string, name: string) => {
    const newFilter: Filter = { ...filterForm }
    if (name === 'status') {
      newFilter.status = e
    } else if (name === 'classify_id') {
      newFilter.classify_id = e
    }
    setFilterForm(newFilter)
    filterList(newFilter)
  }

  const filterList = async (newFilter: Filter | null) => {
    newFilter = newFilter || filterForm

    const { data }: any = await axios.get(`${host}/product`)
    if (data.code === 200) {
      let list: Product[] = data.data.filter((item: Product) => Number(item.user_id) === Number(userInfo.id))
      if (newFilter.status !== '-1') {
        list = list.filter(item => item.status === newFilter?.status)
      }
      if (newFilter.classify_id !== '-1') {
        list = list.filter(item => item.classify_id === `${newFilter?.classify_id}`)
      }
      setProducts(list)
    }
  }

  const showInfo = () => {
  }

  return (
    <div>
      <div>
        <Button onClick={handleOpenNewProductModal}>Create New Product</Button>
        <div className='filter'>
          <label htmlFor="">Status:&nbsp;</label>
          <Select value={filterForm.status} style={{ width: 100 }} onChange={(e) => { changeFilter(e, 'status') }}>
            <Select.Option value={'-1'}>All</Select.Option>
            <Select.Option value={'1'}>Purchased</Select.Option>
            <Select.Option value={'2'}>Used</Select.Option>
            <Select.Option value={'3'}>Given Away</Select.Option>
          </Select>
          <label htmlFor="" style={{ marginLeft: 16 }}>Classify:&nbsp;</label>
          <Select value={filterForm.classify_id} style={{ width: 100 }} onChange={(e) => { changeFilter(e, 'classify_id') }}>
            <Select.Option value={'-1'}>All</Select.Option>
            <Select.Option value={''}>Unclassified</Select.Option>
            {
              classifys.map(item => (
                <Select.Option key={item.key} value={item.id}>{item.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <div className='product-list'>
          {
            products.length ?
              <>{products.map(item => <ProductItem key={item.id} product={item} onEdit={handleEditProduct} onDelete={handleDelete} onClick={showInfo} />)}</>
              : <Empty style={{ marginTop: 16 }} />
          }
        </div>
        <ProductFormModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmitProduct}
          product={currentProduct}
        />
      </div>
    </div>
  );
};

export default Home;
