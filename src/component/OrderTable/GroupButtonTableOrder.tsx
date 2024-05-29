import ButtonTableOrder from './ButtonTableOrder'

function ButtonGroupTableOrder({
  status,
  handleChangeStatus,
  handleView,
  id
}: {
  status: 'Ordered' | 'Delivery' | 'Canceled' | 'Completed'
  handleChangeStatus?: ({ id, status }: { id: number; status: string }) => void
  handleView: () => void
  id: number
}) {
  return (
    <>
      {status == 'Ordered' && (
        <ButtonTableOrder
          onClick={() => handleChangeStatus && handleChangeStatus({ id: id, status: 'Delivery' })}
          type='Confirm'
        />
      )}
      {status == 'Delivery' && (
        <ButtonTableOrder
          onClick={() => handleChangeStatus && handleChangeStatus({ id: id, status: 'Completed' })}
          type='Completed'
        />
      )}
      {status != 'Completed' && status != 'Canceled' && (
        <ButtonTableOrder
          onClick={() => handleChangeStatus && handleChangeStatus({ id: id, status: 'Canceled' })}
          type='Cancel'
        />
      )}
      <ButtonTableOrder onClick={handleView} type='View' />
    </>
  )
}

export default ButtonGroupTableOrder
