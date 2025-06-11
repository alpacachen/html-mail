'use client'

import { useState } from 'react'
import * as XLSX from 'xlsx'

interface JsonData {
  [key: string]: unknown
}

export default function JsonlToExcelPage() {
  const [jsonData, setJsonData] = useState<JsonData[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [fileName, setFileName] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // 处理文件上传
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.jsonl') && !file.name.endsWith('.json')) {
      alert('请上传 .jsonl 或 .json 文件')
      return
    }

    setIsLoading(true)
    setFileName(file.name)

    try {
      const text = await file.text()
      const lines = text.trim().split('\n')
      const parsedData: JsonData[] = []
      
      // 解析每一行JSON
      for (const line of lines) {
        if (line.trim()) {
          try {
            const jsonObj = JSON.parse(line.trim())
            parsedData.push(jsonObj)
          } catch {
            console.warn('跳过无效的JSON行:', line)
          }
        }
      }

      if (parsedData.length === 0) {
        alert('没有找到有效的JSON数据')
        return
      }

      // 提取所有唯一的列名
      const allColumns = new Set<string>()
      parsedData.forEach(item => {
        Object.keys(item).forEach(key => allColumns.add(key))
      })

      setJsonData(parsedData)
      setColumns(Array.from(allColumns))
    } catch (error) {
      console.error('文件解析错误:', error)
      alert('文件解析失败，请检查文件格式')
    } finally {
      setIsLoading(false)
    }
  }

  // 导出Excel
  const exportToExcel = () => {
    if (jsonData.length === 0) {
      alert('没有数据可导出')
      return
    }

    try {
      // 创建工作簿
      const workbook = XLSX.utils.book_new()
      
      // 转换数据为二维数组格式
      const worksheetData = [
        columns, // 表头
        ...jsonData.map(row => 
          columns.map(col => row[col] !== undefined ? row[col] : '')
        )
      ]
      
      // 创建工作表
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
      
      // 设置列宽
      const colWidths = columns.map(col => ({
        wch: Math.max(col.length, 15)
      }))
      worksheet['!cols'] = colWidths
      
      // 添加工作表到工作簿
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      
      // 导出文件
      const exportFileName = fileName.replace(/\.(jsonl|json)$/, '.xlsx')
      XLSX.writeFile(workbook, exportFileName)
    } catch (error) {
      console.error('导出失败:', error)
      alert('导出Excel失败')
    }
  }

  // 清空数据
  const clearData = () => {
    setJsonData([])
    setColumns([])
    setFileName('')
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          JSONL 转 Excel 工具
        </h1>
        
        {/* 文件上传区域 */}
        <div className="mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept=".jsonl,.json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-lg text-gray-600">点击上传 JSONL 文件</span>
              <span className="text-sm text-gray-400 mt-1">支持 .jsonl 和 .json 格式</span>
            </label>
          </div>
        </div>

        {/* 加载状态 */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">正在解析文件...</p>
          </div>
        )}

        {/* 操作按钮 */}
        {jsonData.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
            <div className="text-sm text-gray-600">
              已加载 <span className="font-semibold text-blue-600">{jsonData.length}</span> 条记录，
              共 <span className="font-semibold text-blue-600">{columns.length}</span> 个字段
              {fileName && <span className="ml-2">({fileName})</span>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                导出 Excel
              </button>
              <button
                onClick={clearData}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                清空数据
              </button>
            </div>
          </div>
        )}

        {/* 数据表格 */}
        {jsonData.length > 0 && (
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                    #
                  </th>
                  {columns.map((column, index) => (
                    <th
                      key={column}
                      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        index < columns.length - 1 ? 'border-r border-gray-200' : ''
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jsonData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200 bg-gray-50 font-medium">
                      {rowIndex + 1}
                    </td>
                    {columns.map((column, colIndex) => (
                      <td
                        key={column}
                        className={`px-4 py-3 text-sm text-gray-900 ${
                          colIndex < columns.length - 1 ? 'border-r border-gray-200' : ''
                        }`}
                      >
                        <div className="truncate" title={String(row[column] || '')}>
                          {row[column] !== undefined && row[column] !== null
                            ? typeof row[column] === 'object'
                              ? JSON.stringify(row[column])
                              : String(row[column])
                            : '-'}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 空状态 */}
        {jsonData.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">暂无数据</p>
            <p className="text-sm">请上传 JSONL 文件开始使用</p>
          </div>
        )}
      </div>
    </div>
  )
}