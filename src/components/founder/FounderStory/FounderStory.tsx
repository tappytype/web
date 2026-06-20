import { useLang } from '@/contexts/LangContext'
import { LINKS } from '@/lib/constants/links'
import Section from '@/components/ui/Section/Section'
import './FounderStory.css'

// 만든 이의 이야기는 1인칭 영어 산문으로 ko/en 동일하게 유지(현행 동작 보존). 라벨·제목·링크만 i18n.
export default function FounderStory() {
  const { t } = useLang()
  return (
    <Section id="founder">
      <span className="sec-label">{t('st_label')}</span>
      <h2>{t('st_title')}</h2>
      <p className="story-hook">Do you like typography?</p>
      <p className="story-intro">
        Since I was a little girl, I&rsquo;ve loved typography. Sometimes I dreamed of turning my
        handwriting into a font.
      </p>

      <div className="story-scenes">
        <div className="scene">
          <div className="scene-img">
            <img
              src="/assets/shot-onboarding.png"
              alt="태피타입 앱 온보딩 화면"
              loading="lazy"
              width={750}
              height={1000}
            />
          </div>
          <div className="scene-text">
            <p>
              Today, thanks to AI, we can do almost anything in the digital world. For my dream of
              making my own font, I decided to build an iPad app that easily creates letter image
              files.
            </p>
          </div>
        </div>

        <div className="scene wide">
          <div className="scene-text">
            <p>
              However, there&rsquo;s still a challenge because of the unique properties of the Korean
              character <span className="han">한글</span>. I need to write out each letter for the
              11,172 possible character combinations (at least 2350). If not, you will see clumsy
              letters. Neither the Apple Pencil nor NanoBanana can solve this problem.
            </p>
          </div>
          <figure className="scene-img">
            <img
              src="/assets/story-result.png"
              alt="내가 쓴 몇 글자에서 AI가 나머지를 채운 결과 비교"
              loading="lazy"
              width={1200}
              height={142}
            />
            <figcaption>위: 내가 쓴 글자 · 아래: AI가 채운 결과</figcaption>
          </figure>
        </div>

        <div className="scene reverse">
          <div className="scene-img">
            <img
              src="/assets/shot-main.png"
              alt="태피타입 편집 화면"
              loading="lazy"
              width={750}
              height={1000}
            />
          </div>
          <div className="scene-text">
            <p>
              I set aside my ideas and searched the internet until I found six-year-old open-source
              code (quite old in the AI field). I immediately started experimenting to speed up the
              process. In the end, my dream became a reality.
            </p>
            <p>
              Because I want to share this experience with others, I designed, coded, and tested it
              myself. Now, I have a team member who will rebuild and upgrade the AI model. So, I
              started to prepare the App Store documents and do some PR! (yeah, that&rsquo;s what
              this is)
            </p>
          </div>
        </div>
      </div>

      <p className="story-outro">
        From now on, I will share my story about the first launch and my very first app. I hope it
        works, but even if it doesn&rsquo;t, my enthusiasm and heartfelt thoughts or actions for
        this first attempt are still worth recording. It&rsquo;s also a personal test to see if I
        want to be an entrepreneur.
      </p>
      <p className="story-sign">&mdash; Jiin, TappyType</p>
      <a className="story-link" href={LINKS.instagram} target="_blank" rel="noopener">
        {t('st_link')}
      </a>
    </Section>
  )
}
