import { useState, useMemo } from 'react'
import { DataTable, useTheme } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'

import { CustomText, Loading } from '@/components'

type CustomTableProps = {
  titles: { name: string, numeric?: boolean }[]
  data: any[]
  renderRow: (item: any, index: number) => JSX.Element
  customTable?: string
  isNotPagination?: boolean
  isLoading?: boolean
}

function CustomTable({
  titles,
  data,
  renderRow,
  customTable = '',
  isNotPagination,
  isLoading
}: CustomTableProps) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const [page, setPage] = useState<number>(0)
  const [numberOfItemsPerPageList] = useState([10, 100])
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0])
  const from = useMemo(() => page * itemsPerPage, [page, itemsPerPage])
  const to = useMemo(() => Math.min((page + 1) * itemsPerPage, data.length), [page, itemsPerPage, data.length])

  return (
    <DataTable className={`max-h-full ${customTable}`}>
      {titles.length > 0 &&
        <DataTable.Header className='border-gray-400'>
          {titles.map((title, index) => (
            <DataTable.Title key={index} numeric={title.numeric} className='mt-2'>
              <CustomText className='text-xs text-gray-500 '>
                {title.name}
              </CustomText>
            </DataTable.Title>
          ))}
        </DataTable.Header>
      }
      <ScrollView className=''>
        {isLoading ?
          <DataTable.Row>
            <DataTable.Cell>
              <Loading />
            </DataTable.Cell>
          </DataTable.Row>
          :
          data.length > 0
            ? isNotPagination
              ? data.map((item, index) => renderRow(item, index))
              : data.slice(from, to).map((item, index) => renderRow(item, index))
            :
            <DataTable.Row>
              <DataTable.Cell>
                <CustomText className='text-sm text-center w-full'>
                  {t('no data available')}!
                </CustomText>
              </DataTable.Cell>
            </DataTable.Row>
        }
      </ScrollView>
      {!isNotPagination &&
        <DataTable.Pagination
          theme={{
            colors: {
              primary: colors.onSurfaceDisabled,
              onSurface: colors.onSurfaceDisabled,
              elevation: { level2: colors.onSurfaceDisabled },
            },
          }}
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={t('rows per page')}
        />
      }
    </DataTable>
  )
}

export default CustomTable