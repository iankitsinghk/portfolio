import Giscus from '@giscus/react'

export default function GiscusComments({ postId }) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6">💬 Comments</h3>
      <Giscus
        key={postId}
        repo="iankitsinghk/portfolio"
        repoId="R_kgDORhmhpw"
        category="Announcements"
        categoryId="DIC_kwDORhmhp84C39GW"
        mapping="specific"
        term={postId}
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  )
}