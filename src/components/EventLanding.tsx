'use client';

import { useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import s from './EventLanding.module.scss';

type FormKind = 'register' | 'newsletter';

function Arrow({ large = false }: { large?: boolean }) {
  return <span aria-hidden="true" className={large ? s.largeArrow : s.arrow}>↗</span>;
}

export default function EventLanding() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [formKind, setFormKind] = useState<FormKind>('register');
  const [submitted, setSubmitted] = useState(false);

  function openForm(kind: FormKind) {
    setFormKind(kind);
    setSubmitted(false);
    dialog.current?.showModal();
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return <>
    <a className={s.skip} href="#main">Skip to main content</a>
    <header className={s.hero} id="home">
      <Image className={s.cover} src="/assets/hero-runners.jpg" alt="Runners on a track at sunrise" fill priority sizes="100vw" />
      <div className={s.shade} />
      <nav className={s.nav} aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#home" className={s.logo} aria-label="Running for Change home">Running for Change</a>
        <div className={s.navLinks}><a href="#about">About Us</a><a href="#event">Events</a></div>
      </nav>
      <div className={s.heroBottom}>
        <dl className={s.eventDetails} id="event">
          <div><dt>Location:</dt><dd>Green Bay Trail, Glencoe, IL</dd></div>
          <div><dt>Date</dt><dd>May 12, 2025</dd></div>
          <div><dt>Time</dt><dd>6AM - NOON</dd></div>
        </dl>
        <button className={s.pill} onClick={() => openForm('register')}>Register</button>
      </div>
    </header>

    <main id="main">
      <section className={s.intro} aria-labelledby="intro-heading">
        <Image className={s.cover} src="/assets/city-runner.jpg" alt="A runner moving through a leafy city street" fill sizes="100vw" />
        <div className={s.shade} />
        <div className={s.introPanel}>
          <h1 id="intro-heading">Stride Together, Shape Tomorrow.</h1>
          <p>Ditch the gridlock and embrace the open road. Run, donate, or bring the vibe as we create pathways for a healthier, more connected community, one step at a time.</p>
          <button className={`${s.pill} ${s.darkPill}`} onClick={() => openForm('newsletter')}>Newsletter <Arrow /></button>
        </div>
      </section>

      <section className={s.community} aria-label="Our community">
        <div className={s.raised}>
          <Image className={s.cover} src="/assets/countryside-run.jpg" alt="A runner on a quiet countryside road" fill sizes="(max-width: 600px) 100vw, 50vw" />
          <div className={s.raisedContent}>
            <div><h2>30K Raised</h2><p>By North Shore residents</p></div>
            <a className={s.pill} href="#about">About Us</a>
          </div>
        </div>
        <div className={s.newsletter}>
          <h2>Don’t Miss a Step</h2>
          <p>Get the latest updates and details about the event.</p>
          <button className={`${s.pill} ${s.darkPill}`} onClick={() => openForm('newsletter')}>Newsletter <Arrow /></button>
        </div>
      </section>

      <section className={s.mission} id="about" aria-label="Our mission">
        <h2>Our mission is to improve suburban quality of life by reducing car dependency and promoting active transportation.</h2>
        <button className={`${s.pill} ${s.blackPill}`} onClick={() => openForm('register')}>Register <Arrow /></button>
        <Arrow large />
      </section>
    </main>

    <footer className={s.footer}>
      <Image className={s.cover} src="/assets/footer-runners.jpg" alt="" fill sizes="100vw" />
      <div className={s.footerShade} />
      <div className={s.footerTop}>
        <div className={s.contacts}>
          <div><p>Email</p><a href="mailto:hello@figma.com">hello@figma.com</a></div>
          <div><p>Sponsorship</p><a href="mailto:hello@figma.com">hello@figma.com</a></div>
        </div>
        <div className={s.footerInfo}>
          <div><p>Socials</p><div className={s.socials}>
            <a href="https://www.instagram.com/figma/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            <a href="https://x.com/figma" target="_blank" rel="noreferrer" aria-label="X">𝕏</a>
            <a href="https://www.facebook.com/figmadesign/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
          </div></div>
          <div><p>New Fundraiser</p><p className={s.legal}>Running for Change is a 501(c)(3) non-profit organization. Contributions are tax-deductible to the extent permitted by law.</p></div>
        </div>
      </div>
      <p className={s.wordmark}>Running For Change</p>
    </footer>

    <dialog ref={dialog} className={s.dialog} aria-labelledby="dialog-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button className={s.close} aria-label="Close dialog" onClick={() => dialog.current?.close()}>×</button>
      {submitted ? <div className={s.success} role="status">
        <span aria-hidden="true">✓</span><h2 id="dialog-title">You’re all set.</h2>
        <p>This is a portfolio demo. No information has been sent and no real registration or subscription has been created.</p>
        <button className={s.pill} onClick={() => dialog.current?.close()}>Back to the event</button>
      </div> : <>
        <p className={s.eyebrow}>Running for Change · Portfolio demo</p>
        <h2 id="dialog-title">{formKind === 'register' ? 'Take the first step.' : 'Don’t miss a step.'}</h2>
        <p className={s.formIntro}>{formKind === 'register' ? 'Try the registration experience for this community run.' : 'Try signing up for news from the running community.'} This form is a demonstration; your details won’t be sent.</p>
        <form onSubmit={submitForm}>
          {formKind === 'register' && <label>Your name<input name="name" autoComplete="name" placeholder="Alex Runner" required maxLength={100} /></label>}
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label>
          {formKind === 'register' && <label>I’d like to<select name="participation" defaultValue="run"><option value="run">Run with the community</option><option value="volunteer">Volunteer at the event</option><option value="support">Support the fundraiser</option></select></label>}
          <button className={s.pill} type="submit">{formKind === 'register' ? 'Try registration' : 'Try newsletter signup'} <Arrow /></button>
        </form>
      </>}
    </dialog>
  </>;
}
