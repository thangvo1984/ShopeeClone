import { yupResolver } from '@hookform/resolvers/yup'
import { has } from 'lodash'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constant/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { schema, Schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

const useSearchProducts = () => {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log('data=========', data)
    console.log('queryConfig=========', queryConfig)
    const isHasOrderPrice = has(queryConfig, 'order')
    const tempQueryConfig = {
      ...queryConfig,
      name: data.name
    }
    if (isHasOrderPrice) {
      delete tempQueryConfig['sort_by']
      delete tempQueryConfig['order']
    }

    navigate({
      pathname: path.home,
      search: createSearchParams(tempQueryConfig).toString()
    })
  })

  return {
    onSubmit,
    register
  }
}

export default useSearchProducts
