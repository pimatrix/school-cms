import PageShell from '@/components/PageShell';
import { getPageContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function AcademicsPage() {
  const page = await getPageContent('academics');
  return (
    <PageShell kicker="Academics" title={page.title}>
      <div
        className="cms-body text-[17px] text-ink/85 max-w-4xl"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </PageShell>
  );
}
