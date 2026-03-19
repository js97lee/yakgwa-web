import { useState, useEffect, useRef } from 'react'
import './App.css'

const INQUIRE_EMAIL = 'refoodrab@gmail.com'

const SECTIONS_DATA = [
  {
    id: 'hero',
    type: 'hero',
    color: 'transparent',
    subline: '달콤함은 그대로, 부담은 줄였다',
    headline: '아이돌도 선택한',
    product: '단백질 저당미니약과',
    cta: '사전 예약하기',
  },
  {
    id: 'intro',
    type: 'intro',
    color: 'transparent',
    headline: '건강과 맛을 동시에 잡았다! 단백질 저당 미니약과!',
    values: [
      '고단백·고식이섬유! 밀가루 대신 콩을 사용해 채웠습니다.',
      '저당 시럽로 구현한 건강하고 깊은 단맛',
      '가방에 쏙! 미니 사이즈로 즐기는 저당 간식',
    ],
  },
  {
    id: 'target',
    type: 'target',
    color: '#141414',
    headline: '취향대로 고르는 저당 간식, 이런분들께 추천해요!',
    items: [
      '식단 관리 중 달콤한 디저트가 먹고 싶을때',
      '혈당관리가 필요한 부모님께 선물이 필요할때',
      '색다른 K-Dessert를 경험해보고 싶을 때',
    ],
  },
  {
    id: 'yellow',
    type: 'gallery',
    color: '#FFD93D',
    images: [
      { src: 'img/gallery-1.png', alt: '약과를 먹는 모델' },
      { src: 'img/gallery-2.png', alt: '약과를 먹는 모델' },
      { src: 'img/gallery-3.png', alt: '약과를 먹는 모델' },
      { src: 'img/gallery-4.png', alt: '약과를 먹는 모델' },
    ],
  },
  {
    id: 'process',
    type: 'process',
    color: '#1a1a1a',
    headline: 'Re:Food Lab이 약과를 재해석하는 방법',
    steps: [
      { title: '단백질 더합니다', desc: '콩 베이스를 활용해 단백질과 식이섬유의 균형을 잡습니다.' },
      { title: '당을 낮춥니다', desc: '알룰로스를 활용한 로우슈거 집청 공법으로 칼로리 부담을 줄입니다.' },
      { title: '식감을 완성합니다', desc: '한입 사이즈로 쏙 감기는 쫀득한 저당 약과를 즐길수 있습니다.' },
    ],
  },
  {
    id: 'value1',
    type: 'value',
    color: '#1e1e1e',
    title: '밀가루 대신 \'콩\', 간식을 넘어선 영양',
    desc: '단순히 배를 채우는 간식이 아닙니다. 콩 기반의 원재료로 단백질과 식이섬유 함량을 높였습니다. 이제 약과 한 입으로도 건강한 영양소를 챙길 수 있습니다.',
  },
  {
    id: 'value2',
    type: 'value',
    color: '#1a1a1a',
    title: '설탕 없이도 완벽한 \'알룰로스\'의 달콤함',
    desc: '당류 함량은 확 낮추고 단맛의 풍미는 그대로 유지했습니다. 알룰로스를 사용하여 혈당 걱정이나 칼로리 죄책감 없이 온 가족이 마음 편히 즐길 수 있습니다.',
  },
  {
    id: 'value3',
    type: 'value',
    color: '#1e1e1e',
    title: '가방 속에 쏙, 일상 어디서나 즐기는 미니멀 디저트',
    desc: '끈적이고 먹기 불편했던 큰 약과의 단점을 해결했습니다. 한입 사이즈의 미니 약과로 사무실, 운동 전후, 이동 중에도 깔끔하고 가볍게 즐기세요.',
  },
  {
    id: 'price',
    type: 'price',
    color: '#141414',
    headline: '건강한 달콤함을 가장 먼저 경험하세요',
    plans: [
      { name: '스타터 팩 (10개입)', desc: '1인 가구를 위한 가벼운 시작' },
      { name: '패밀리 팩 (30개입)', desc: '온 가족 영양 간식으로 넉넉하게 (베스트 구성)' },
      { name: '선물용 세트', desc: '소중한 분께 드리는 건강한 아름다움' },
    ],
  },
  {
    id: 'effect',
    type: 'effect',
    color: '#0f0f0f',
    headline: 'Re:Food Lab 약과와 함께할 새로운 일상',
    effects: [
      '"오후 3시, 당 떨어지는 시간에 칼로리 걱정 없이 즐기는 달콤한 휴식"',
      '"고마운분들과 부모님께 드리는 건강한 저당 디저트"',
      '"운동 후 가볍게 당 충전이 필요할 때 찾는 단백질 스낵"',
    ],
  },
  {
    id: 'faq',
    type: 'faq',
    color: '#1a1a1a',
    headline: '궁금한 점을 확인해보세요',
    qa: [
      { q: '설탕이 안 들어갔는데 정말 달콤한가요?', a: '네, 설탕 대신 천연 감미료인 알룰로스를 사용하여 약과 특유의 깊은 단맛을 건강하게 구현했습니다.' },
      { q: '콩으로 만들면 식감이 딱딱하지 않나요?', a: 'Re:Food Lab만의 공법으로 일반 약과보다 더 쫀득하고 부드러운 식감을 완성했습니다.' },
      { q: '약과 1개를 먹었을때 칼로리와 단백질 함량은 어떻게 되나요?', a: '**g의 단백질과 **kcal를 제공합니다.' },
    ],
  },
  {
    id: 'closing',
    type: 'closing',
    color: '#2a2a2a',
    quote: '"우리는 달콤한 디저트가 건강을 해치지 않아야 한다고 믿습니다."',
    desc: 'Re:Food Lab은 익숙한 전통 간식을 현대적인 감각으로 재설계합니다.',
  },
]

