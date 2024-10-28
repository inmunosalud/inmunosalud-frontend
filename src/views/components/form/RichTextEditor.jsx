import React from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import { useTheme } from '@mui/material'

const RichTextEditor = ({ field, errors }) => {
  const theme = useTheme()

  return (
    <div className={`quill-wrapper ${errors.description ? 'error' : ''}`} style={{ position: 'relative' }}>
      <ReactQuill
        value={field.value}
        onChange={field.onChange}
        formats={['link', 'p', 'br']}
        theme='snow'
        modules={{
          toolbar: [['link']],
          clipboard: {
            matchVisual: false
          }
        }}
        style={{
          height: '200px'
        }}
      />
      <style jsx global>{`
        .quill-wrapper .ql-container {
          border: 1px solid ${theme.palette.text.disabled};
          border-top: none;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .quill-wrapper .ql-toolbar {
          border: 1px solid ${theme.palette.text.disabled};
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .quill-wrapper.error .ql-container,
        .quill-wrapper.error .ql-toolbar {
          border-color: ${theme.palette.error.main} !important;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor
