import { marked } from 'marked'
import React, { useEffect, useState } from 'react'
import './index.css'

function ReadmeContent({ url }) {
  const [content, setContent] = useState(null)

  const markedToHTML = markdown => {
    if (typeof markdown === 'undefined' || markdown === null) {
      return
    }

    return marked(markdown, { mangle: false, headerIds: false })
  }

  useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(response => {
        setContent(response)
      })
  }, [url])

  return (
    <article
      className="readme"
      dangerouslySetInnerHTML={{ __html: markedToHTML(content) }}
    ></article>
  )
}

export default ReadmeContent
