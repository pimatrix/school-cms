import Link from 'next/link';
import PageShell from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AdmissionsPage() {
  const page = await getPageContent('admissions');
  return (
    <PageShell kicker="Admissions" title={page.title}>
      <div className="grid lg:grid-cols-12 gap-10">
        <div
          className="lg:col-span-8 cms-body text-[17px] text-ink/85"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
        <aside className="lg:col-span-4">
          <div className="rounded-2xl bg-marigold p-7 shadow-card lg:sticky lg:top-40">
            <h2 className="font-display font-black text-[22px] text-ink">Have a question?</h2>
            <p className="text-sm mt-2.5 leading-relaxed text-ink/85">
              Send an enquiry and the school office will get back to you. For
              urgent admission queries, please visit the school office during
              working hours.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-5 rounded-full bg-ink text-paper font-bold px-6 py-3 hover:bg-pine-deep transition-all hover:-translate-y-0.5"
            >
              Contact the Office →
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
