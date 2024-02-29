import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { IssueQuery } from './issues/list/IssueTable';
import IssuesPage from './issues/list/page';
import prisma from '@/prisma/client';

interface Props {
  searchParams: IssueQuery;
}

export default async function Home({ searchParams }: Props) {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });

  return (
    <>
      <LatestIssues />
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
    </>
  );
}
