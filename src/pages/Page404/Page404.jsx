import Button from '../../components/buttons/Button'
import frontRoutes from '../../routes/frontRoutes'

function Page404() {
  return (
    <div className='container'>
      <h2>Сторінка не знайдена</h2>
      <Button to={frontRoutes.navigate.home}> На головну</Button>
    </div>
  )
}

export default Page404
