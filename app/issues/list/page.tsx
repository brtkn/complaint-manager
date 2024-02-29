import Pagination from '@/app/component/Pagination';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import IssueActions from '../IssueActions';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statutes = Object.values(Status);
  const status = statutes.includes(searchParams?.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnNames.includes(searchParams?.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParams?.page) || 1;
  const pageSize = 10;

  const issueCount = await prisma.issue.count({ where });

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Complaint List',
  description: 'View a summary of project issues',
};
