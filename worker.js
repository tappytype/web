// Workers Static Assets 엔트리.
// 루트(/) 접속만 Worker가 먼저 받아 브라우저 언어로 1회 분기한다.
//   · 영어권(Accept-Language 1순위가 ko가 아님) → /en 로 302
//   · 한국어/그 외/헤더 없음 → 루트(한국어) 정적 에셋 그대로
// Nav에서 언어를 직접 고른 사용자는 ttlang 쿠키로 추측을 끈다(무한 튕김 방지).
// run_worker_first: ["/"] 라서 그 외 경로(/en, /assets 등)는 Worker를 거치지 않는다.
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/' && !(request.headers.get('Cookie') || '').includes('ttlang=')) {
      const al = (request.headers.get('Accept-Language') || '').trim().toLowerCase()
      if (al && !al.startsWith('ko')) {
        return Response.redirect(url.origin + '/en', 302)
      }
    }

    return env.ASSETS.fetch(request)
  },
}
