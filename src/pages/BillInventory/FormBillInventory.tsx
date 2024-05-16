import FormInventoryCmp from 'src/component/FormInventory/FormInventoryCmp'

function FormBillInventory() {
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <div>
      <FormInventoryCmp onSubmit={onSubmit} />
    </div>
  )
}

export default FormBillInventory
