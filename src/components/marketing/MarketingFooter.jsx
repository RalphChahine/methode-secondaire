import { Link } from "react-router-dom"

import { siteConfig } from "@/lib/seo"

export default function MarketingFooter({ copy, locale }) {
  return (
    <footer className="border-t border-white/10 bg-[var(--brand-navy-950)]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.2fr,0.8fr,0.9fr] lg:px-10">
        <div className="max-w-xl">
          <img src="/logo-methode-secondaire-business-card-white.svg" alt="Méthode Secondaire" className="mb-4 h-auto w-full max-w-[18rem]" />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">{copy.footerBlurb}</p>
        </div>

        <div>
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/45">{locale === "en" ? "Quick links" : "Liens rapides"}</div>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/68">
            {copy.footerLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white/45">Contact</div>
          <div className="mt-5 space-y-3 text-sm text-white/68">
            <a className="block transition hover:text-white" href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>
            <a className="block transition hover:text-white" href={`mailto:${siteConfig.email}`}>{copy.emailAction}</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 sm:px-6 lg:px-10">
        {new Date().getFullYear()} Méthode Secondaire. {copy.rights}
      </div>
    </footer>
  )
}
