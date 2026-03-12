import { useState, useEffect, useRef } from 'react'
import './App.css'

const SECTIONS = [
  { id: 3, color: '#d5e8d5', name: 'Section 3' },
  { id: 4, color: '#f7e8d4', name: 'Section 4' },
  { id: 5, color: '#e8e0f0', name: 'Section 5' },
  { id: 6, color: '#e8e0f0', name: 'Section 6' },
  { id: 7, color: '#d4f0f7', name: 'Section 7' },
  { id: 8, color: '#f7e0d4', name: 'Section 8' },
]

const INQUIRE_EMAIL = 'refoodrab@gmail.com'

function App() {
  const interactionBlockRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [lang, setLang] = useState('KR')
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', content: '' })

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
  const [formError, setFormError] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formSending, setFormSending] = useState(false)

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
      } else {
        setFormError(true)
      }
    } catch {
      setFormError(true)
    } finally {
      setFormSending(false)
    }
  }

  return (
    <div className="yakgwa-page">
      {/* 상단 네비게이션 바 */}
      <nav className="top-nav">
        <a href="#" className="nav-logo">달빛약과</a>
        <div className="nav-right">
          <a href="#inquire" className="nav-inquire">문의하기</a>
          <div className="nav-lang">
            <button className={`lang-btn ${lang === 'KR' ? 'active' : ''}`} onClick={() => setLang('KR')}>KR</button>
            <button className={`lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => setLang('EN')}>EN</button>
          </div>
        </div>
      </nav>

      {/* 인터랙션 블록: 섹션1+2 - 이미지가 1열에서 떨어지면서 회전 & 70% 축소 */}
      <div className="interaction-block" ref={interactionBlockRef}>
        <div className="interaction-sticky">
          <img
            src="/img/yakgwa.png"
            alt="한국 전통 과자 약과"
            className="interaction-img"
            style={{
              transform: `translateY(${scrollProgress * 200}px) rotate(${scrollProgress * 360}deg) scale(${1 - scrollProgress * 0.3})`,
            }}
          />
        </div>
        <div className="interaction-section section section-1" />
        <div className="interaction-section section section-2" />
      </div>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          className="section"
          style={{ backgroundColor: section.color }}
        >
          <span className="section-name">{section.name}</span>
        </section>
      ))}

      {/* Footer - 마지막 섹션 */}
      <footer className="footer-section">
        <div className="footer-inner">
          {/* Left */}
          <div className="footer-left">
            <div className="footer-brand">
              <span className="brand-text">DALBIT YAKGWA</span>
              <div className="social-icons">
                <a href="#" aria-label="LinkedIn" className="icon-linkedin">in</a>
                <a href="#" aria-label="Instagram" className="icon-insta">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1.5"/></svg>
                </a>
              </div>
            </div>
            <hr className="footer-hr" />

            <div className="company-block">
              <div className="company-header">
                <h3>COMPANY</h3>
                <button className="partners-btn">PARTNERS <span>∨</span></button>
              </div>
              <div className="addresses">
                <div className="address-item">
                  <h4>본사</h4>
                  <hr />
                  <p>대구시 동구 동대구로 465, 308호</p>
                </div>
                <div className="address-divider" />
                <div className="address-item">
                  <h4>서울지점</h4>
                  <hr />
                  <p>서울 성동구 성수일로 89, 메타모르포 208호</p>
                </div>
              </div>
            </div>
            <hr className="footer-hr" />

            <div className="about-block">
              <h3>ABOUT US</h3>
              <div className="contact-info">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+82216442236">+82 2 1644-2236</a>
              </div>
              <div className="contact-info">
                <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:contact@atrt.kr">contact@atrt.kr</a>
              </div>
            </div>
          </div>

          {/* Right - INQUIRE Form */}
          <div className="footer-right" id="inquire">
            <h3 className="inquire-title">INQUIRE</h3>
            <form onSubmit={handleSubmit} className="inquire-form">
              <div className="form-group">
                <label>이름</label>
                <input
                  type="text"
                  placeholder="이 필드를 채워주세요."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input
                  type="email"
                  placeholder="이 필드를 채워주세요."
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>연락처</label>
                <input
                  type="tel"
                  placeholder="이 필드를 채워주세요."
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>내용</label>
                <textarea
                  placeholder=""
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={formSending}>
                {formSending ? '전송 중...' : 'SUBMMIT →'}
              </button>
              {formSuccess && (
                <div className="form-success">
                  문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.
                </div>
              )}
              {formError && (
                <div className="form-error">
                  하나 이상의 항목에 오류가 있습니다. 재확인 후 다시 시도하세요.
                </div>
              )}
            </form>
          </div>
        </div>
      </footer>

      {/* 스크롤 진행률 표시 (우측) */}
      <div className="scroll-percent">
        {scrollPercent}%
      </div>

      {/* 탑으로 올라가기 플로팅 버튼 */}
      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로"
      >
        ↑
      </button>
    </div>
  )
}

export default App
