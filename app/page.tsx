import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { IssueQuery } from './issues/list/IssueTable';
import IssuesPage from './issues/list/page';
import prisma from '@/prisma/client';
import { Metadata } from 'next';

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
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Complaint Manager - Dashboard',
  description: 'View a summary of project issues',
};

export const dynamic = 'force-dynamic';
