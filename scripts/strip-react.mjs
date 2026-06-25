// 빌드 후처리: React 클라이언트 하이드레이션을 제거하고 islands.js(바닐라)만 남긴다.
//
// vite-react-ssg 는 항상 hydrateRoot 를 호출하는 <script type=module app.js> 를 주입한다.
// 이 페이지는 95% 정적 브로슈어라 클라이언트 React가 불필요 → 프리렌더 HTML은 그대로 두고
// 하이드레이션 스크립트 태그만 떼어낸 뒤, 안 쓰는 React 청크(app/client .js)를 삭제한다.
// (인터랙션은 public/islands.js 가 담당 — index.html 에서 defer 로드)
import { readdir, readFile, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

const HYDRATION_SCRIPT = /<script type="module"[^>]*src="\/assets\/app-[^"]+\.js"[^>]*><\/script>/g
const ISLANDS_TAG = '<script src="/islands.js" defer></script>'

async function stripHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      await stripHtml(path)
    } else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8')
      const stripped = html.replace(HYDRATION_SCRIPT, '')
      if (stripped === html) continue // React 프리렌더 페이지가 아니면 건너뜀
      // 하이드레이션 스크립트 제거 + islands.js(바닐라) 주입
      const next = stripped.replace('</body>', ISLANDS_TAG + '</body>')
      await writeFile(path, next)
      console.log('[strip-react] 하이드레이션→islands 교체:', path.replace(DIST, 'dist'))
    }
  }
}

await stripHtml(DIST)

// 안 쓰는 React 번들 삭제(app-*.js / client-*.js). CSS(app-*.css)는 유지.
const assetsDir = join(DIST, 'assets')
for (const file of await readdir(assetsDir)) {
  if (/^(app|client)-[\w-]+\.js$/.test(file)) {
    await rm(join(assetsDir, file))
    console.log('[strip-react] 미사용 React 청크 삭제:', file)
  }
}
