import React, { useEffect, useState } from 'react'
import ReadmeContent from './ReadmeContent'
import './index.css'

function GithubRimworld() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/search/repositories?q=rimworld')
      .then(response => response.json())
      .then(response => {
        let repositories = response.items

        repositories = repositories.map(item => {
          const {
            full_name,
            html_url,
            description,
            created_at,
            updated_at,
            homepage,
            stargazers_count,
            license,
            topics,
            default_branch,
          } = item

          const uid = item.owner.id
          const size = 48

          return {
            name: full_name,
            project: html_url,
            homepage,
            description,
            created: created_at,
            updated: updated_at,
            stars: stargazers_count,
            license,
            topics,
            author: item.owner.login,
            avatar: `https://avatars.githubusercontent.com/u/${uid}?s=${size}&v=4`,
            authorPage: item.owner.html_url,
            readmeUrl: `https://raw.githubusercontent.com/${full_name}/${default_branch}/README.md`,
          }
        })

        setRepositories(repositories)
      })
      .catch(err => {
        throw err
      })
  }, [])

  return (
    <article>
      <div className="repositories-wrapper">
        {repositories.map(repository => {
          return (
            <section key={repository.project} className="repository-card">
              <hgroup>
                <a href={repository.authorPage} className="avatar">
                  <img
                    src={repository.avatar}
                    alt={repository.author + "'s avatar"}
                    lazy="true"
                  />
                </a>

                <h2>
                  <a href={repository.project} className="title">
                    {repository.name}
                  </a>
                </h2>
                {repository.author === 'Ludeon' && '👑'}
                {repository.name === 'UnlimitedHugs/RimworldHugsLib' && '🛠️'}
              </hgroup>

              {/* 项目描述文本 */}
              {repository.description && <p>{repository.description}</p>}
              {/* 项目自述内容 */}
              <h3>README.md</h3>
              <blockquote>
                <ReadmeContent url={repository.readmeUrl} />
              </blockquote>

              <div className="more-wrapper">
                {repository.license?.name && (
                  <div className="license-wrapper">
                    <svg
                      aria-hidden="true"
                      width="15"
                      height="15"
                      fill="#656d76"
                      viewBox="0 0 16 16"
                      version="1.1"
                      data-view-component="true"
                    >
                      <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"></path>
                    </svg>
                    <span>{repository.license.name}</span>
                  </div>
                )}
                {repository.homepage && (
                  <a href={repository.homepage} className="homepage">
                    Homepage
                  </a>
                )}
              </div>

              <div className="footer-bar">
                <span>⭐ {repository.stars}</span>
                <span>
                  Updated on <time>{repository.updated}</time>
                </span>
                <span
                  style={{
                    color: '#1f883d',
                    fontWeight: 'bold',
                    marginLeft: 'auto',
                    cursor: 'pointer',
                  }}
                >
                  Download
                </span>
              </div>
            </section>
          )
        })}
      </div>
    </article>
  )
}

export default GithubRimworld
