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
          <div className="bg-marigold border-2 border-ink shadow-card p-6">
            <h2 className="font-display font-black text-xl">Have a question?</h2>
            <p className="text-sm mt-2 leading-relaxed">
              Send an enquiry and the school office will get back to you. For
              urgent admission queries, please visit the school office during
              working hours.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 bg-ink text-paper font-bold px-5 py-2.5 hover:bg-pine-deep transition-colors"
            >
              Contact the Office →
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
