import TableHeader from '@/components/PageHeader/TableHeader'
import { SizeTable } from '@/components/Tables/SizeTable'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Sizes = () => {
    const location = useLocation()
    const product = location.state?.product || null
    console.log('product in sizes page', product)
  return (
    <>
      <TableHeader title={product.name} link="/admin/page-form" />
      <SizeTable sizes={product.sizes} />
    </>
  );
}

export default Sizes