function App() {
  const interactionBlockRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [lang, setLang] = useState('KR')
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', content: '' })
  const [formError, setFormError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formSending, setFormSending] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const el = interactionBlockRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const totalHeight = el.offsetHeight
        const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + totalHeight)))
        setScrollProgress(progress)
      }
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const percent = maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0
      setScrollPercent(Math.min(100, percent))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(false)
    setFormSuccess(false)
    const hasError = !formData.name || !formData.email || !formData.contact || !formData.content
    if (hasError) {
      setFormError(true)
      return
    }
    setFormSending(true)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${INQUIRE_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[문의] ${formData.name}님의 문의사항`,
          이름: formData.name,
          이메일: formData.email,
          연락처: formData.contact,
          내용: formData.content,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setFormSuccess(true)
        setFormData({ name: '', email: '', contact: '', content: '' })
      } else setFormError(true)
    } catch {
      setFormError(true)
    } finally {
      setFormSending(false)
    }
  }

  const renderSection = (s) => {
    switch (s.type) {
      case 'hero':
        return (
          <div className="content-section hero-section">
            <h4 className="hero-subline">{s.subline}</h4>
            <h1 className="hero-headline">
              {s.headline}
              <br />
              {s.product}
            </h1>
            <a href="#inquire" className="cta-btn">{s.cta}</a>
          </div>
        )
      case 'intro':
        return (
          <div className="content-section intro-section">
            <div className="intro-yakgwa-wrap">
              <img
                src="img/yakgwa.png"
                alt="단백질 저당 미니약과"
                className="interaction-img"
                style={{
                  transform: `translateY(${scrollProgress * 200}px) rotate(${-15 + scrollProgress * 375}deg) scale(${1 - scrollProgress * 0.3})`,
                }}
              />
            </div>
            <h2 className="section-headline">{s.headline}</h2>
            <ul className="value-list">
              {s.values.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
        )
      case 'target':
        return (
          <div className="content-section target-section">
            <h2 className="section-headline">{s.headline}</h2>
            <ul className="target-list">
              {s.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        )
      case 'process':
        return (
          <div className="content-section process-section">
            <h2 className="section-headline">{s.headline}</h2>
            <div className="process-steps">
              {s.steps.map((step, i) => (
                <div key={i} className="process-step">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'value':
        return (
          <div className="content-section value-section">
            <h3 className="value-title">{s.title}</h3>
            <p className="value-desc">{s.desc}</p>
          </div>
        )
      case 'price':
        return (
          <div className="content-section price-section">
            <h2 className="section-headline">{s.headline}</h2>
            <div className="price-plans">
              {s.plans.map((p, i) => (
                <div key={i} className="price-plan">
                  <h4>{p.name}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'effect':
        return (
          <div className="content-section effect-section">
            <h2 className="section-headline">{s.headline}</h2>
            <ul className="effect-list">
              {s.effects.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )
      case 'faq':
        return (
          <div className="content-section faq-section">
            <h2 className="section-headline">{s.headline}</h2>
            <div className="faq-list">
              {s.qa.map((item, i) => (
                <div key={i} className="faq-item">
                  <p className="faq-q">Q. {item.q}</p>
                  <p className="faq-a">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )
      case 'closing':
        return (
          <div className="content-section closing-section">
            <p className="closing-quote">{s.quote}</p>
            <p className="closing-desc">{s.desc}</p>
          </div>
        )
      case 'gallery':
        return (
          <div className="content-section gallery-section">
            <div className="gallery-grid">
              {s.images.map((img, i) => (
                <div key={i} className="gallery-col">
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="yakgwa-page">
      <nav className="top-nav">
        <div className="nav-inner">
        <a href="#" className="nav-logo">종로약과</a>
        <div className="nav-right">
          <a href="#inquire" className="nav-inquire">문의하기</a>
          <div className="nav-lang">
            <button className={`lang-btn ${lang === 'KR' ? 'active' : ''}`} onClick={() => setLang('KR')}>KR</button>
            <button className={`lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => setLang('EN')}>EN</button>
          </div>
        </div>
        </div>
      </nav>

      {/* 레이아웃: 콘텐츠(섹션3~)가 먼저 → 그 위에 섹션1-2 오버레이 */}
      <div className="page-scroll-container">
        <div className="content-sections-layer">
          {SECTIONS_DATA.map((s) => (
            <section key={s.id} id={s.id} className="section content-section-wrap" style={{ backgroundColor: s.color }}>
              {renderSection(s)}
            </section>
          ))}
          <footer className="footer-section">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-brand">
              <span className="brand-text">Re:Food Lab</span>
              <div className="social-icons">
                <a href="#" aria-label="LinkedIn" className="icon-linkedin">in</a>
                <a href="#" aria-label="Instagram" className="icon-insta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1.5"/></svg>
                </a>
              </div>
            </div>
            <hr className="footer-hr" />
            <div className="footer-company">
              <p><strong>팀명:</strong> Re:Food Lab</p>
              <p><strong>대표:</strong> (입력 예정)</p>
              <p><strong>주소:</strong> 서울특별시 (상세 주소 입력)</p>
              <p><strong>문의:</strong> <a href="mailto:contact@refoodlab.com">contact@refoodlab.com</a></p>
            </div>
            <hr className="footer-hr" />
            <div className="about-block">
              <h3>ABOUT US</h3>
              <div className="contact-info">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+82216442236">+82 2 1644-2236</a>
              </div>
              <div className="contact-info">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:contact@refoodlab.com">contact@refoodlab.com</a>
              </div>
            </div>
          </div>
          <div className="footer-right" id="inquire">
            <h3 className="inquire-title">INQUIRE</h3>
            <form onSubmit={handleSubmit} className="inquire-form">
              <div className="form-group">
                <label>이름</label>
                <input type="text" placeholder="이 필드를 채워주세요." value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="이 필드를 채워주세요." value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>연락처</label>
                <input type="tel" placeholder="이 필드를 채워주세요." value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
              </div>
              <div className="form-group">
                <label>내용</label>
                <textarea placeholder="" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} />
              </div>
              <button type="submit" className="submit-btn" disabled={formSending}>
                {formSending ? '전송 중...' : 'SUBMIT →'}
              </button>
              {formSuccess && <div className="form-success">문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.</div>}
              {formError && <div className="form-error">하나 이상의 항목에 오류가 있습니다. 재확인 후 다시 시도하세요.</div>}
            </form>
          </div>
        </div>
        <p className="copyright">Copyright © 2024 Re:Food Lab. All rights reserved.</p>
        </footer>
        </div>

        {/* 섹션1: 비디오 BG + 블랙딤 40% + 장식 텍스트 */}
        <div className="hero-video-section" ref={interactionBlockRef}>
          <video
            className="hero-bg-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="video/bg-motion.mp4" type="video/mp4" />
          </video>
          <div className="hero-bg-dim" />
          <div className="hero-bg-text hero-bg-text-1">YAKGWA</div>
          <div className="hero-bg-text hero-bg-text-2">K-Dessert</div>
        </div>

        {/* 하단 섹션 네비게이션 (BBOM 스타일) */}
        <nav className="bottom-section-nav">
          <a href="#intro">서비스 소개</a>
          <span className="nav-divider" />
          <a href="#target">대상 고객</a>
          <span className="nav-divider" />
          <a href="#process">진행 방식</a>
          <span className="nav-divider" />
          <a href="#price">Price Plan</a>
          <span className="nav-divider" />
          <a href="#faq">FAQ</a>
          <span className="nav-divider" />
          <a href="#inquire">문의</a>
        </nav>
      </div>

      {/* 8% 스크롤까지 '건강과 맛을~' copy 위쪽 60px 비치기 */}
      <div
        className="intro-headline-peek"
        style={{
          transform: `translateY(calc(100% - ${scrollPercent <= 8 ? (scrollPercent / 8) * 60 : 60}px))`,
          opacity: scrollPercent <= 8 ? 0.95 : 0,
        }}
      >
        건강과 맛을 동시에 잡았다! 단백질 저당 미니약과!
      </div>

      <div className="scroll-percent">{scrollPercent}%</div>
      <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="맨 위로">↑</button>
    </div>
  )
}

export default App
